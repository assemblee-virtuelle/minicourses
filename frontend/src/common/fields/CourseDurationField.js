import React from 'react';

const CourseDurationField = ({ record, resource, basePath, source, ...rest }) => {
  return <span {...rest}>{record?.[source] || 0} jours</span>
};

export default CourseDurationField;
