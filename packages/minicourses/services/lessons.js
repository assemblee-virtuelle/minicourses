const { ControlledContainerMixin } = require("@semapps/ldp");
const { MIME_TYPES } = require("@semapps/mime-types");

module.exports = {
  name: 'minicourses.lessons',
  mixins: [ControlledContainerMixin],
  settings: {
    // Container settings
    path: '/lessons',
    acceptedTypes: ['tutor:Lesson']
  },
  actions: {
    async getFromCourse(ctx) {
      const { courseUri } = ctx.params;
      const container = await this.actions.list({
        containerUri: await this.actions.getContainerUri({ webId: ctx.params.webId }, { parentCtx: ctx }),
        filters: {
          'pair:partOf': courseUri
        },
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      const lessons = container['ldp:contains'] || [];

      return lessons.sort((a, b) => a['tutor:order'] - b['tutor:order']);
    },
    async getHighestOrder(ctx) {
      const { courseUri } = ctx.params;

      const allLessons = await this.actions.getFromCourse({ courseUri });

      return allLessons.reduce((acc, lesson) =>
        (!lesson['tutor:order'] || lesson['tutor:order'] < acc) ? acc : lesson['tutor:order'],
        0
      );
    }
  },
  hooks: {
    before: {
      async create(ctx) {
        const highestOrder = await this.actions.getHighestOrder({ courseUri: ctx.params.resource['pair:partOf'] }, { parentCtx: ctx });
        ctx.params.resource['tutor:order'] = highestOrder + 1;
      }
    },
    after: {
      create(ctx, res) {
        ctx.call('minicourses.courses.updateDuration', { courseUri: res.newData['pair:partOf'] });
        return res;
      },
      put(ctx, res) {
        ctx.call('minicourses.courses.updateDuration', { courseUri: res.newData['pair:partOf'] });
        return res;
      },
      delete(ctx, res) {
        ctx.call('minicourses.courses.updateDuration', { courseUri: res.oldData['pair:partOf'] });
        return res;
      }
    }
  }
};
