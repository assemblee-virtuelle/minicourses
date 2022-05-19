const dataServers = {
  colibris: {
    name: 'Colibris',
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
    authServer: true,
    default: true,
    containers: {
      colibris: {
        'pair:Person': ['/users'],
        'pair:Theme': ['/themes'],
        'tutor:DigitalCourse': ['/miniparcours/courses'],
        'tutor:Lesson': ['/miniparcours/lessons'],
        'tutor:Registration': ['/miniparcours/registrations'],
        'tutor:CourseStatus': ['/status'],
        'tutor:RegistrationStatus': ['/status'],
      }
    },
    uploadsContainer: '/files'
  }
};

export default dataServers;
