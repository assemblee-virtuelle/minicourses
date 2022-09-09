const path = require('path');
const urlJoin = require('url-join');
const waitForExpect = require('wait-for-expect');
const { ACTIVITY_TYPES, PUBLIC_URI } = require('@semapps/activitypub');
const { MIME_TYPES } = require('@semapps/mime-types');
const initialize = require('./initialize');
const CONFIG = require('../config/config');
const { delay, expectContainerContains, expectOrderedCollectionContains, expectCollectionToHaveTotalItems} = require('./utils');

jest.setTimeout(30000);

// Do not fake setTimeout and setInterval because it's needed by wait-for-expect
// See https://github.com/testing-library/react-hooks-testing-library/issues/631
jest.useFakeTimers({
    doNotFake: [
      'setImmediate',
      'setInterval',
      'setTimeout',
      'cancelAnimationFrame',
      'cancelIdleCallback',
      'clearImmediate',
      'clearInterval',
      'clearTimeout',
      'nextTick',
      'queueMicrotask'
    ]
  });

let broker, minicoursesService;

const mockMailLesson = jest.fn(() => Promise.resolve());

beforeAll(async () => {
  broker = await initialize();

  // Use auth local service for the tests
  await broker.loadService(path.resolve(__dirname, './services/auth.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/core.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/inference.service.js'));
  minicoursesService = await broker.loadService(path.resolve(__dirname, '../services/minicourses.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/webid.service.js'));

  // Mock mailer
  minicoursesService.subservices.mailer.actions.mailLesson = mockMailLesson;

  await broker.start();
});

afterAll(async () => {
  await broker.stop();
});

describe('Course registration and mailer', () => {
  let actors = [],
    lessons = [],
    alice,
    bob,
    craig,
    course;

  test('Initialize data', async () => {
    for (let i = 1; i <= 3; i++) {
      const actorData = require(`./data/actor${i}.json`);

      const { webId } = await broker.call('auth.signup', actorData);

      actors[i] = await broker.call('activitypub.actor.awaitCreateComplete', { actorUri: webId });

      expect(actors[i].preferredUsername).toBe(actorData.username);
    }

    alice = actors[1];
    bob = actors[2];
    craig = actors[3];

    const courseData = require(`./data/course1.json`);

    const courseUri = await broker.call('ldp.container.post', {
      containerUri: urlJoin(CONFIG.HOME_URL, 'courses'),
      slug: 'my-first-course',
      resource: courseData,
      contentType: MIME_TYPES.JSON,
      webId: 'system'
    });

    course = await broker.call('activitypub.actor.awaitCreateComplete', { actorUri: courseUri });

    for (let i = 1; i <= 3; i++) {
      const lessonData = require(`./data/lesson${i}.json`);

      const lessonUri = await broker.call('ldp.container.post', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'lessons'),
        slug: 'lesson-' + i,
        resource: {
          ...lessonData,
          'pair:partOf': course.id,
          'tutor:order': i,
        },
        contentType: MIME_TYPES.JSON,
        webId: 'system'
      });

      lessons[i] = await broker.call('ldp.resource.get', {
        resourceUri: lessonUri,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });
    }

    course = await broker.call('activitypub.actor.awaitCreateComplete', { actorUri: course.id });

    expect(course['tutor:duration']).toBe('4');
  });

  test('Alice follows the course', async () => {
    jest.setSystemTime(new Date('2021-07-12T14:00:00Z'));

    await broker.call('activitypub.outbox.post', {
      collectionUri: alice.outbox,
      type: ACTIVITY_TYPES.FOLLOW,
      actor: alice.id,
      object: course.id,
      to: [course.id, PUBLIC_URI],
    });

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': '2021-07-12T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
    });
  });

  test('Day 1: First course is sent to Alice', async () => {
    jest.setSystemTime(new Date('2021-07-12T17:00:00Z'));

    await broker.call('minicourses.mailer.sendLessons');

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': '2021-07-12T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
      'tutor:currentLesson': lessons[1].id,
      'tutor:lessonStarted': '2021-07-12T17:00:00Z'
    });

    await expectOrderedCollectionContains(broker, alice.inbox, {
      type: ACTIVITY_TYPES.ANNOUNCE,
      actor: course.id,
      object: lessons[1].id,
      published: '2021-07-12T17:00:00Z',
      to: alice.id
    });

    await waitForExpect( () => {
      expect(mockMailLesson).toBeCalledTimes(1);
    });
  });

  test('Alice interrupts the course', async () => {
    jest.setSystemTime(new Date('2021-07-13T10:00:00Z'));

    await broker.call('activitypub.outbox.post', {
      collectionUri: alice.outbox,
      type: ACTIVITY_TYPES.UNDO,
      actor: alice.id,
      object: {
        type: ACTIVITY_TYPES.FOLLOW,
        object: course.id
      },
      to: [course.id, PUBLIC_URI],
    });

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'aborted'),
      'pair:startDate': '2021-07-12T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
      'tutor:currentLesson': lessons[1].id,
      'tutor:lessonStarted': '2021-07-12T17:00:00Z'
    });
  });

  test('Alice restarts the course', async () => {
    jest.setSystemTime(new Date('2021-07-14T14:00:00Z'));

    await broker.call('activitypub.outbox.post', {
      collectionUri: alice.outbox,
      type: ACTIVITY_TYPES.FOLLOW,
      actor: alice.id,
      object: course.id,
      to: [course.id, PUBLIC_URI],
    });

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': '2021-07-14T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
    });
  });

  test('Day 1: First course is sent again to Alice', async () => {
    jest.setSystemTime(new Date('2021-07-14T17:00:00Z'));

    await broker.call('minicourses.mailer.sendLessons');

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': '2021-07-14T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
      'tutor:currentLesson': lessons[1].id,
      'tutor:lessonStarted': '2021-07-14T17:00:00Z'
    });

    await expectOrderedCollectionContains(broker, alice.inbox, {
      type: ACTIVITY_TYPES.ANNOUNCE,
      actor: course.id,
      object: lessons[1].id,
      published: '2021-07-14T17:00:00Z',
      to: alice.id
    });

    await expectCollectionToHaveTotalItems(broker, alice.inbox, 4);

    await waitForExpect( () => {
      expect(mockMailLesson).toBeCalledTimes(2);
    });
  });

  test('Day 2: No course are sent to Alice', async () => {
    jest.setSystemTime(new Date('2021-07-15T17:00:00Z'));

    await broker.call('minicourses.mailer.sendLessons');

    await delay(5000);

    await expectCollectionToHaveTotalItems(broker, alice.inbox, 4);
  });

  test('Day 3: Second course is sent to Alice', async () => {
    jest.setSystemTime(new Date('2021-07-17T17:00:00Z'));

    await broker.call('minicourses.mailer.sendLessons');

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': '2021-07-14T14:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id,
      'tutor:currentLesson': lessons[2].id,
      'tutor:lessonStarted': '2021-07-17T17:00:00Z'
    });

    await expectOrderedCollectionContains(broker, alice.inbox, {
      type: ACTIVITY_TYPES.ANNOUNCE,
      actor: course.id,
      object: lessons[2].id,
      published: '2021-07-17T17:00:00Z',
      to: alice.id
    });

    await expectCollectionToHaveTotalItems(broker, alice.inbox, 5);

    await waitForExpect( () => {
      expect(mockMailLesson).toBeCalledTimes(3);
    });
  });

  test('Day 5: Final course is sent to Alice', async () => {
    jest.setSystemTime(new Date('2021-07-20T17:00:00Z'));

    await broker.call('minicourses.mailer.sendLessons');

    await expectOrderedCollectionContains(broker, alice.inbox, {
      type: ACTIVITY_TYPES.ANNOUNCE,
      actor: course.id,
      object: lessons[3].id,
      published: '2021-07-20T17:00:00Z',
      to: alice.id
    });

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'finished'),
      'pair:startDate': '2021-07-14T14:00:00Z',
      'pair:endDate': '2021-07-20T17:00:00Z',
      'tutor:registrant': alice.id,
      'tutor:registrationFor': course.id
    });

    await expectCollectionToHaveTotalItems(broker, alice.inbox, 6);

    await waitForExpect( () => {
      expect(mockMailLesson).toBeCalledTimes(4);
    });
  });
});
