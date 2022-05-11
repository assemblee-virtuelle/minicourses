import React from 'react';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from "../../layout/CardsList";
import List from "../../layout/List";
import CourseCard from "./CourseCard";
import CourseTitle from "./CourseTitle";

const CourseList = props => {
  useCheckAuthenticated();
  return (
    <List title={<CourseTitle />} {...props}>
      <CardsList
        CardComponent={CourseCard}
        link="show"
      />
    </List>
  );
}

export default CourseList;
