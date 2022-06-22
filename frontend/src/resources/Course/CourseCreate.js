import React, { useCallback } from 'react';
import { TextInput, SimpleForm, useNotify, useRedirect, useDataProvider } from 'react-admin';
import { useDataModel } from '@semapps/semantic-data-provider';
import Create from '../../layout/Create';

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const CourseCreate = props => {
  const dataModel = useDataModel(props.resource);
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const onSuccess = useCallback(async ({ data }) => {
    // Check all collections have been created before redirecting
    // If we don't do that, collections may be overwritten when editing
    while (!data.followers || !data.following || !data.inbox || !data.outbox || !data.liked) {
      await delay(1000);
      data = (await dataProvider.getOne(props.resource, { id: data.id })).data;
    }
    notify('ra.notification.created', { messageArgs: { smart_count: 1 } });
    redirect('edit', props.basePath, data.id, data);
  }, [props.basePath, props.resource, dataProvider, notify, redirect]);

  return (
    <Create onSuccess={onSuccess} {...props}>
      <SimpleForm>
        <TextInput source={dataModel?.fieldsMapping?.title} fullWidth />
      </SimpleForm>
    </Create>
  );
}

export default CourseCreate;
