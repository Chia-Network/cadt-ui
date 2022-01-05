import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Notification } from '../blocks/Notifications';

const notificationAnimation = keyframes`
 0% { right: -40rem}
 100% { right: 0}
`;

const NotificationCard = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  animation-name: ${notificationAnimation};
  animation-duration: 1.5s;
`;

function NotificationContainer({ socketStatus, setNotification }) {
  return (
    <NotificationCard>
      <Notification
        showIcon="info"
        title="Socket Connection Status:"
        body={socketStatus}
        onClose={
          socketStatus === 'AUTHENTICATED' &&
          setTimeout(() => setNotification(false), 5000)
        }
        onClick={() => setNotification(false)}
      />
    </NotificationCard>
  );
}

export { NotificationContainer };
