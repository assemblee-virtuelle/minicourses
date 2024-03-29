import React from "react";
// import { Redirect } from 'react-router';
import { Navigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import LessonCreate from "./LessonCreate";
import LessonEdit from "./LessonEdit";
import LessonShow from "./LessonShow";

const RedirectToHomepage = () => <Navigate to="/" replace />;

export default {
  config: {
    show: LessonShow,
    create: LessonCreate,
    list: RedirectToHomepage,
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
        'tutor:duration': 'Durée (jours)',
        'tutor:order': 'Ordre par rapport aux autres fiches',
        'tutor:video': 'Vidéo'
      }
    }
  }
};
