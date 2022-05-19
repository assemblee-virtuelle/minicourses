import React from 'react';
import { useGetList } from "react-admin";

const CourseContentField = ({ record, ...rest }) => {
  const { ids, loading, error } = useGetList(
    'Lesson',
    { page: 1, perPage: 1000 },
    {},
    { 'pair:partOf': record?.id },
    { enabled: !!(record?.id) }
  );

  if( loading || error ) return null;

  return <span {...rest}>{ids.length} fiches</span>
};

export default CourseContentField;
