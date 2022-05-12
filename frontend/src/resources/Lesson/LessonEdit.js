import React from 'react';
import LessonTitle from './LessonTitle';
import Edit from '../../layout/Edit';
import LessonForm from "./LessonForm";

const LessonEdit = props => (
  <Edit title={<LessonTitle />} {...props}>
    <LessonForm />
  </Edit>
);

export default LessonEdit;
