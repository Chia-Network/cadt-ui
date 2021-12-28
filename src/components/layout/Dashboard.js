import React from 'react';
//import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { LeftNav } from '..';

const Container = styled('div')`
  width: 100%;
  display: flex;
  background-color: #e5e5e5;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
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
  max-width: calc(100% - 3rem);
  width: calc(100% - 3rem);
  height: 100%;
  margin: 1.5rem;
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
`;

const Dashboard = withTheme(({ children }) => {
  //const appStore = useSelector(state => state.app);
  return (
    <Main>
      <LeftNav />
      <Container>
        <Headline />
        <Body>
          {children}
        </Body>
      </Container>
    </Main>
  );
});

export { Dashboard };
