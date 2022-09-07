const path = require('path');
const { AuthCASService } = require('@semapps/auth');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [AuthCASService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    jwtPath: path.resolve(__dirname, '../jwt'),
    casUrl: CONFIG.CAS_URL,
    selectSsoData: authData => ({
      uuid: authData.uuid,
      email: authData.mail[0],
      name: authData.field_first_name[0],
      familyName: authData.field_last_name[0]
    }),
    webIdSelection: ['nick', 'name', 'familyName'],
    accountsDataset: CONFIG.SETTINGS_DATASET,
  }
};
