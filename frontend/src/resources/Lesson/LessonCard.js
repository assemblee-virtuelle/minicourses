import React from 'react';
import { TextField, NumberField } from 'react-admin';
import {Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    lineHeight: 1.2,
    marginBottom: 8,
    color: theme.palette.primary.main,
  },
  description: {
    marginTop: 10,
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '4.2em',
  },
}));

const LessonCard = ({ record }) => {
  const classes = useStyles();
  return (
    <>
      <TextField variant="h2" component="div" record={record} source="pair:label" className={classes.title} />
      <TextField record={record} source="pair:description" variant="body2" className={classes.description}/>
      <Typography variant="body2" className={classes.description}>
        <strong>Durée:&nbsp;</strong>
        <NumberField record={record} source="tutor:duration" variant="body2" />
        &nbsp;jours
      </Typography>
    </>
  );
};

export default LessonCard;
