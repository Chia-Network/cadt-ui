import React from 'react';
import styled from 'styled-components';
import { Alert } from '..';

const NotificationCard = styled('div')`
  position: absolute;
  top: 2.0625rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const UpdateRefreshContainer = ({onRefresh, onClose}) => {
  
  return (
    <NotificationCard>
      <Alert
        onRefresh={onRefresh}
        onClose={onClose}
        alertRefresh
        closeable
        showIcon
        type="info"
        alertTitle="Refresh Page"
        alertBody="the data that is viewed may be out of date, and a refresh is reccomended"
      />
    </NotificationCard>
  );
};

export { UpdateRefreshContainer };
