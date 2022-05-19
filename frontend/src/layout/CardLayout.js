import React from 'react';
import { useShowContext } from 'react-admin';
import { Box, Card, CardMedia, CardContent, CardActions, makeStyles, useMediaQuery } from '@material-ui/core';
import VideoField from "../common/fields/VideoField";

const useStyles = makeStyles({
  media: {
    height: 300,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
  },
  details: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#e0e0e0',
  },
  actions: {
    justifyContent: 'right',
    padding: 16,
    paddingTop: 0
  }
});

const CardLayout = ({ image, video, actions, details, status, children }) => {
  const classes = useStyles();
  const { record } = useShowContext();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });

  return(
    <Card>
      {video
        ? <div className={classes.videoWrapper}><VideoField record={record} source={video} width="100%" height="100%" className={classes.video} /></div>
        : <CardMedia image={record?.[image]} className={classes.media}>
            {status &&
              <Box display="flex" width="100%" height="100%" alignItems="start" justifyContent="end">
                <Box p={2}>
                  {React.cloneElement(status, {record})}
                </Box>
              </Box>
            }
          </CardMedia>
      }
      {details &&
        <Box className={classes.details}>
          <Box display={xs ? 'block' : 'flex'}>
            {React.cloneElement(details, { orientation: xs ? 'vertical' : 'horizontal' })}
          </Box>
        </Box>
      }
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
