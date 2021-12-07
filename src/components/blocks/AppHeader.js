import React from 'react';
import styled, { withTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import constants from '../../constants';
import { H1, ChiaLogo, LocaleSwitcher } from '../../components';

const AppHeaderContainer = styled('header')`
  width: 100%;
  height: ${constants.HEADER_HEIGHT}px;
  background-color: ${props => props.theme.colors[props.selectedTheme].surface};
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled('div')`
  width: 6.1875rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppOptionsContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const AppHeader = withTheme(() => {
  const appStore = useSelector(state => state.app);

  return (
    <AppHeaderContainer selectedTheme={appStore.theme}>
      <LogoContainer>
        <ChiaLogo width={65} height={25} />
      </LogoContainer>
      <H1>
        <FormattedMessage id="app-title" />
      </H1>
      <AppOptionsContainer>
        <LocaleSwitcher />
      </AppOptionsContainer>
    </AppHeaderContainer>
  );
});

export { AppHeader };
