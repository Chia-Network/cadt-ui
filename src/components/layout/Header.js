import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LocaleSwitcher, Body, AppLogo, MyAccount } from '..';

const Headline = styled('div')`
  border-top: 8px solid ${props => props.theme.colors.default.secondary};
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.default.primary};
`;

const LogoContainer = styled('div')`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
          <AppLogo width="100%" height="80%" />
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
