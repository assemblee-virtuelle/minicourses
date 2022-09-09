const urlJoin = require("url-join");
const { ControlledContainerMixin, getContainerFromUri } = require("@semapps/ldp");
const { MIME_TYPES } = require("@semapps/mime-types");
const { ACTOR_TYPES, ACTIVITY_TYPES, PUBLIC_URI } = require("@semapps/activitypub");

module.exports = {
  name: 'minicourses.courses',
  mixins: [ControlledContainerMixin],
  settings: {
    baseUrl: null,
    announcerUri: null,
    // Container settings
    path: '/courses',
    acceptedTypes: ['tutor:DigitalCourse', ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey'],
  },
  actions: {
    async announce(ctx) {
      const { courseUri } = ctx.params;

      if (this.settings.announcerUri) {
        const announcer = ctx.call('activitypub.actor.get', { actorUri: this.settings.announcerUri, webId: 'system' });

        this.logger.info('Announcing course ' + courseUri + ' through ' + announcer.id);

        await ctx.call(
          'activitypub.outbox.post',
          {
            collectionUri: announcer.outbox,
            '@context': 'https://www.w3.org/ns/activitystreams',
            actor: announcer.id,
            type: ACTIVITY_TYPES.CREATE,
            object: courseUri,
            to: [announcer.followers, PUBLIC_URI]
          },
          { meta: { webId: announcer.id } }
        );
      }
    },
    async updateDuration(ctx) {
      const { courseUri } = ctx.params;

      const results = await ctx.call('triplestore.query', {
        query: `
          PREFIX tutor: <http://virtual-assembly.org/ontologies/pair-tutor#>
          PREFIX pair: <http://virtual-assembly.org/ontologies/pair#>
          SELECT (SUM(?duration) as ?sum)
          WHERE {
            <${courseUri}> pair:hasPart ?lessonUri .
            ?lessonUri tutor:duration ?duration .
          }
        `,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      });

      const totalDuration = results[0].sum.value;

      const course = await this.actions.get({
        resourceUri: courseUri,
        accept: MIME_TYPES.JSON,
        webId: 'system'
      }, { parentCtx: ctx });

      await this.actions.put({
        resource: {
          ...course,
          'tutor:duration': totalDuration,
        },
        contentType: MIME_TYPES.JSON,
        webId: 'system'
      }, { parentCtx: ctx });
    }
  },
  methods: {
    async onFollow(ctx, activity, courseUri) {
      const registrations = await ctx.call('minicourses.registrations.getRunning', {
        courseUri,
        actorUri: activity.actor
      });
      if (registrations.length === 0) {
        await ctx.call('minicourses.registrations.post', {
          resource: {
            type: 'tutor:Registration',
            'tutor:registrationFor': courseUri,
            'tutor:registrant': activity.actor,
            'pair:startDate': (new Date()).toISOString(),
            'pair:hasStatus': urlJoin(this.settings.baseUrl, 'status', 'running')
          },
          contentType: MIME_TYPES.JSON,
          webId: 'system'
        });
      }
    },
    async onUnfollow(ctx, activity, courseUri) {
      const registrations = await ctx.call('minicourses.registrations.getRunning', { courseUri, actorUri: activity.actor });
      if( registrations.length > 0 ) {
        for( let registration of registrations ) {
          await ctx.call('minicourses.registrations.put', {
            resourceUri: registration.id,
            resource: {
              ...registration,
              'pair:hasStatus': urlJoin(this.settings.baseUrl, 'status', 'aborted')
            },
            contentType: MIME_TYPES.JSON,
            webId: 'system'
          });
        }
      }
    }
  },
  events: {
    async 'activitypub.inbox.received'(ctx) {
      const { activity, recipients } = ctx.params;
      const coursesContainerUri = await this.actions.getContainerUri({}, { parentCtx: ctx });
      for( let actorUri of recipients ) {
        if( getContainerFromUri(actorUri) === coursesContainerUri ) {
          if( activity.type === ACTIVITY_TYPES.FOLLOW ) {
            await this.onFollow(ctx, activity, actorUri);
          } else if ( activity.type === ACTIVITY_TYPES.UNDO && activity.object.type === ACTIVITY_TYPES.FOLLOW ) {
            await this.onUnfollow(ctx, activity, actorUri);
          }
        }
      }
    }
  },
  hooks: {
    before: {
      create(ctx) {
        ctx.params.resource['pair:hasStatus'] = urlJoin(this.settings.baseUrl, 'status', 'unavailable');
      }
    },
    after: {
      put(ctx, res) {
        if(
          res.oldData['pair:hasStatus'] === urlJoin(this.settings.baseUrl, 'status', 'unavailable') &&
          res.newData['pair:hasStatus'] === urlJoin(this.settings.baseUrl, 'status', 'available')
        ) {
          this.actions.announce({ courseUri: res.resourceUri }, { parentCtx: ctx });
        }
        return res;
      }
    }
  }
};
