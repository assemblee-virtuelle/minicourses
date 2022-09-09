const path = require('path');
const urlJoin = require('url-join');
const waitForExpect = require('wait-for-expect');
const { ACTIVITY_TYPES, PUBLIC_URI } = require('@semapps/activitypub');
const { MIME_TYPES } = require('@semapps/mime-types');
const initialize = require('./initialize');
const CONFIG = require('../config/config');
const { isoDate, expectContainerContains } = require('./utils');

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

let broker;

// const mockSendNotification = jest.fn(() => Promise.resolve());

beforeAll(async () => {
  broker = await initialize();

  // Use auth local service for the tests
  await broker.loadService(path.resolve(__dirname, './services/auth.service.js'));

  await broker.loadService(path.resolve(__dirname, '../services/core.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/inference.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/minicourses.service.js'));
  await broker.loadService(path.resolve(__dirname, '../services/webid.service.js'));

  // // Mock notification service
  // await broker.createService({
  //   mixins: [require('./services/notification.service')],
  //   actions: {
  //     send: mockSendNotification,
  //   },
  // });

  await broker.start();
});

afterAll(async () => {
  await broker.stop();
});

describe('Test contacts app', () => {
  let actors = [],
    lessons = [],
    alice,
    bob,
    craig,
    courseUri;

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

    courseUri = await broker.call('ldp.container.post', {
      containerUri: urlJoin(CONFIG.HOME_URL, 'courses'),
      slug: 'my-first-course',
      resource: courseData,
      contentType: MIME_TYPES.JSON,
      webId: 'system'
    });

    await broker.call('activitypub.actor.awaitCreateComplete', { actorUri: courseUri });

    for (let i = 1; i <= 3; i++) {
      const lessonData = require(`./data/lesson${i}.json`);

      lessons[i] = await broker.call('ldp.container.post', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'lessons'),
        slug: 'lesson-' + i,
        resource: {
          ...lessonData,
          'pair:partOf': courseUri,
          'tutor:order': i,
        },
        contentType: MIME_TYPES.JSON,
        webId: 'system'
      });
    }
  });

  test('Alice follows the course', async () => {
    jest.setSystemTime(new Date('2021-07-12'));

    await broker.call('activitypub.outbox.post', {
      collectionUri: alice.outbox,
      type: ACTIVITY_TYPES.FOLLOW,
      actor: alice.id,
      object: courseUri,
      to: [courseUri, PUBLIC_URI],
    });

    await expectContainerContains(broker, urlJoin(CONFIG.HOME_URL, 'registrations'), {
      type: 'tutor:Registration',
      'pair:hasStatus': urlJoin(CONFIG.HOME_URL, 'status', 'running'),
      'pair:startDate': isoDate(),
      'tutor:registrant': alice.id,
      'tutor:registrationFor': courseUri,
    });
  });



});
