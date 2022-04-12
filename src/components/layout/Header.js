import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LocaleSwitcher, Body, ClimateWarehouseLogo, MyAccount } from '..';

const Headline = styled('div')`
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
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

const Header = () => {
  const { serverAddress } = useSelector(state => state.app);
  const intl = useIntl();

  return (
    <Headline>
      <StyledLocalContainer>
        <LogoContainer>
          <ClimateWarehouseLogo width="100%" height="100%" />
        </LogoContainer>
        <HomeOrgUidContainer>
          {serverAddress && (
            <Body size="Small">
              {intl.formatMessage({
                id: 'connected-to',
              })}
              {': '}
              {serverAddress}
            </Body>
          )}
        </HomeOrgUidContainer>
        <MyAccount />
        <LocaleSwitcher />
      </StyledLocalContainer>
    </Headline>
  );
};

export { Header };
