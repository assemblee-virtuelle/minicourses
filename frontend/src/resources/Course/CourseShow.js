import React from 'react';
import { SingleFieldList, ChipField } from 'react-admin';
import { MarkdownField } from '@semapps/markdown-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { makeStyles } from '@material-ui/core';
import CourseTitle from './CourseTitle';
import Show from '../../layout/Show';
import CardLayout from "../../layout/CardLayout";
import FollowButton from "../../common/buttons/FollowButton";
import RegistrationStatusField from "../../common/fields/RegistrationStatusField";
import CourseProgressionField from "../../common/fields/CourseProgressionField";
import CourseDetails from "./CourseDetails";
import useRegistrations from "../../hooks/useRegistrations";

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 4,
    marginBottom: -4
  }
}));

const CourseShow = props => {
  useCheckAuthenticated();
  const classes = useStyles();
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
        <ReferenceArrayField reference="Theme" source="pair:hasTopic">
          <SingleFieldList linkType={false}>
            <ChipField color="primary" size="medium" source="pair:label" className={classes.chip} />
          </SingleFieldList>
        </ReferenceArrayField>
        <MarkdownField source="pair:description" />
      </CardLayout>
    </Show>
  );
}

export default CourseShow;
