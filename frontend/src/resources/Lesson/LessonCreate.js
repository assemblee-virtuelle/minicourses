import React from 'react';
import { ImageInput, TextInput, SimpleForm } from 'react-admin';
import { useLocation } from 'react-router';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/semantic-data-provider';
import Create from '../../layout/Create';
import LessonForm from "./LessonForm";

const LessonCreate = props => {
  const location = useLocation();
  const courseUri = location.state && location.state.record ? location.state.record['pair:partOf'] : undefined;
  const redirect = courseUri ? `/Course/${encodeURIComponent(courseUri)}/1` : 'show';

  return (
    <Create {...props}>
      <LessonForm redirect={redirect} />
    </Create>
  );
}

export default LessonCreate;
