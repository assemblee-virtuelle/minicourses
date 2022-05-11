import React from 'react';
import { TextInput, SimpleForm } from 'react-admin';
import { Create } from '@semapps/archipelago-layout';
import { useDataModel } from '@semapps/semantic-data-provider';

const PairResourceCreate = props => {
  const dataModel = useDataModel(props.resource);
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={dataModel?.fieldsMapping?.title} fullWidth />
      </SimpleForm>
    </Create>
  );
}

export default PairResourceCreate;
