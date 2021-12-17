import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { ClimateWarehouseLogo } from '../../components';
import { Link } from 'react-router-dom';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const NavContainer = styled('div')`
  width: 16rem;
  min-width: 16rem;
  height: 100%;
  background-color: #3b8ee0;
`;

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const MenuItem = styled(Link)`
  background: ${props => (props.selected ? '#e0f4fe' : 'transparent')};
  padding: 6px 30px;
  color: ${props => (props.selected ? '#003a8c' : '#ffffff')};
  font-family: ${props => props.theme.typography.primary.bold};
  cursor: pointer;
  display: block;
  text-decoration: none;
`;

const LeftNav = withTheme(({ children }) => {
  const [location, setLocation] = useState(false);

  useEffect(() => {
    setLocation(window.location.pathname.split(/_(.+)/)[1]);
  }, [window.location]);

  return (
    <Container>
      <NavContainer>
        <LogoContainer>
          <ClimateWarehouseLogo />
        </LogoContainer>

        <MenuItem
          selected={location === 'projects'}
          to="/projects"
          onClick={() => setLocation('projects')}>
          Projects
        </MenuItem>
        <MenuItem
          selected={location === 'units'}
          to="/units"
          onClick={() => setLocation('units')}>
          Units
        </MenuItem>
        <MenuItem
          selected={location === 'storybook'}
          to="/storybook"
          onClick={() => setLocation('storybook')}>
          StoryBook
        </MenuItem>
      </NavContainer>
      {children}
    </Container>
  );
});

export { LeftNav };
