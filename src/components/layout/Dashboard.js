import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import {
  LeftNav,
  LocaleSwitcher,
  Body,
  ClimateWarehouseLogo,
  MyAccount,
} from '..';

const Headline = styled('div')`
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
`;

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
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
`;

const InnerContainer = styled('div')`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const LogoContainer = styled('div')`
  align-self: center;
  height: 100%;
`;

const StyledLocalContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  gap: 20px;
  padding: 0rem 1.5rem;
  box-sizing: border-box;
`;

const HomeOrgUidContainer = styled('div')`
  margin-left: auto;
  align-self: center;
`;

const Dashboard = withTheme(({ children }) => {
  const climateWarehouseStore = useSelector(state => state.climateWarehouse);

  const homeOrgUid = useMemo(
    () =>
      climateWarehouseStore?.organizations &&
      Object.values(climateWarehouseStore.organizations).filter(
        org => org.isHome != false,
      )[0]?.orgUid,
    [climateWarehouseStore.organizations],
  );

  return (
    <Main>
      <Headline>
        <StyledLocalContainer>
          <LogoContainer>
            <ClimateWarehouseLogo width="100%" height="100%" />
          </LogoContainer>
          <HomeOrgUidContainer>
            {homeOrgUid ? (
              <div>
                <Body size="Small">{`Organization ID: ${homeOrgUid}`}</Body>
              </div>
            ) : null}
          </HomeOrgUidContainer>
          <MyAccount />
          <LocaleSwitcher />
        </StyledLocalContainer>
      </Headline>
      <InnerContainer>
        <LeftNav />
        <BodyText>{children}</BodyText>
      </InnerContainer>
    </Main>
  );
});

export { Dashboard };
