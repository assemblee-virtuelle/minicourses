const urlJoin = require("url-join");
const { ControlledContainerMixin } = require("@semapps/ldp");
const { MIME_TYPES } = require("@semapps/mime-types");

module.exports = {
  name: 'minicourses.registrations',
  mixins: [ControlledContainerMixin],
  settings: {
    baseUrl: null,
    // Container settings
    path: '/registrations',
    acceptedTypes: ['tutor:Registration'],
    readOnly: true
  },
  actions: {
    async getRunning(ctx) {
      const { courseUri, actorUri } = ctx.params;
      const filters = { 'pair:hasStatus': urlJoin(this.settings.baseUrl, 'status', 'running') };
      if( courseUri ) filters['tutor:registrationFor'] = courseUri;
      if( actorUri ) filters['tutor:registrant'] = actorUri;

      const container = await this.actions.list({
        containerUri: await this.actions.getContainerUri({ webId: ctx.params.webId }, { parentCtx: ctx }),
        filters,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      }, { parentCtx: ctx });

      return container['ldp:contains'] || [];
    },
    async reset(ctx) {
      const registrations = await this.actions.getRunning({}, { parentCtx: ctx });

      for( let registration of registrations ) {
        await this.actions.put({
          resourceUri: registration.id,
          resource: {
            ...registration,
            'tutor:currentLesson': undefined,
            'tutor:lessonStarted': undefined
          },
          contentType: MIME_TYPES.JSON,
          webId: 'system'
        }, { parentCtx: ctx });
      }
    }
  }
};
