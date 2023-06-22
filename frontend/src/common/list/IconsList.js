import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { useShowContext } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: props.isVertical ? 'column' : 'row',
    alignItems: props.isVertical ? undefined : 'flex-start',
    padding: 0,
    margin: props.isVertical ? 0 : '0 -16px 0 -16px',
    '&::after': {
      content: `''`,
      flexGrow: 99999
    },
  }),
  item: (props) => ({
    width: 'unset',
    flexGrow: 1,
    padding: props.isVertical ? '8px 0 8px 0' : '0 16px 0 16px',
  }),
  avatar: {
    minWidth: 32,
  },
  icon: {
    marginTop: 4,
    fontSize: '1.6rem',
  },
  divider: {
    backgroundColor: '#a6a6a6',
  },
  text: {
    marginBottom: 3,
  },
  primary: (props) => ({
    whiteSpace: props.isVertical ? undefined : 'nowrap',
    lineHeight: 1
  })
}));

const IconsList = ({ orientation, children }) => {
  const isVertical = orientation === 'vertical';
  const classes = useStyles({ isVertical });
  const { basePath, loaded, record, resource } = useShowContext();

  if (!loaded) return null;

  const fields = React.Children.toArray(children).filter(
    (field) => field && React.isValidElement(field)
  );

  const dividerOrientation = isVertical ? 'horizontal' : 'vertical';

  return (
    <List className={classes.root}>
      {fields.map((field, i) => {
        const value = React.cloneElement(field, {
          record,
          resource,
          basePath,
        });
        return (
          <React.Fragment key={i}>
            <ListItem className={classes.item} p={2}>
              {field.props.icon && (
                <ListItemAvatar className={classes.avatar}>
                  {React.cloneElement(field.props.icon, {
                    className: classes.icon,
                  })}
                </ListItemAvatar>
              )}
              <ListItemText
                primary={value}
                classes={{ root: classes.text, primary: classes.primary, secondary: classes.secondary }}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
            </ListItem>
            {i < fields.length - 1 && (
              <Divider orientation={dividerOrientation} className={classes.divider} flexItem={!isVertical} />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

IconsList.defaultProps = {
  orientation: 'horizontal',
};

export default IconsList;
