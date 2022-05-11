import React from 'react';
import { TextField } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CourseTitle from './CourseTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import FollowButton from "../../layout/FollowButton";

const CourseShow = props => {
  useCheckAuthenticated();
  return (
    <Show title={<CourseTitle />}  {...props}>
      <CardLayout image="pair:depictedBy" actions={[<FollowButton />]}>
        <TextField variant="h6" source="pair:comment" />
        <MarkdownField source="pair:description" />
      </CardLayout>
    </Show>
  );
}

export default CourseShow;
