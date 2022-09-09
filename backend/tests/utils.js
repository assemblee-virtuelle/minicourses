const waitForExpect = require("wait-for-expect");
const { MIME_TYPES } = require('@semapps/mime-types');

const isoDate = (current) => (new Date(current)).toISOString().slice(0,-5) + 'Z';

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const expectContainerContains = async (broker, containerUri, objectPattern) => {
  await waitForExpect(async () => {
    await expect(
      broker.call('ldp.container.get', {
        containerUri,
        accept: MIME_TYPES.JSON,
        webId: 'system',
      })
    ).resolves.toMatchObject({
      type: ['ldp:Container', 'ldp:BasicContainer'],
      'ldp:contains': expect.arrayContaining([
        expect.objectContaining(objectPattern)
      ])
    });
  });
};

const expectOrderedCollectionContains = async (broker, collectionUri, objectPattern) => {
  await waitForExpect(async () => {
    await expect(
      broker.call('activitypub.collection.get', {
        collectionUri,
        page: 1,
        accept: MIME_TYPES.JSON,
        webId: 'system',
      })
    ).resolves.toMatchObject({
      type: 'OrderedCollectionPage',
      orderedItems: expect.arrayContaining([
        expect.objectContaining(objectPattern)
      ])
    });
  });
};

const expectCollectionToHaveTotalItems = async (broker, collectionUri, totalItems) => {
  await waitForExpect(async () => {
    await expect(
      broker.call('activitypub.collection.get', {
        collectionUri,
        accept: MIME_TYPES.JSON,
        webId: 'system',
      })
    ).resolves.toMatchObject({
      totalItems
    });
  });
};

module.exports = {
  isoDate,
  delay,
  expectContainerContains,
  expectOrderedCollectionContains,
  expectCollectionToHaveTotalItems
};
