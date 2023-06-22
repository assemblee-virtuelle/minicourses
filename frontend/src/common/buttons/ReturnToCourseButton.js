import React from 'react';
import { Button, Link, linkToRecord } from "react-admin";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReturnToCourseButton = ({ record, linkType }) => {
  return (
    <Button
      component={Link}
      to={linkToRecord('/Course', record?.['pair:partOf'], linkType) + '/1'}
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
