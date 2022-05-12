import React from 'react';

const LessonTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default LessonTitle;
