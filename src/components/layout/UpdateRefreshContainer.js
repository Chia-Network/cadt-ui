import React from 'react';
import { Alert, NotificationCard } from '..';

const UpdateRefreshContainer = ({ onRefresh, onClose }) => {
  return (
    <NotificationCard>
      <Alert
        onRefresh={onRefresh}
        onClose={onClose}
        bannerMode
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
