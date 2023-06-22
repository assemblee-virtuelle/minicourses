import React from 'react';
import { Button, Link } from "react-admin";
import makeStyles from '@mui/styles/makeStyles';
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
}));

const AddLessonButton = ({ record }) => {
  const classes = useStyles();
  return (
    <Button
      component={Link}
      to={{
        pathname: "/Lesson/create",
        state: { record: { 'pair:partOf': record.id } },
      }}
      label="Ajouter une fiche"
      variant="contained"
      color="primary"
      className={classes.button}
    >
      <ChatBubbleIcon />
    </Button>
  );
}

export default AddLessonButton;
