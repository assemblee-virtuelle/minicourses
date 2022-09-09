const path = require('path');
const { AuthLocalService } = require('@semapps/auth');
const CONFIG = require('../../config/config');

module.exports = {
  mixins: [AuthLocalService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    jwtPath: path.resolve(__dirname, '../jwt'),
    accountsDataset: CONFIG.SETTINGS_DATASET,
  }
};
