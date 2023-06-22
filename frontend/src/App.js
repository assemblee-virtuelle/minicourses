import React from 'react';
import { Admin, Resource, memoryStore, Notification, CustomRoutes } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import LoginPage from './layout/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';

import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import * as resources from './resources';

import Layout from './layout/Layout';

const App = () => (
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Admin
          disableTelemetry
          title="Mini-parcours Colibris"
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          layout={Layout}
          theme={theme}
          loginPage={LoginPage}
          store={memoryStore()}
          dashboard={AdminPage}
          notification={Notification}
        >
          {/* <CustomRoutes>
            <Route path="/" component={HomePage} />
          </CustomRoutes>
          <CustomRoutes>
            <Route path="/admin" component={AdminPage} />
          </CustomRoutes> */}
          {Object.entries(resources).map(([key, resource]) => (
            <Resource key={key} name={key} {...resource.config} />
          ))}
        </Admin>
      </ThemeProvider> 
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
