import React from 'react';
import { TextField } from 'react-admin';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { SeparatedListField } from '@semapps/archipelago-layout';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import IconsList from "../../common/list/IconsList";
import CourseDurationField from "../../fields/CourseDurationField";
import CourseContentField from "../../fields/CourseContentField";

const CourseDetails = (props) => (
  <IconsList {...props}>
    <CourseDurationField label="Durée" icon={<ScheduleIcon />} />
    <CourseContentField label="Contenu" icon={<FileCopyOutlinedIcon />} />
    <ReferenceArrayField label="Thématiques" reference="Theme" source="pair:hasTopic" icon={<StarBorderIcon />}>
      <SeparatedListField link={false} separator=", ">
        <TextField source="pair:label" />
      </SeparatedListField>
    </ReferenceArrayField>
  </IconsList>
);

export default CourseDetails;
