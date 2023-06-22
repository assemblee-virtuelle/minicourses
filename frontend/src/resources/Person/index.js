import React from "react";
// import { Redirect } from 'react-router';
import { Navigate } from "react-router-dom";

const RedirectToHomepage = () => <Navigate to="/" replace />;

export default {
  config: {
    show: RedirectToHomepage,
    edit: RedirectToHomepage,
    list: RedirectToHomepage
  },
  dataModel: {
    types: ['pair:Person'],
    fieldsMapping: {
      title: 'pair:label'
    }
  }
};
