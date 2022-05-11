import React from 'react';
import { useShowContext } from 'react-admin';
import { Card, CardMedia, CardContent, CardActions, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 210,
  },
  actions: {
    justifyContent: 'right',
    padding: 16,
    paddingTop: 0
  }
});

const CardLayout = ({ image, actions, children }) => {
  const classes = useStyles();
  const { record } = useShowContext();

  return(
    <Card>
      <CardMedia image={record?.[image]} className={classes.media} />
      <CardContent>
        {React.Children.map(children, child => (
          React.cloneElement(child, { record })
        ))}
      </CardContent>
      <CardActions className={classes.actions}>
        {actions}
      </CardActions>
    </Card>
  )
};

export default CardLayout;
