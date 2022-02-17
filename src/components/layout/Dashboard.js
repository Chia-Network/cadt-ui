import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { LeftNav, LocaleSwitcher, Body } from '..';

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

const BodyText = styled('div')`
  max-width: calc(100% - 3rem);
  width: calc(100% - 3rem);
  height: 100%;
  margin: 1.5rem;
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
`;

const StyledLocalContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0rem 1.5rem 0rem 1.5rem;
  box-sizing: border-box;
`;

const HomeOrgUidContainer = styled('div')`
  width: 100%;
  align-self: center;
`;

const Dashboard = withTheme(({ children }) => {
  const climateWarehouseStore = useSelector(state => state.climateWarehouse);
  const homeOrgUid = Object.values(climateWarehouseStore.organizations).filter(
    org => org.isHome != false,
  )[0]?.orgUid;

  return (
    <Main>
      <LeftNav />
      <Container>
        <Headline>
          <StyledLocalContainer>
            <HomeOrgUidContainer>
              {homeOrgUid ? (
                <Body size="Small">{`Organization ID: ${homeOrgUid}`}</Body>
              ) : null}
            </HomeOrgUidContainer>
            <LocaleSwitcher />
          </StyledLocalContainer>
        </Headline>
        <BodyText>{children}</BodyText>
      </Container>
    </Main>
  );
});

export { Dashboard };
