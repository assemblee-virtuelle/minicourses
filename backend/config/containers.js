const { ACTOR_TYPES } = require('@semapps/activitypub');
const { MIME_TYPES } = require("@semapps/mime-types");

module.exports = [
  {
    path: '/',
    readOnly: true
  },
  {
    path: '/users',
    acceptedTypes: ['pair:Person', ACTOR_TYPES.PERSON],
    dereference: ['sec:publicKey'],
    readOnly: true
  },
  {
    path: '/bots',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey'],
    readOnly: true
  },
  {
    path: '/themes',
    acceptedTypes: ['pair:Theme'],
    readOnly: true
  },
  {
    path: '/status',
    acceptedTypes: ['tutor:CourseStatus', 'tutor:RegistrationStatus'],
    readOnly: true
  },
  {
    path: '/files',
    accept: MIME_TYPES.JSON // Fix https://github.com/assemblee-virtuelle/semapps/issues/1011
  }
];
