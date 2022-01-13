import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  setNotificationMessage,
  NotificationMessageTypeEnum,
} from '../../store/actions/app';

import { NotificationCard, Alert } from '../../components';

const Message = ({ type, id }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const setNotificationMessageToNull = () =>
    dispatch(setNotificationMessage(null));

  return (
    <>
      {type === NotificationMessageTypeEnum.error && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'something-went-wrong' })}
            alertBody={intl.formatMessage({ id })}
            showIcon
            closeable
            onClose={setNotificationMessageToNull}
          />
        </NotificationCard>
      )}
      {type === NotificationMessageTypeEnum.success && (
        <NotificationCard>
          <Alert
            type="success"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'Ok' })}
            alertBody={intl.formatMessage({ id })}
            showIcon
            closeable
            onClose={setNotificationMessageToNull}
          />
        </NotificationCard>
      )}
    </>
  );
};

export { Message };
