import React from 'react';
import { useGetIdentity, useGetList } from "react-admin";
import { Chip } from "@material-ui/core";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const STATUS_RUNNING = process.env.REACT_APP_MIDDLEWARE_URL + 'status/running';
const STATUS_ABORTED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/aborted';
const STATUS_FINISHED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/finished';

const RegistrationStatusField = ({ record, reference, source, ...rest }) => {
  const { identity } = useGetIdentity();

  const { data, ids, loading, error } = useGetList(
    reference,
    { page: 1, perPage: 1000 },
    { field: 'pair:startDate', order: 'DESC' },
    { 'tutor:learner': identity?.id, 'tutor:course': record?.id },
    { enabled: !!(identity?.id && record?.id) }
  );

  if( loading || error || ids.length === 0 ) return null;

  const latestRegistration = data[ids[0]];

  switch(latestRegistration[source]) {
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