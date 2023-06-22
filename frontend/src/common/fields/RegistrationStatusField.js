import React from 'react';
import { Chip } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const STATUS_RUNNING = process.env.REACT_APP_MIDDLEWARE_URL + 'status/running';
const STATUS_ABORTED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/aborted';
const STATUS_FINISHED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/finished';

const RegistrationStatusField = ({ record, reference, source, registrations, ...rest }) => {
  const registration = registrations.find(r => r['tutor:registrationFor'] === record.id);
  if( !registration ) return null;

  switch(registration['pair:hasStatus']) {
    case STATUS_RUNNING:
      return <Chip label="En cours" color="primary" icon={<AutorenewIcon />} {...rest} />;
    case STATUS_ABORTED:
      return <Chip label="Interrompu" icon={<CloseIcon />} {...rest} />;
    case STATUS_FINISHED:
      return <Chip label="Terminé" icon={<CheckIcon />} {...rest} />;
    default:
      return null;
  }
};

export default RegistrationStatusField;