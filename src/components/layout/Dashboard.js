import React from 'react';
//import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { LeftNav, AddIcon, SearchInput, Tag, PrimaryButton } from '..';

const Container = styled('div')`
  width: 100%;
  display: flex;
  background-color: #e5e5e5;
  flex-direction: column;
  justify-content: space-between;
`;

const Headline = styled('div')`
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
`;

const Main = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Body = styled('div')`
  max-width: 71rem;
  width: calc(100% - 3rem);
  height: 46.75rem;
  margin: 1.5rem;
  background-color: #ffffff;
  overflow: hidden;
`;

const Dashboard = withTheme(({ children }) => {
  //const appStore = useSelector(state => state.app);
  return (
    <Main>
      <LeftNav />
      <Container>
        <Headline />
        <Body>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: '30px 0px',
            }}>
            <SearchInput outline />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
                width: '20%',
              }}>
              <Tag body="Unit Text" closeable />
              <Tag body="Unit Text" closeable />
              <Tag body="Unit Text" closeable />
            </div>
            <PrimaryButton label="Create" size="large" icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />} />
          </div>
          <div style={{ height: '85%' }}>{children}</div>
        </Body>
      </Container>
    </Main>
  );
});

export { Dashboard };
