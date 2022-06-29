import React from 'react';

const CourseContentField = ({ record, resource, basePath, source, ...rest }) => {
  return <span {...rest}>{record?.[source]?.length || 0} fiches</span>
};

export default CourseContentField;
