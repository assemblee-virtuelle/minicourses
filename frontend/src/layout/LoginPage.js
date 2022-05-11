import React from 'react';
import { LoginPage as SemAppsLoginPage } from '@semapps/auth-provider';
import { Avatar, Button } from '@material-ui/core';

const LoginPage = (props) => {
  return <SemAppsLoginPage buttons={[<Button startIcon={<Avatar src="/logo.png" />}>Mon Profile Colibris</Button>]} {...props} />
};

export default LoginPage;
