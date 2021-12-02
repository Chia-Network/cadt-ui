import React from 'react';
import { useIntl } from 'react-intl';

import { Card, H3 } from '../../../components';

const Units = () => {
  const intl = useIntl();

  return (
    <>
      <Card>
        <H3>{intl.formatMessage({ id: 'hello-world' })}</H3>
      </Card>
    </>
  );
};

export { Units };
