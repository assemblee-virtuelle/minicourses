import React from 'react';
import { useGetList } from "react-admin";

const CourseDurationField = ({ record, ...rest }) => {
  const { data, ids, loading, error } = useGetList(
    'Lesson',
    { page: 1, perPage: 1000 },
    {},
    { 'pair:partOf': record?.id },
    { enabled: !!(record?.id) }
  );

  if( loading || error || ids.length === 0 ) return null;

  const totalDuration = Object.values(data).reduce((acc, lesson) => acc + lesson['tutor:duration'], 0);

  return <span {...rest}>{totalDuration} jours</span>
};

export default CourseDurationField;
