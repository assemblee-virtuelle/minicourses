import React from 'react';
import { SsoLoginPage } from '@semapps/auth-provider';
import { Avatar, Button } from '@material-ui/core';

const LoginPage = (props) => {
  return <SsoLoginPage buttons={[<Button startIcon={<Avatar src="/logo.png" />}>Mon Profil Colibris</Button>]} {...props} />
};

export default LoginPage;
