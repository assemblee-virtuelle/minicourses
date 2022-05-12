import SettingsIcon from '@material-ui/icons/Settings';
import LessonCreate from "./LessonCreate";
import LessonEdit from "./LessonEdit";

export default {
  config: {
    // show: CourseShow,
    create: LessonCreate,
    edit: LessonEdit,
    icon: SettingsIcon,
    options: {
      label: 'Leçon'
    }
  },
  dataModel: {
    types: ['tutor:Lesson'],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Leçon |||| Leçons',
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
