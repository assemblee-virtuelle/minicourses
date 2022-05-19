import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import IconsList from "../../common/list/IconsList";
import CourseDurationField from "../../common/fields/CourseDurationField";
import CourseContentField from "../../common/fields/CourseContentField";
import CourseRegistrantsField from "../../common/fields/CourseRegistrantsField";

const CourseDetails = (props) => (
  <IconsList {...props}>
    <CourseDurationField label="Durée" icon={<ScheduleIcon />} />
    <CourseContentField label="Contenu" icon={<FileCopyOutlinedIcon />} />
    <CourseRegistrantsField label="Participation" icon={<PeopleOutlineIcon />} />
  </IconsList>
);

export default CourseDetails;
