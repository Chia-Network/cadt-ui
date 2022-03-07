import { NotificationManager } from 'react-notifications';

export const createNotification = (type, message) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, 'Information', 5000);
      break;
    case 'ok':
    case 'success':
      NotificationManager.success(message, 'Success', 500);
      break;
    case 'warning':
      NotificationManager.warning(message, 'Warning', 5000);
      break;
    case 'error':
      NotificationManager.error(message, 'Error', 5000);
      break;
  }
};
