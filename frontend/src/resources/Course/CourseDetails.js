import React from 'react';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import IconsList from "../../common/list/IconsList";
import CourseDurationField from "../../common/fields/CourseDurationField";
import CourseContentField from "../../common/fields/CourseContentField";
import CourseRegistrantsField from "../../common/fields/CourseRegistrantsField";

const CourseDetails = (props) => (
  <IconsList {...props}>
    <CourseDurationField source="tutor:duration" label="Durée" icon={<ScheduleIcon />} />
    <CourseContentField source="pair:hasPart" label="Contenu" icon={<FileCopyOutlinedIcon />} />
    <CourseRegistrantsField source="tutor:hasRegistration" label="Participation" icon={<PeopleOutlineIcon />} />
  </IconsList>
);

export default CourseDetails;
