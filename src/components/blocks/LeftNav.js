import React, { useMemo } from 'react';
import styled, { withTheme } from 'styled-components';
import { ClimateWarehouseLogo } from '../../components';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const NavContainer = styled('div')`
  width: 256px;
  height: 100%;
  background-color: #3b8ee0;
`;

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const MenuItem = styled('a')`
  background: ${props => (props.selected ? '#e0f4fe' : 'transparent')};
  padding: 6px 30px;
  color: ${props => (props.selected ? '#003a8c' : '#ffffff')};
  font-family: ${props => props.theme.typography.primary.bold};
  cursor: pointer;
  display: block;
  text-decoration: none;
`;

const LeftNav = withTheme(({ children }) => {
  const location = useMemo(() => {
    return window.location.pathname.split('/')[1];
  }, [window.location]);

  return (
    <Container>
      <NavContainer>
        <LogoContainer>
          <ClimateWarehouseLogo />
        </LogoContainer>

        <MenuItem selected={location === ''} href="/">
          Projects
        </MenuItem>
        <MenuItem selected={location === 'units'} href="/units">
          Units
        </MenuItem>
        <MenuItem selected={location === 'storybook'} href="/storybook">
          StoryBook
        </MenuItem>
      </NavContainer>
      {children}
    </Container>
  );
});

export { LeftNav };
