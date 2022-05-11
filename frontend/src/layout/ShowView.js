import React from 'react';
import { ListButton, EditButton, useShowContext } from 'react-admin';
import { Box, Typography, Grid } from '@material-ui/core';

const ShowView = (props) => {
  const { record } = useShowContext(props);
  return(
    <>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h3" color="primary" component="h1">
            {React.cloneElement(props.title, { record })}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="middle" justifyContent="right" pt={3}>
            <ListButton record={record} />
            <EditButton record={record} />
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        {props.children}
      </Box>
    </>
  )
};

export default ShowView;
