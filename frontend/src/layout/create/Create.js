import React from 'react';
import { CreateActions, CreateBase } from 'react-admin';
import CreateView from "./CreateView";

const Create = ({ actions, children, ...rest }) => {
  return (
  <CreateBase {...rest}>
    <CreateView actions={actions}>
      {children}
    </CreateView>
  </CreateBase>
)};

Create.defaultProps = {
  actions: <CreateActions />
};

export default Create;
