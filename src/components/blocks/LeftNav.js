import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import {
  ClimateWarehouseLogo,
  ButtonText,
  WarehouseIcon,
  RegistryIcon,
} from '../../components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { resetRefreshPrompt } from '../../store/actions/app';
import { getMyOrgUid } from '../../utils/getMyOrgUid';

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
  margin: 20.46px auto 3.5344rem auto;
`;

const MenuItem = styled(Link)`
  background: ${props => (props.selected ? '#003A8C' : 'transparent')};
  ${props => !props.selected && `:hover {background: #40a9ff;}`};
  padding: 0.5625rem 0rem 0.75rem 4.25rem;
  color: white;
  font-family: ${props => props.theme.typography.primary.bold};
  cursor: pointer;
  display: block;
  text-decoration: none;
  width: calc(100% - 1.625rem);
  margin: auto;
  box-sizing: border-box;
  border-radius: 0.625rem;
  margin-bottom: 0.625rem;
`;

const StyledTitleContainer = styled('div')`
  color: white;
  display: flex;
  gap: 0.8438rem;
  & h4 {
    text-transform: uppercase;
    color: white;
  }
  margin: 46px 0px 1.3125rem 1.7813rem;
`;

const LeftNav = withTheme(({ children }) => {
  const [location, setLocation] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLocation(window.location.pathname.split(/_(.+)/)[1]);
  }, [window.location]);

  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);

  return (
    <Container>
      <NavContainer>
        <LogoContainer>
          <ClimateWarehouseLogo />
        </LogoContainer>
        <StyledTitleContainer>
          <WarehouseIcon height={24} width={24} />
          <ButtonText>
            <FormattedMessage id="warehouse" />
          </ButtonText>
        </StyledTitleContainer>
        <MenuItem
          selected={location === 'projects'}
          to="/projects"
          onClick={() => {
            dispatch(resetRefreshPrompt);
            setLocation('projects');
          }}
        >
          <FormattedMessage id="projects" />
        </MenuItem>
        <div></div>
        <MenuItem
          selected={location === 'units'}
          to="/units"
          onClick={() => {
            dispatch(resetRefreshPrompt);
            setLocation('units');
          }}
        >
          <FormattedMessage id="units" />
        </MenuItem>
        <StyledTitleContainer>
          <RegistryIcon height={20} width={20} />
          <ButtonText>
            <FormattedMessage id="registry" />
          </ButtonText>
        </StyledTitleContainer>
        <MenuItem
          selected={location === 'my-projects'}
          to={`/projects?orgUid=${myOrgUid}&myRegistry=true`}
          onClick={() => {
            dispatch(resetRefreshPrompt);
            setLocation('my-projects');
          }}
        >
          <FormattedMessage id="projects" />
        </MenuItem>
        <div></div>
        <MenuItem
          selected={location === 'my-units'}
          to={`/units?orgUid=${myOrgUid}&myRegistry=true`}
          onClick={() => {
            dispatch(resetRefreshPrompt);
            setLocation('my-units');
          }}
        >
          <FormattedMessage id="units" />
        </MenuItem>
      </NavContainer>
      {children}
    </Container>
  );
});

export { LeftNav };
