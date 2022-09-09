const urlJoin = require("url-join");
const path = require("path");
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importer.themes',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/themes.json'),
      fieldsMapping: {
        slug: data => data
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'themes')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'pair:Theme',
        'pair:label': data
      });
    }
  }
};
