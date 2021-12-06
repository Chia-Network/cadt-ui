import React from 'react';

import { Card, H3, H2, H1 } from '../../components';
import { Subtitle } from '../../components/typography/Subtitle';

const Home = () => {

  return (
    <>
      <Card>
        <H1>This is an H1</H1>
        <H2>This is an H2</H2>
        <H3>This is an H3</H3>
        <Subtitle>This is a Subtitle</Subtitle>
      </Card>
    </>
  );
};

export { Home };
