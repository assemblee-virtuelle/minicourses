import React from 'react';

const CourseRegistrantsField = ({ record, resource, basePath, source, ...rest }) => {
  const registrants = !record?.[source] ? [] : Array.isArray(record?.[source]) ? record?.[source] : [record?.[source]];
  return <span {...rest}>{registrants.length || 0} participants</span>
};

export default CourseRegistrantsField;
