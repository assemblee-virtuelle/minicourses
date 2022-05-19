import React from 'react';
import { TextField } from 'react-admin';
import { makeStyles, Typography } from '@material-ui/core';
import RegistrationStatusField from "../../fields/RegistrationStatusField";
import ScheduleIcon from '@material-ui/icons/Schedule';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Chip from "../../common/Chip";
import CourseDurationField from "../../fields/CourseDurationField";
import CourseContentField from "../../fields/CourseContentField";

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

const CourseCard = ({ record }) => {
  const classes = useStyles();
  return (
    <>
      <Typography  component="div">
        <TextField record={record} variant="h2" component="span" source="pair:label" className={classes.title} />
        <RegistrationStatusField record={record} size="small" reference="Registration" source="pair:hasStatus" className={classes.chip} />
      </Typography>
      <Chip icon={<ScheduleIcon />}>
        <CourseDurationField label="Durée" record={record} />
      </Chip>
      <Chip icon={<FileCopyOutlinedIcon />}>
        <CourseContentField record={record} />
      </Chip>
      <TextField record={record} source="pair:description" variant="body2" className={classes.description}/>
    </>
  );
};

export default CourseCard;
