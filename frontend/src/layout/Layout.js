import React from 'react';
import { Logout } from 'react-admin';
import { Container, Zoom, Box, useMediaQuery, ThemeProvider, Typography } from '@mui/material';
import ScrollToTop from './ScrollToTop';
import { UserMenu } from '@semapps/auth-provider';
import { Link } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
// import ScrollToTop from './ScrollToTop';

const useStyles = makeStyles(theme => ({
  hero: {
    backgroundColor: theme.palette.primary.main,
  },
  userMenu: {
    float: 'right',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    '& button': {
      padding: '6px 12px'
    }
  },
  presContainer: {
    flex: 1,
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      flex: 'unset',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  },
  logoContainer: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      height: 48,
      marginLeft: '0.2em',
      marginRight: '0.2em',
      display: 'block'
    }
  },
  logo: {
    height: '100%'
  },
  title: {
    display: 'block',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  footer: {
    '@media print': {
      display: 'none'
    }
  },
  footerLink: {
    color: theme.palette.grey["500"],
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

const Layout = ({ title, children }) => {
  const classes = useStyles();
  return (
    <>
      <Box width={1} height="60px" className={classes.hero}>
        <Container>
          <Link to="/">
            <div className={classes.presContainer}>
              <div className={classes.logoContainer}>
                <Zoom in={true} timeout={2000}>
                  <img className={classes.logo} src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
                </Zoom>
              </div>
              <Typography variant="h4"  className={classes.title} component="h4" align="center">
                {title}
              </Typography>
            </div>
          </Link>
          <UserMenu logout={<Logout />} classes={{ user: classes.userMenu }} />
        </Container>
      </Box>
      <Container>
        <Box>
          {children}
        </Box>
        <Box className={classes.footer}>
          <Typography variant="subtitle2" color="textSecondary" align="right">
            <a href="https://semapps.org/" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>Plateforme propulsée par SemApps</a>
           </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
