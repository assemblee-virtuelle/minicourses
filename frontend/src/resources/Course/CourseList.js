import React from 'react';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from "../../common/list/CardsList";
import List from "../../layout/List";
import CourseCard from "./CourseCard";
import useRegistrations from "../../hooks/useRegistrations";

const CourseList = props => {
  useCheckAuthenticated();
  const registrations = useRegistrations();
  return (
    <List {...props}>
      <CardsList
        CardComponent={CourseCard}
        link="show"
        registrations={registrations}
      />
    </List>
  );
}

export default CourseList;
