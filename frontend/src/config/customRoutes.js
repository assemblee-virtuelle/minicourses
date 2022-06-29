import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";

export default [
  <Route exact path="/" component={HomePage} />,
  <Route path="/admin" component={AdminPage} />
];
