import React from 'react';
import { useGetList } from "react-admin";
import {LinearProgress, withStyles, Typography} from "@material-ui/core";
import useRegistration from "../../hooks/useRegistration";

const STATUS_FINISHED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/finished';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 18,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#e0e0e0',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#bdc900',
  },
}))(LinearProgress);

const CourseRegistrantsField = ({ record, resource, basePath, ...rest }) => {
  const registration = useRegistration(record);

  const { ids } = useGetList(
    'Lesson',
    { page: 1, perPage: 1000 },
    {},
    { 'pair:partOf': record?.id },
    { enabled: !!(record?.id) }
  );

  if( !ids || !registration ) return null;

  let value;
  if( !registration['tutor:currentLesson'] ) {
    if( !registration['pair:hasStatus'] === STATUS_FINISHED ) {
      value = ids.length;
    } else {
      value = 0;
    }
    value = 0;
  } else {
    value = ids.findIndex(lessonUri => lessonUri === registration['tutor:currentLesson']) + 1;
  }

  return (
    <div>
      <Typography variant="body2" {...rest}>Vous avez reçu {value} fiche(s) sur {ids.length}</Typography>
      <BorderLinearProgress variant="determinate" value={(value / ids.length) * 100} />
    </div>
  );
};

export default CourseRegistrantsField;
