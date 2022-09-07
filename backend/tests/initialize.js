const { ServiceBroker } = require('moleculer');
const { WebAclMiddleware } = require('@semapps/webacl');
const CONFIG = require('../config/config');

const clearDataset = (dataset) =>
  fetch(CONFIG.SPARQL_ENDPOINT + dataset + '/update', {
    method: 'POST',
    body: 'update=CLEAR+ALL', // DROP+ALL is not working with WebACL datasets !
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(CONFIG.JENA_USER + ':' + CONFIG.JENA_PASSWORD).toString('base64'),
    },
  });

const initialize = async () => {
  const broker = new ServiceBroker({
    middlewares: [WebAclMiddleware({ baseUrl: CONFIG.HOME_URL })],
    logger: {
      type: 'Console',
      options: {
        level: 'error',
      },
    },
  });

  await clearDataset(CONFIG.MAIN_DATASET);
  await clearDataset('settings');

  return broker;
};

module.exports = initialize;
