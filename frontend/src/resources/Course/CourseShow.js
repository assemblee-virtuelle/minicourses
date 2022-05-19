import React from 'react';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CourseTitle from './CourseTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import FollowButton from "../../common/buttons/FollowButton";
import RegistrationStatusField from "../../common/fields/RegistrationStatusField";
import CourseDetails from "./CourseDetails";

const CourseShow = props => {
  useCheckAuthenticated();
  return (
    <Show title={<CourseTitle />}  {...props}>
      <CardLayout
        image="pair:depictedBy"
        actions={[<FollowButton />]}
        details={<CourseDetails />}
        status={<RegistrationStatusField reference="Registration" source="pair:hasStatus" />}
      >
        <MarkdownField source="pair:description" />
      </CardLayout>
    </Show>
  );
}

export default CourseShow;
