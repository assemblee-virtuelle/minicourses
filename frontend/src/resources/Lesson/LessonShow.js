import React from 'react';
import { EditButton, TextField } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import LessonTitle from './LessonTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import ReturnToCourseButton from "../../buttons/ReturnToCourseButton";

const LessonShow = props => {
  useCheckAuthenticated();
  return (
    <Show title={<LessonTitle />} actions={[<ReturnToCourseButton linkType="show" />, <EditButton />]} {...props}>
      <CardLayout image="pair:depictedBy">
        <TextField variant="h6" source="pair:comment" />
        <MarkdownField source="pair:description" />
      </CardLayout>
    </Show>
  );
}

export default LessonShow;
