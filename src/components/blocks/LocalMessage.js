import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { NotificationCard, Alert } from '../../components';

const LocalMessageTypeEnum = {
  error: 'error',
  success: 'success',
};

const LocalMessage = ({ type, msg, onClose }) => {
  const intl = useIntl();
  const ref = useRef(null);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
    if (ref && ref.current) {
      ref.current.remove();
    }
  };

  return (
    <React.Fragment ref={ref}>
      {type === LocalMessageTypeEnum.error && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'something-went-wrong' })}
            alertBody={msg}
            showIcon
            closeable
            onClose={onClose}
          />
        </NotificationCard>
      )}
      {type === LocalMessageTypeEnum.success && (
        <NotificationCard>
          <Alert
            type="success"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'success' })}
            alertBody={msg}
            showIcon
            closeable
            onClose={handleOnClose}
          />
        </NotificationCard>
      )}
    </React.Fragment>
  );
};

export { LocalMessage, LocalMessageTypeEnum };
