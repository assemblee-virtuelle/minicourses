import React, { useMemo } from 'react';
import {Chip, makeStyles} from "@material-ui/core";
import { getThemesOptions } from "../../utils";

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 4,
    marginBottom: -4
  }
}));

const ThemesField = ({ record, source }) => {
  const classes = useStyles();
  const themes = useMemo(() => Object.fromEntries(getThemesOptions().map(option => ([ option.id, option.name ]))), []);
  return (
    <>
      {record?.[source].map(themeUri => (
        <Chip key={themeUri} color="primary" size="medium" className={classes.chip} label={themes[themeUri]} />
      ))}
    </>
  )
}

ThemesField.defaultProps = {
  addLabel: true
};

export default ThemesField;
