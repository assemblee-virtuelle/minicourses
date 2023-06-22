import React, { useCallback } from 'react';
import { useRecordContext, useNotify, useRefresh } from "react-admin";
import { useOutbox, ACTIVITY_TYPES, PUBLIC_URI } from '@semapps/activitypub-components';
import { Button, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import useRegistration from "../../hooks/useRegistration";

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const STATUS_RUNNING = process.env.REACT_APP_MIDDLEWARE_URL + 'status/running';
const STATUS_ABORTED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/aborted';
const STATUS_FINISHED = process.env.REACT_APP_MIDDLEWARE_URL + 'status/finished';

const FollowButton = () => {
  const record = useRecordContext();
  const registration = useRegistration(record);
  const outbox = useOutbox();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const notify = useNotify();
  const refresh = useRefresh();

  const follow = useCallback(async () => {
    await outbox.post({
      type: ACTIVITY_TYPES.FOLLOW,
      actor: outbox.owner,
      object: record.id,
      to: [record.id, PUBLIC_URI]
    });
    notify('Vous suivez maintenant ce parcours', 'success');
    await delay(2000);
    refresh();
  }, [outbox, record, notify, refresh]);

  const unfollow = useCallback(async () => {
    await outbox.post({
      type: ACTIVITY_TYPES.UNDO,
      actor: outbox.owner,
      object: {
        type: ACTIVITY_TYPES.FOLLOW,
        object: record.id,
      },
      to: [record.id, PUBLIC_URI]
    });
    notify('Vous ne suivez plus ce parcours', 'success');
    await delay(2000);
    refresh();
  }, [outbox, record, notify, refresh]);

  if( !registration ) {
    return( <Button onClick={follow} fullWidth={xs} startIcon={<CheckIcon />} variant="contained" size="large" color="primary">Suivre ce parcours</Button> );
  } else if( registration['pair:hasStatus'] === STATUS_RUNNING ) {
    return( <Button onClick={unfollow} fullWidth={xs} startIcon={<ClearIcon />} variant="contained" size="large" color="primary">Arrêter ce parcours</Button> );
  } else if( registration['pair:hasStatus'] === STATUS_FINISHED || registration['pair:hasStatus'] === STATUS_ABORTED ) {
    return( <Button onClick={follow} fullWidth={xs} startIcon={<AutorenewIcon />} variant="contained" size="large" color="primary">Recommencer ce parcours</Button> );
  }
};

export default FollowButton;
