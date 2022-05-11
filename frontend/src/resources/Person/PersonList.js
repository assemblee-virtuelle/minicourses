import React from 'react';
import { Avatar } from '@material-ui/core';
import { AvatarField, GridList, MultiViewsList, SimpleList } from '@semapps/archipelago-layout';
import { MapList } from '@semapps/geo-components';
import { ListWithPermissions } from '@semapps/auth-provider';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const PersonList = props => (
  <MultiViewsList
    ListComponent={ListWithPermissions}
    views={{
      avatar: {
        label: 'Trombinoscope',
        icon: AccountCircleIcon,
        sort: { field: 'pair:lastName', order: 'DESC' },
        perPage: 500,
        pagination: false,
        list: (
          <GridList xs={2} linkType="show">
            <AvatarField label="pair:label" image="image" />
          </GridList>
        )
      },
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:lastName', order: 'DESC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            secondaryText={record => record['pair:comment']}
            leftAvatar={record => (
              <Avatar src={record['image']} width="100%">
                <PersonIcon />
              </Avatar>
            )}
            linkType="show"
          />
        )
      },
      map: {
        label: 'Carte',
        icon: MapIcon,
        perPage: 500,
        pagination: false,
        list: (
          <MapList
            latitude={record => record?.['pair:hasLocation']?.['pair:latitude']}
            longitude={record => record?.['pair:hasLocation']?.['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['pair:comment']}
            scrollWheelZoom
          />
        )
      }
    }}
    {...props}
  />
);

export default PersonList;
