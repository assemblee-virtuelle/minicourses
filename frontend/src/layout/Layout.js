import React from 'react';
import { Notification } from 'react-admin';
import { Container, Box, useMediaQuery, ThemeProvider } from '@material-ui/core';
import ScrollToTop from './ScrollToTop';

const Layout = ({ title, open, logout, theme, children }) => {
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Container maxWidth="md" disableGutters={xs}>
        <Box m={{ xs: 1, sm: 3 }}>{children}</Box>
      </Container>
      {/* Required for react-admin optimistic update */}
      <Notification />
    </ThemeProvider>
  );
};

export default Layout;
