const QueueService = require('moleculer-bull');
const CoursesService = require("./services/courses");
const LessonsService = require("./services/lessons");
const MailerService = require("./services/mailer");
const RegistrationsService = require("./services/registrations");

module.exports = {
  name: 'minicourses',
  settings: {
    baseUrl: null,
    frontendUrl: null,
    containersPath: '',
    queueServiceUrl: null,
    // Services customization
    courses: {},
    lessons: {},
    mailer: {
      from: null,
      transport: {
        host: null,
        port: null,
        secure: null,
        auth: {
          user: null,
          pass: null,
        },
      }
    },
    registrations: {}
  },
  created() {
    const { baseUrl, frontendUrl, containersPath, queueServiceUrl } = this.settings;

    this.broker.createService(CoursesService, {
      settings: {
        baseUrl,
        path: containersPath + '/courses',
        ...this.settings.courses
      },
    });

    this.broker.createService(LessonsService, {
      settings: {
        path: containersPath + '/lessons',
        ...this.settings.lessons,
      },
    });

    this.broker.createService(MailerService, {
      mixins: queueServiceUrl ? [QueueService(queueServiceUrl)] : undefined,
      settings: {
        baseUrl,
        frontendUrl,
        ...this.settings.mailer
      },
    });

    this.broker.createService(RegistrationsService, {
      settings: {
        baseUrl,
        path: containersPath + '/registrations',
        ...this.settings.registrations
      },
    });
  }
};