import React from 'react';
import { Admin, Resource } from 'react-admin';
import { LogoutButton } from '@semapps/auth-provider';
import { createBrowserHistory as createHistory } from 'history';

import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';

import Layout from './layout/Layout';
import LoginPage from './layout/LoginPage';
import theme from './config/theme';

const history = createHistory();

const App = () => (
  <Admin
    disableTelemetry
    history={history}
    title="Mini-parcours"
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    layout={Layout}
    theme={theme}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
  >
    {Object.entries(resources).map(([key, resource]) => (
      <Resource key={key} name={key} {...resource.config} />
    ))}
  </Admin>
);

export default App;
