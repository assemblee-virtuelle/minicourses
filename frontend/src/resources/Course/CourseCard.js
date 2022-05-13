import React from 'react';
import { TextField } from 'react-admin';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    lineHeight: 1.2,
    marginBottom: 8,
    color: theme.palette.primary.main,
  },
  description: {
    marginTop: 10,
  },
}));

const CourseCard = ({ record }) => {
  const classes = useStyles();
  return (
    <>
      <TextField record={record} variant="h2" component="div"  source="pair:label" className={classes.title} />
      <TextField record={record} source="pair:comment" variant="body2" className={classes.description}/>
    </>
  );
};

export default CourseCard;
