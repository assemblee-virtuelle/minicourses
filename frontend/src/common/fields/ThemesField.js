import React, { useMemo } from 'react';
import { Chip } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { getThemesOptions } from "../../utils";

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 4,
    marginBottom: -4
  }
}));

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value]);

const ThemesField = ({ record, source }) => {
  const classes = useStyles();
  const themes = useMemo(() => Object.fromEntries(getThemesOptions().map(option => ([ option.id, option.name ]))), []);
  return (
    <>
      {defaultToArray(record?.[source]).map(themeUri => (
        <Chip key={themeUri} color="primary" size="medium" className={classes.chip} label={themes[themeUri]} />
      ))}
    </>
  )
}

ThemesField.defaultProps = {
  addLabel: true
};

export default ThemesField;
