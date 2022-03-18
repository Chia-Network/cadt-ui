import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { CircularProgress } from '@mui/material';
import {
  ButtonText,
  WarehouseIcon,
  RegistryIcon,
  Modal,
  Body,
} from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { getMyOrgUid } from '../../utils/getMyOrgUid';
import { CreateOrgForm } from '../forms';
import { modalTypeEnum } from '.';
import { getOrganizationData } from '../../store/actions/climateWarehouseActions';
import { OrganizationIcon } from '../icons';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const StyledAppVersion = styled('div')`
  position: absolute;
  bottom: 12px;
  left: 50px;
`;

const NavContainer = styled('div')`
  width: 16rem;
  min-width: 16rem;
  height: 100%;
  background-color: #3b8ee0;
`;

const MenuItem = styled(Link)`
  background: ${props => (props.selected ? '#003A8C' : 'transparent')};
  ${props =>
    !props.selected && !props.disabled && `:hover {background: #40a9ff;}`};
  padding: 0.5625rem 0rem 0.75rem 4.25rem;
  ${props => (props.disabled ? 'color: #BFBFBF;' : 'color: white;')}
  font-family: ${props => props.theme.typography.primary.bold};
  cursor: pointer;
  display: block;
  text-decoration: none;
  width: calc(100% - 1.625rem);
  margin: auto;
  font-size: 1.2rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  margin-bottom: 0.625rem;
`;

const StyledTitleContainer = styled('div')`
  ${props => (!props.disabled ? `color: white;` : `color: #BFBFBF;`)};
  display: flex;
  gap: 0.8438rem;
  & h4 {
    text-transform: uppercase;
    ${props => (!props.disabled ? `color: white;` : `color: #BFBFBF;`)};
  }
  margin: 46px 0px 1.3125rem 1.7813rem;
`;

const LeftNav = withTheme(({ children }) => {
  const history = useHistory();
  const [confirmCreateOrgIsVisible, setConfirmCreateOrgIsVisible] =
    useState(false);
  const [createOrgIsVisible, setCreateOrgIsVisible] = useState(false);
  const intl = useIntl();
  const { readOnlyMode } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);
  const myOrgIsNotCreated = myOrgUid === 'none';
  const myOrgIsCreatedButNotSubscribed =
    !myOrgIsNotCreated && organizations && !organizations[myOrgUid].subscribed;

  useEffect(() => {
    let intervalId;
    if (!createOrgIsVisible && myOrgIsCreatedButNotSubscribed) {
      intervalId = setInterval(
        () => dispatch(getOrganizationData()),
        30 * 1000,
      );
    }
    return () => clearTimeout(intervalId);
  }, [myOrgIsNotCreated, myOrgIsCreatedButNotSubscribed, createOrgIsVisible]);

  const isUnitsPage = history.location.pathname.includes('/units');
  const isProjectsPage = history.location.pathname.includes('/projects');
  const isMyRegistryPage = history.location.search.includes('myRegistry=true');
  const isOrganizationPage =
    history.location.pathname.includes('/organization');

  return (
    <Container>
      <NavContainer>
        <StyledTitleContainer>
          <WarehouseIcon height={24} width={24} />
          <ButtonText>
            <FormattedMessage id="warehouse" />
          </ButtonText>
        </StyledTitleContainer>
        <MenuItem selected={isProjectsPage && !isMyRegistryPage} to="/projects">
          <FormattedMessage id="projects-list" />
        </MenuItem>
        <div></div>
        <MenuItem selected={isUnitsPage && !isMyRegistryPage} to="/units">
          <FormattedMessage id="units-list" />
        </MenuItem>

        {!readOnlyMode && (
          <>
            <StyledTitleContainer disabled={myOrgIsNotCreated}>
              <RegistryIcon height={20} width={20} />
              <ButtonText>
                <FormattedMessage id="registry" />
              </ButtonText>
            </StyledTitleContainer>
            {!myOrgIsNotCreated && !myOrgIsCreatedButNotSubscribed && (
              <>
                <MenuItem
                  selected={isProjectsPage && isMyRegistryPage}
                  to={`/projects?orgUid=${myOrgUid}&myRegistry=true`}
                >
                  <FormattedMessage id="my-projects" />
                </MenuItem>
                <div></div>
                <MenuItem
                  selected={isUnitsPage && isMyRegistryPage}
                  to={`/units?orgUid=${myOrgUid}&myRegistry=true`}
                >
                  <FormattedMessage id="my-units" />
                </MenuItem>
              </>
            )}
            {myOrgIsNotCreated && (
              <>
                <MenuItem
                  to={window.location}
                  onClick={() => setConfirmCreateOrgIsVisible(true)}
                  disabled
                >
                  <FormattedMessage id="my-projects" />
                </MenuItem>
                <div></div>
                <MenuItem
                  to={window.location}
                  onClick={() => setConfirmCreateOrgIsVisible(true)}
                  disabled
                >
                  <FormattedMessage id="my-units" />
                </MenuItem>
              </>
            )}

            <StyledTitleContainer>
              {myOrgIsCreatedButNotSubscribed && (
                <CircularProgress size={20} thickness={5} />
              )}
              {!myOrgIsCreatedButNotSubscribed && (
                <OrganizationIcon height={20} width={20} />
              )}
              <ButtonText>
                <FormattedMessage id="organization" />
              </ButtonText>
            </StyledTitleContainer>
            {!myOrgIsNotCreated && !myOrgIsCreatedButNotSubscribed && (
              <MenuItem selected={isOrganizationPage} to="/organization">
                <FormattedMessage id="my-organization" />
              </MenuItem>
            )}
            {myOrgIsNotCreated && (
              <MenuItem selected={createOrgIsVisible} to={window.location}>
                <FormattedMessage id="create-organization" />
              </MenuItem>
            )}
            {myOrgIsCreatedButNotSubscribed && (
              <MenuItem to={window.location}>
                <FormattedMessage id="creating-organization" />
              </MenuItem>
            )}
          </>
        )}
      </NavContainer>
      {children}
      {createOrgIsVisible && (
        <CreateOrgForm onClose={() => setCreateOrgIsVisible(false)} />
      )}
      {myOrgIsNotCreated && confirmCreateOrgIsVisible && (
        <Modal
          title={intl.formatMessage({ id: 'create-organization' })}
          body={intl.formatMessage({ id: 'you-need-to-create-organization' })}
          modalType={modalTypeEnum.confirmation}
          onClose={() => setConfirmCreateOrgIsVisible(false)}
          onOk={() => {
            setCreateOrgIsVisible(true);
            setConfirmCreateOrgIsVisible(false);
          }}
        />
      )}
      <StyledAppVersion>
        <Body size="X-Small" color="white">
          {process?.env?.REACT_APP_VERSION &&
            `v${process.env.REACT_APP_VERSION}`}
        </Body>
      </StyledAppVersion>
    </Container>
  );
});

export { LeftNav };
