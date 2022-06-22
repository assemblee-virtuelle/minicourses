import React, { useCallback } from 'react';
import { useRecordContext, useNotify, useRefresh } from "react-admin";
import { useOutbox, useCollection, ACTIVITY_TYPES, PUBLIC_URI } from '@semapps/activitypub-components';
import { Button, useMediaQuery, LinearProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const FollowButton = () => {
  const record = useRecordContext();
  const outbox = useOutbox();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const { items: following, loaded, addItem, removeItem } = useCollection('following');
  const notify = useNotify();
  const refresh = useRefresh();

  const follow = useCallback(async () => {
    addItem(record.id);
    await outbox.post({
      type: ACTIVITY_TYPES.FOLLOW,
      actor: outbox.owner,
      object: record.id,
      to: [record.id, PUBLIC_URI]
    });
    notify('Vous suivez maintenant ce parcours', 'success');
    await delay(2000);
    refresh();
  }, [outbox, record, notify, refresh, addItem]);

  const unfollow = useCallback(async () => {
    removeItem(record.id);
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
  }, [outbox, record, notify, refresh, removeItem]);

  if( !loaded ) {
    return(
      <LinearProgress />
    );
  } else if( loaded && following.includes(record?.id) ) {
    return(
      <Button onClick={unfollow} fullWidth={xs} startIcon={<ClearIcon />} variant="contained" size="large" color="primary">Arrêter ce parcours</Button>
    )
  } else {
    return(
      <Button onClick={follow} fullWidth={xs} startIcon={<CheckIcon />} variant="contained" size="large" color="primary">Suivre ce parcours</Button>
    )
  }
};

export default FollowButton;
