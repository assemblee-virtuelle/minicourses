import React from "react";
import { Redirect } from 'react-router';

const RedirectToHomepage = () => <Redirect redirectTo="/" />;

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
