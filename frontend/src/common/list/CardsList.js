import * as React from 'react';
import { useListContext, Loading, TextField, linkToRecord, Link } from 'react-admin';
import { Card, CardMedia, CardHeader, CardContent } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

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
  const { data, isLoading } = useListContext();

  if (isLoading) return <Loading />;
  if (data.length === 0) return <p>No data</p>;

  return (
    <div style={{ margin: '1em' }}>
    {
      data.map(record => {
        const image = record?.['pair:depictedBy'];
        return (
          <Link key={record.id} to={linkToRecord(record.id, link)} className={classes.root}>
            <Card key={record.id} className={classes.details}>
              {image && (
                <CardMedia className={classes.image} image={Array.isArray(image) ? image[0] : image} />
              )}
              <CardContent className={classes.content}>
                <CardComponent record={record} {...rest} />
              </CardContent>
            </Card>
          </Link>
        )
      })
    }
    </div>
  )
}

CardsList.defaultProps = {
  link: 'show',
};

export default CardsList;
