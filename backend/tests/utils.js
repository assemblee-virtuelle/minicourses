const waitForExpect = require("wait-for-expect");
const { MIME_TYPES } = require('@semapps/mime-types');

const isoDate = (current) => (new Date(current)).toISOString().slice(0,-5) + 'Z';

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

module.exports = {
  isoDate,
  expectContainerContains
};
