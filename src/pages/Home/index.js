import React from 'react';

import { Card, H3, H2, H4, H1, Subtitle, MenuText, TableCellHeaderText, TableCellText } from '../../components';

const Home = () => {
  return (
    <>
      <Card>
        <H1>This is an header H1</H1>
        <H2>This is an header H2</H2>
        <H3>This is an header H3</H3>
        <H4>This is an header H4</H4>
        <Subtitle>This is a Subtitle</Subtitle>
        <MenuText>This is Menu Text</MenuText>
        <TableCellHeaderText>This is a Table Cell Header</TableCellHeaderText>
        <TableCellText>This is Table Cell Text</TableCellText>
      </Card>
    </>
  );
};

export { Home };
