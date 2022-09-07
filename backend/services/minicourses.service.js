const { MiniCoursesService } = require('minicourses');
const CONFIG = require('../config/config');
const transport = require('../config/transport');

module.exports = {
  mixins: [MiniCoursesService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    frontendUrl: CONFIG.FRONTEND_URL,
    queueServiceUrl: CONFIG.QUEUE_SERVICE_URL,
    mailer: {
      from: `${CONFIG.FROM_NAME} <${CONFIG.FROM_EMAIL}>`,
      transport
    }
  }
};
