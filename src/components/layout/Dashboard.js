import React from 'react';
import styled, { withTheme } from 'styled-components';

import { LeftNav, Header, ErrorBoundary } from '..';

const Main = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BodyText = styled('div')`
  max-width: calc(100% - 3rem);
  width: calc(100% - 3rem);
  margin: 1.5rem;
  background-color: ${props => props.theme.colors.default.white};
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InnerContainer = styled('div')`
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.default.shade5};
`;

const Dashboard = withTheme(({ children }) => {
  return (
    <Main>
      <Header />
      <InnerContainer>
        <ErrorBoundary>
          <LeftNav />
          <BodyText>{children}</BodyText>
        </ErrorBoundary>
      </InnerContainer>
    </Main>
  );
});

export { Dashboard };
