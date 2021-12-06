import React from 'react';
import { useIntl } from 'react-intl';

import { Card, H3, H2, H1 } from '../../components';

const Home = () => {
  const intl = useIntl();

  return (
    <>
      <Card>
        <H3>{intl.formatMessage({ id: 'hello-world' })}</H3>
        <H1>This is an H1</H1>
        <H2>This is an H2</H2>
      </Card>
    </>
  );
};

export { Home };
