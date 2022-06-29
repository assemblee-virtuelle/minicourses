import * as React from 'react';
import { useListContext, Loading, linkToRecord, Link } from 'react-admin';
import { Card, CardMedia, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  loading: {
    height: '50vh',
  },
  details: {
    display: 'flex',
    marginTop: 8,
    marginBottom: 8,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundColor: theme.palette.grey['300'],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  content: {
    // flex: '1 0 auto',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
}));

const CardsList = ({ CardComponent, link, ...rest }) => {
  const classes = useStyles();
  const { ids, data, basePath, loading } = useListContext();
  return loading ? (
    <Loading loadingPrimary="ra.page.loading" loadingSecondary="ra.message.loading" className={classes.loading} />
  ) : (
    ids.map((id) => {
      if( !data[id] ) return null;
      const image = data[id]?.['pair:depictedBy'];
      return (
        <Link key={id} to={linkToRecord(basePath, id, link)} className={classes.root}>
          <Card key={id} className={classes.details}>
            {image && (
              <CardMedia className={classes.image} image={Array.isArray(image) ? image[0] : image} />
            )}
            <CardContent className={classes.content}>
              <CardComponent record={data[id]} basePath={basePath} {...rest} />
            </CardContent>
          </Card>
        </Link>
      )
    })
  );
};

CardsList.defaultProps = {
  link: 'show',
};

export default CardsList;
