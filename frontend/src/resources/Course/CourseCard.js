import React from 'react';
import { TextField } from 'react-admin';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import RegistrationStatusField from "../../common/fields/RegistrationStatusField";
import ScheduleIcon from '@mui/icons-material/Schedule';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PeopleIcon from '@mui/icons-material/People';
import Chip from "../../common/Chip";
import CourseDurationField from "../../common/fields/CourseDurationField";
import CourseContentField from "../../common/fields/CourseContentField";
import CourseRegistrantsField from "../../common/fields/CourseRegistrantsField";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 20,
    lineHeight: 1.2,
    marginBottom: 8
  },
  description: {
    marginTop: 10,
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '4.2em',
  },
  chip: {
    marginLeft: 10,
    marginTop: -5
  }
}));

const CourseCard = ({ record, registrations }) => {
  console.log("Dans CourseCard", [record, registrations] );
  const classes = useStyles();
  return (
    <>
      <Typography component="div">
        <TextField record={record} variant="h2" component="span" source="pair:label" className={classes.title} />
        <RegistrationStatusField record={record} registrations={registrations} size="small" reference="Registration" source="pair:hasStatus" className={classes.chip} />
      </Typography>
      <Chip icon={<ScheduleIcon />}>
        <CourseDurationField source="tutor:duration" label="Durée" record={record} />
      </Chip>
      <Chip icon={<FileCopyOutlinedIcon />}>
        <CourseContentField source="pair:hasPart" record={record} />
      </Chip>
      <Chip icon={<PeopleIcon />}>
        <CourseRegistrantsField source="tutor:hasRegistration" record={record} />
      </Chip>
      <TextField record={record} source="pair:description" variant="body2" className={classes.description}/>
    </>
  );
};

export default CourseCard;
