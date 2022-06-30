import React from 'react';
import { useLocation } from 'react-router';
import Create from '../../layout/Create';
import LessonForm from "./LessonForm";
import ReturnToCourseButton from "../../common/buttons/ReturnToCourseButton";

const LessonCreate = props => {
  const location = useLocation();
  const courseUri = location.state && location.state.record ? location.state.record['pair:partOf'] : undefined;
  const redirect = courseUri ? `/Course/${encodeURIComponent(courseUri)}/1` : 'show';

  return (
    <Create actions={[<ReturnToCourseButton linkType="edit" />]} {...props}>
      <LessonForm redirect={redirect} mode="create" />
    </Create>
  );
}

export default LessonCreate;
