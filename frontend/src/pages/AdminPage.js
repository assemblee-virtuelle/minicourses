import React from 'react';
import CourseList from "../resources/Course/CourseList";

const AdminPage = () => (
  <CourseList
    defaultTitle="Edition de parcours"
    resource="Course"
    basePath="/Course"
    hasCreate={true}
  />
);

export default AdminPage;
