import { PairResourceCreate } from '../../pair';
import CourseEdit from './CourseEdit';
import CourseList from './CourseList';
import CourseShow from './CourseShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  config: {
    list: CourseList,
    show: CourseShow,
    create: PairResourceCreate,
    edit: CourseEdit,
    icon: SettingsIcon,
    options: {
      label: 'Mini-Parcours'
    }
  },
  dataModel: {
    types: ['tutor:DigitalCourse'],
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
