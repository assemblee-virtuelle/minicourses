const path = require('path');
const urlJoin = require('url-join');
const Mailer = require('moleculer-mail');
const showdown  = require('showdown');
const { ActivitiesHandlerMixin, ACTIVITY_TYPES } = require('@semapps/activitypub');
const { MIME_TYPES } = require("@semapps/mime-types");
const { removeTime, addDays } = require("../utils");

module.exports = {
  name: 'minicourses.mailer',
  mixins: [Mailer, ActivitiesHandlerMixin],
  settings: {
    baseUrl: null,
    frontendUrl: null,
    // Mailer settings
    from: null,
    transport: {
      host: null,
      port: null,
      secure: null,
      auth: {
        user: null,
        pass: null,
      },
    },
    templateFolder: path.join(__dirname, "../templates"),
    // Queue settings
    cronJob: '0 0 18 * * *', // Everyday at 8pm
    timeZone: 'Europe/Paris',
  },
  created() {
    this.markdownConverter = new showdown.Converter({
      extensions: [
        {
          type: 'output',
          regex: new RegExp(`<img(.*)>`, 'g'),
          replace: `<img width="100%" $1>`
        },
        {
          type: 'output',
          regex: new RegExp(`<blockquote(.*)>`, 'g'),
          replace: `<blockquote style="border-left: 1px solid grey; padding-left: 15px; margin-left: 0; font-style: italic; color: grey" $1>`
        },
      ]
    });
  },
  started() {
    if( this.createJob ) {
      this.createJob('sendLessons', {}, { repeat: { cron: this.settings.cronJob, tz: this.settings.timeZone } });
    }
  },
  actions: {
    async sendLessons(ctx) {
      const results = [];
      const registrations = await ctx.call('minicourses.registrations.getRunning');
      for( let registration of registrations ) {
        const lessons = await ctx.call('minicourses.lessons.getFromCourse', { courseUri: registration['tutor:registrationFor'] });
        if( lessons.length === 0 ) {
          this.logger.warn('No lesson attached to course ' + registration['tutor:registrationFor']);
        } else if( !registration['tutor:currentLesson'] ) {
          // If no lesson received yet, send first lesson
          await this.actions.sendLesson({ lesson: lessons[0], registration }, { parentCtx: ctx });
          results.push({
            registration,
            lesson: lessons[0]
          });
        } else {
          // If lesson already received, check if it is finished
          const currentLessonIndex = lessons.findIndex(l => l.id === registration['tutor:currentLesson']);
          const nextLessonIndex = currentLessonIndex + 1;
          const currentDay = +removeTime(new Date());
          const nextLessonDay = +removeTime(addDays(registration['tutor:lessonStarted'], lessons[currentLessonIndex]['tutor:duration']));
          if( currentDay >= nextLessonDay ) {
            const lastLessonIndex = lessons.length - 1;

            await this.actions.sendLesson({ lesson: lessons[currentLessonIndex+1], registration }, { parentCtx: ctx });

            if( nextLessonIndex === lastLessonIndex ) {
              // If current lesson is last lesson, mark registration as finished
              await ctx.call('ldp.resource.put', {
                resourceUri: registration.id,
                resource: {
                  ...registration,
                  'tutor:currentLesson': undefined,
                  'tutor:lessonStarted': undefined,
                  'pair:endDate': (new Date()).toISOString(),
                  'pair:hasStatus': urlJoin(this.settings.baseUrl, 'status', 'finished')
                },
                contentType: MIME_TYPES.JSON,
                webId: 'system'
              });
            }

            results.push({
              currentDay,
              nextLessonDay,
              registration,
              lesson: lessons[currentLessonIndex+1]
            });
          }
        }
      }
      return results;
    },
    async sendLesson(ctx) {
      const { lesson, registration } = ctx.params;
      const course = await ctx.call('activitypub.actor.get', { actorUri: registration['tutor:registrationFor'], webId: 'system' });

      await ctx.call('activitypub.outbox.post', {
        collectionUri: course.outbox,
        '@context': 'https://www.w3.org/ns/activitystreams',
        actor: course.id,
        type: ACTIVITY_TYPES.ANNOUNCE,
        object: lesson.id,
        to: registration['tutor:registrant']
      });

      await ctx.call('ldp.resource.put', {
        resourceUri: registration.id,
        resource: {
          ...registration,
          'tutor:currentLesson': lesson.id,
          'tutor:lessonStarted': (new Date()).toISOString()
        },
        contentType: MIME_TYPES.JSON,
        webId: 'system'
      });
    },
    async mailLesson(ctx) {
      const { lesson, actorUri } = ctx.params;

      const account = await ctx.call('auth.account.findByWebId', { webId: actorUri });
      const course = await ctx.call('activitypub.object.get', { objectUri: lesson['pair:partOf'], webId: 'system' });

      return await this.actions.send(
        {
          to: account.email,
          replyTo: this.settings.from,
          template: 'lesson',
          data: {
            course,
            lesson,
            account,
            lessonHtml: this.markdownConverter.makeHtml(lesson['pair:description']),
            lessonUrl: urlJoin(this.settings.frontendUrl, 'Lesson', encodeURIComponent(lesson.id), 'show'),
            courseUrl: urlJoin(this.settings.frontendUrl, 'Course', encodeURIComponent(course.id), 'show')
          }
        },
        {
          parentCtx: ctx
        }
      );
    }
  },
  activities: {
    announceLesson: {
      match: {
        type: ACTIVITY_TYPES.ANNOUNCE,
        object: {
          type: 'tutor:Lesson'
        }
      },
      async onReceive(ctx, activity, recipients) {
        for (let actorUri of recipients) {
          await this.actions.mailLesson({ lesson: activity.object, actorUri }, { parentCtx: ctx });
        }
      }
    }
  },
  queues: {
    sendLessons: [
      {
        name: '*',
        process(job) {
          return this.actions.sendLessons();
        }
      }
    ]
  }
};
