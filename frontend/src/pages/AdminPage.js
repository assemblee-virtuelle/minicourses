import React from 'react';
import CourseList from "../resources/Course/CourseList";

const AdminPage = () => (
  <CourseList
    resource="Course"
    basePath="/Course"
    hasCreate={true}
  />
);

export default AdminPage;
