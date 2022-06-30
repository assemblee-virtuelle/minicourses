import React from 'react';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CourseTitle from './CourseTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import FollowButton from "../../common/buttons/FollowButton";
import RegistrationStatusField from "../../common/fields/RegistrationStatusField";
import CourseProgressionField from "../../common/fields/CourseProgressionField";
import CourseDetails from "./CourseDetails";
import useRegistrations from "../../hooks/useRegistrations";
import ThemesField from "../../common/fields/ThemesField";

const CourseShow = props => {
  useCheckAuthenticated();
  const registrations = useRegistrations();
  return (
    <Show title={<CourseTitle />}  {...props}>
      <CardLayout
        image="pair:depictedBy"
        actions={[<FollowButton />]}
        details={<CourseDetails />}
        status={<RegistrationStatusField reference="Registration" source="pair:hasStatus" registrations={registrations} />}
        bottom={<CourseProgressionField />}
      >
        <ThemesField source="pair:hasTopic" />
        <MarkdownField source="pair:description" forceBlock />
      </CardLayout>
    </Show>
  );
}

export default CourseShow;
