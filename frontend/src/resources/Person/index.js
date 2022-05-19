export default {
  dataModel: {
    types: ['pair:Person'],
    list: {
      dereference: ['pair:hasLocation/pair:hasPostalAddress']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  }
};
