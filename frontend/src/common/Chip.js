import * as React from 'react';
import { Chip as MuiChip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'unset',
    height: 20,
  },
  icon: {
    width: 14,
    height: 14,
    marginLeft: 0,
    marginRight: 2,
  },
  label: {
    paddingLeft: 2,
    paddingRight: 12,
    '& span': {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'grey',
    }
  }
}));

const Chip = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiChip size="small" label={children} classes={classes} {...rest} />
  );
};

export default Chip;
