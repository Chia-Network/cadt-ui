import React from 'react';

import {
  Card,
  H3,
  H2,
  H4,
  H1,
  Subtitle,
  MenuText,
  ButtonText,
  TableCellLinkText,
  DataTable,
} from '../../components';

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
        <ButtonText>This is Button Text</ButtonText>
        <DataTable
          headings={['Column 1', 'Column 2', 'Column 3']}
          data={[
            {
              column1: 'TEST_VALUE',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
          ]}
          actions={
            <>
              <TableCellLinkText href="#">Example Action</TableCellLinkText>
              {'  '}
              <TableCellLinkText href="#">Example Action 2</TableCellLinkText>
            </>
          }
        />
      </Card>
    </>
  );
};

export { Home };
