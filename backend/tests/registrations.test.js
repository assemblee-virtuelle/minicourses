const path = require('path');
const urlJoin = require('url-join');
const waitForExpect = require('wait-for-expect');
const { ACTIVITY_TYPES, PUBLIC_URI } = require('@semapps/activitypub');
const { MIME_TYPES } = require('@semapps/mime-types');
const initialize = require('./initialize');
const CONFIG = require('../config/config')

jest.setTimeout(30000);

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
    await broker.call('activitypub.outbox.post', {
      collectionUri: alice.outbox,
      type: ACTIVITY_TYPES.FOLLOW,
      actor: alice.id,
      object: courseUri,
      to: [courseUri, PUBLIC_URI],
    });

    await waitForExpect(async () => {
        await expect(
          broker.call('ldp.container.get', {
            containerUri: urlJoin(CONFIG.HOME_URL, 'registrations'),
            accept: MIME_TYPES.JSON,
            webId: 'system',
          })
        ).resolves.toMatchObject({
          type: ['ldp:Container', 'ldp:BasicContainer'],
          'ldp:contains': [
            {
              type: 'tutor:Registration',
              'tutor:registrant': alice.id,
              'tutor:registrationFor': courseUri
            }
          ]
        });
      });

    // await waitForExpect(() => {
    //   expect(mockSendNotification).toHaveBeenCalledTimes(1);
    // });
    //
    // expect(mockSendNotification.mock.calls[0][0].params.data.key).toBe('contact_request');
    //
    // await waitForExpect(async () => {
    //   await expect(
    //     broker.call('webacl.resource.hasRights', {
    //       resourceUri: alice.url,
    //       rights: { read: true },
    //       webId: bob.id,
    //     })
    //   ).resolves.toMatchObject({ read: true });
    // });
    //
    // await waitForExpect(async () => {
    //   await expect(
    //     broker.call('activitypub.collection.includes', {
    //       collectionUri: bob['apods:contactRequests'],
    //       itemUri: contactRequestToBob.id,
    //     })
    //   ).resolves.toBeTruthy();
    // });
    //
    // contactRequestToCraig = await broker.call('activitypub.outbox.post', {
    //   collectionUri: alice.outbox,
    //   type: ACTIVITY_TYPES.OFFER,
    //   actor: alice.id,
    //   object: {
    //     type: ACTIVITY_TYPES.ADD,
    //     object: alice.url,
    //   },
    //   content: 'Salut Craig, ça fait longtemps !',
    //   target: craig.id,
    //   to: craig.id,
    // });
    //
    // await waitForExpect(async () => {
    //   await expect(
    //     broker.call('activitypub.collection.includes', {
    //       collectionUri: bob['apods:contactRequests'],
    //       itemUri: contactRequestToCraig.id,
    //     })
    //   ).resolves.toBeFalsy();
    // });
    //
    // await waitForExpect(() => {
    //   expect(mockSendNotification).toHaveBeenCalledTimes(2);
    // });
    //
    // expect(mockSendNotification.mock.calls[1][0].params.data.key).toBe('contact_request');
  });

  // test('Bob accept Alice contact request', async () => {
  //   await broker.call('activitypub.outbox.post', {
  //     collectionUri: bob.outbox,
  //     type: ACTIVITY_TYPES.ACCEPT,
  //     actor: bob.id,
  //     object: contactRequestToBob.id,
  //     to: alice.id,
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', {
  //         collectionUri: bob['apods:contactRequests'],
  //         itemUri: contactRequestToBob.id,
  //       })
  //     ).resolves.toBeFalsy();
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', { collectionUri: bob['apods:contacts'], itemUri: alice.id })
  //     ).resolves.toBeTruthy();
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', { collectionUri: alice['apods:contacts'], itemUri: bob.id })
  //     ).resolves.toBeTruthy();
  //   });
  //
  //   // Bob profile is cached in Alice dataset
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('triplestore.countTriplesOfSubject', {
  //         uri: alice.url,
  //         dataset: bob.preferredUsername,
  //         webId: 'system',
  //       })
  //     ).resolves.toBeTruthy();
  //   });
  //
  //   // Alice profile is cached in Bob dataset
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('triplestore.countTriplesOfSubject', {
  //         uri: bob.url,
  //         dataset: alice.preferredUsername,
  //         webId: 'system',
  //       })
  //     ).resolves.toBeTruthy();
  //   });
  //
  //   await waitForExpect(() => {
  //     expect(mockSendNotification).toHaveBeenCalledTimes(3);
  //   });
  //
  //   expect(mockSendNotification.mock.calls[2][0].params.data.key).toBe('accept_contact_request');
  // });
  //
  // test('Craig reject Alice contact request', async () => {
  //   await broker.call('activitypub.outbox.post', {
  //     collectionUri: craig.outbox,
  //     type: ACTIVITY_TYPES.REJECT,
  //     actor: craig.id,
  //     object: contactRequestToCraig.id,
  //     to: alice.id,
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', {
  //         collectionUri: craig['apods:contactRequests'],
  //         itemUri: contactRequestToCraig.id,
  //       })
  //     ).resolves.toBeFalsy();
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', {
  //         collectionUri: craig['apods:rejectedContacts'],
  //         itemUri: alice.id,
  //       })
  //     ).resolves.toBeTruthy();
  //   });
  // });
  //
  // test('Bob removes Alice from his contacts', async () => {
  //   await broker.call('activitypub.outbox.post', {
  //     collectionUri: bob.outbox,
  //     type: ACTIVITY_TYPES.REMOVE,
  //     actor: bob.id,
  //     object: alice.id,
  //     origin: bob['apods:contacts']
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('activitypub.collection.includes', {
  //         collectionUri: bob['apods:contacts'],
  //         itemUri: alice.id,
  //       })
  //     ).resolves.toBeFalsy();
  //   });
  //
  //   await waitForExpect(async () => {
  //     await expect(
  //       broker.call('ldp.container.includes', {
  //         containerUri: urlJoin(bob.url, 'data', 'profiles'),
  //         resourceUri: alice.url,
  //       })
  //     ).resolves.toBeFalsy();
  //   });
  // });
});
