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
        'tutor:DigitalCourse': ['/miniparcours/courses'],
        'tutor:Lesson': ['/miniparcours/lessons'],
        'tutor:Registration': ['/miniparcours/registrations'],
      }
    },
    uploadsContainer: '/files'
  }
};

export default dataServers;
