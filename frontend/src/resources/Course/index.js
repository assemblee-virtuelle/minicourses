import React from "react";
// import { Redirect } from 'react-router';
import { Navigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import CourseCreate from './CourseCreate';
import CourseEdit from './CourseEdit';
import CourseShow from './CourseShow';

const RedirectToHomepage = () => <Navigate to="/" replace />;

export default {
  config: {
    list: RedirectToHomepage,
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
