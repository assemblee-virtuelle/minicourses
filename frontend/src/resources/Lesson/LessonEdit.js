import React from 'react';
import LessonTitle from './LessonTitle';
import Edit from '../../layout/Edit';
import LessonForm from "./LessonForm";
import {ShowButton} from "react-admin";
import ReturnToCourseButton from "../../common/buttons/ReturnToCourseButton";

const LessonEdit = props => {
  return (
    <Edit title={<LessonTitle />} actions={[<ReturnToCourseButton />, <ShowButton />]} {...props}>
      <LessonForm mode="edit" />
    </Edit>
  );
}

export default LessonEdit;
