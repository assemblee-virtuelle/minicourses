import React from 'react';
import { Button, Link, linkToRecord } from "react-admin";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ReturnToCourseButton = ({ record, linkType }) => {
  return (
    <Button
      component={Link}
      to={linkToRecord('/Course', record?.['pair:partOf'], linkType)}
      label="Retour"
    >
      <ArrowBackIcon />
    </Button>
  );
}

ReturnToCourseButton.defaultProps = {
  linkType: 'edit'
};

export default ReturnToCourseButton;
