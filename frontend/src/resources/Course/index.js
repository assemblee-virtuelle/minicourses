import CourseCreate from './CourseCreate';
import CourseEdit from './CourseEdit';
import CourseList from './CourseList';
import CourseShow from './CourseShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  config: {
    list: CourseList,
    show: CourseShow,
    create: CourseCreate,
    edit: CourseEdit,
    icon: SettingsIcon,
    options: {
      label: 'Mini-Parcours'
    }
  },
  dataModel: {
    types: ['tutor:DigitalCourse', 'as:Application'],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Mini-parcours',
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:depictedBy': 'Image',
        'pair:hasStatus': 'Statut',
        'pair:homePage': 'Site web',
        'pair:involves': 'Implique',
        'pair:needs': 'Compétences requises',
        'pair:documentedBy': 'Documenté par',
        'pair:hasTopic': 'A pour thème'
      }
    }
  }
};
