import React, { useCallback } from 'react';
import { useRecordContext, useNotify } from "react-admin";
import { useOutbox, useCollection, ACTIVITY_TYPES, PUBLIC_URI } from '@semapps/activitypub-components';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const FollowButton = () => {
  const record = useRecordContext();
  const outbox = useOutbox();

  const { items: following, addItem, removeItem } = useCollection('following');
  const notify = useNotify();

  const follow = useCallback(async () => {
    addItem(record.id);
    await outbox.post({
      type: ACTIVITY_TYPES.FOLLOW,
      actor: outbox.owner,
      object: record.id,
      to: PUBLIC_URI
    });
    notify('Vous suivez maintenant ce cours', 'success');
  }, [outbox, record, notify, addItem]);

  const unfollow = useCallback(async () => {
    removeItem(record.id);
    await outbox.post({
      type: ACTIVITY_TYPES.UNDO,
      actor: outbox.owner,
      object: {
        type: ACTIVITY_TYPES.FOLLOW,
        object: record.id,
      },
      to: PUBLIC_URI
    });
    notify('Vous ne suivez plus ce cours', 'success');
  }, [outbox, record, notify, removeItem]);

  if( following.includes(record?.id) ) {
    return(
      <Button onClick={unfollow} startIcon={<ClearIcon />} variant="contained" size="large" color="primary">Arrêter ce parcours</Button>
    )
  } else {
    return(
      <Button onClick={follow} startIcon={<CheckIcon />} variant="contained" size="large" color="primary">Suivre ce parcours</Button>
    )
  }
};

export default FollowButton;
