import React from 'react';
import { ResourceContextProvider, ListContextProvider, useListController } from 'react-admin';
import ListView from "./ListView";

const List = (props) => {
  const controllerProps = useListController(props);
  return(
    <ResourceContextProvider value={props.resource}>
      <ListContextProvider value={controllerProps}>
        <ListView {...props} {...controllerProps} />
      </ListContextProvider>
    </ResourceContextProvider>
  )
};

export default List;
