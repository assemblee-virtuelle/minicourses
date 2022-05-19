import React from 'react';
import { EditButton } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import LessonTitle from './LessonTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import ReturnToCourseButton from "../../common/buttons/ReturnToCourseButton";

const LessonShow = props => {
  useCheckAuthenticated();
  return (
    <Show title={<LessonTitle />} actions={[<ReturnToCourseButton linkType="show" />, <EditButton />]} {...props}>
      <CardLayout image="pair:depictedBy" video="tutor:video">
        <MarkdownField source="pair:description" />
      </CardLayout>
    </Show>
  );
}

export default LessonShow;