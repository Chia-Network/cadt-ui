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
  PrimaryButton,
  LightThemeIcon,
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
            {
              column1: 'TEST_VALUE',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
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
        <div
          style={{
            display: 'flex',
            height: '100px',
            justifyContent: 'flex-start',
            width: '80%',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <PrimaryButton label="Button" size="large" />
          <PrimaryButton label="Button" size="default" />
          <PrimaryButton label="Button" size="small" />
          <PrimaryButton label="Button" size="large" danger={true} />
          <PrimaryButton label="Button" size="default" danger={true} />
          <PrimaryButton label="Button" size="small" danger={true} />
          <PrimaryButton
            label="Button"
            size="large"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="default"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="small"
            icon={<LightThemeIcon color="white" height={15} />}
          />
          <PrimaryButton
            label="Button"
            size="large"
            danger={true}
            loading={true}
          />
          <PrimaryButton
            label="Button"
            size="default"
            danger={true}
            loading={true}
          />
          <PrimaryButton
            label="Button"
            size="small"
            danger={true}
            loading={true}
          />

          <PrimaryButton
            label="Button"
            size="large"
            danger={true}
            disabled={true}
          />
          <PrimaryButton
            label="Button"
            size="default"
            danger={true}
            disabled={true}
          />
          <PrimaryButton
            label="Button"
            size="small"
            danger={true}
            disabled={true}
          />
        </div>
      </Card>
    </>
  );
};

export { Home };
