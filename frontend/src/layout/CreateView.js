import React from 'react';
import { ListButton, ShowButton, useCreateContext } from 'react-admin';
import { Box, Typography, Grid, Card } from '@material-ui/core';

const EditView = (props) => {
  const {
    basePath,
    defaultTitle,
    record,
    redirect,
    resource,
    save,
    saving,
    version,
  } = useCreateContext(props);
  return(
    <>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h3" color="primary" component="h1">
            {defaultTitle}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="middle" justifyContent="right" pt={3}>
            <ListButton record={record} />
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Card>
          {record ? React.cloneElement(React.Children.only(props.children), {
            basePath,
            record,
            redirect:
              typeof props.children.props.redirect === 'undefined'
                ? redirect
                : props.children.props.redirect,
            resource,
            save:
              typeof props.children.props.save === 'undefined'
                ? save
                : props.children.props.save,
            saving,
            version,
          }) : null}
        </Card>
      </Box>
    </>
  )
};

export default EditView;
