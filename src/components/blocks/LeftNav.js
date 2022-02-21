import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import {
  ButtonText,
  WarehouseIcon,
  RegistryIcon,
  Modal,
  AddIconCircle,
  Message,
} from '../../components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { resetRefreshPrompt } from '../../store/actions/app';
import { getMyOrgUid } from '../../utils/getMyOrgUid';
import { CreateOrgForm } from '../forms';
import { modalTypeEnum } from '.';

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

const StyledCreateOrgButtonContainer = styled('div')`
  h4 {
    color: white;
  }
  color: white;
  margin: 46px 0px 1.3125rem 1.7813rem;
  cursor: pointer;
  display: flex;
  gap: 0.8438rem;
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
  font-size: 1.1rem;
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
  const [location, setLocation] = useState(false);
  const [confirmCreateOrgIsVisible, setConfirmCreateOrgIsVisible] =
    useState(false);
  const [createOrgIsVisible, setCreateOrgIsVisible] = useState(false);
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);
  const myOrgIsNotCreated = myOrgUid === 'none';

  useEffect(() => {
    setLocation(window.location.pathname.split(/_(.+)/)[1]);
  }, [window.location]);

  return (
    <Container>
      <NavContainer>
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
          }}>
          <FormattedMessage id="projects-list" />
        </MenuItem>
        <div></div>
        <MenuItem
          selected={location === 'units'}
          to="/units"
          onClick={() => {
            dispatch(resetRefreshPrompt);
            setLocation('units');
          }}>
          <FormattedMessage id="units-list" />
        </MenuItem>
        <StyledTitleContainer disabled={myOrgIsNotCreated}>
          <RegistryIcon height={20} width={20} />
          <ButtonText>
            <FormattedMessage id="registry" />
          </ButtonText>
        </StyledTitleContainer>
        {!myOrgIsNotCreated && (
          <>
            <MenuItem
              selected={location === 'my-projects'}
              to={`/projects?orgUid=${myOrgUid}&myRegistry=true`}
              onClick={() => {
                dispatch(resetRefreshPrompt);
                setLocation('my-projects');
              }}>
              <FormattedMessage id="my-projects" />
            </MenuItem>
            <div></div>
            <MenuItem
              selected={location === 'my-units'}
              to={`/units?orgUid=${myOrgUid}&myRegistry=true`}
              onClick={() => {
                dispatch(resetRefreshPrompt);
                setLocation('my-units');
              }}>
              <FormattedMessage id="my-units" />
            </MenuItem>
          </>
        )}
        {myOrgIsNotCreated && (
          <>
            <MenuItem
              to={window.location}
              onClick={() => setConfirmCreateOrgIsVisible(true)}
              disabled>
              <FormattedMessage id="my-projects" />
            </MenuItem>
            <div></div>
            <MenuItem
              to={window.location}
              onClick={() => setConfirmCreateOrgIsVisible(true)}
              disabled>
              <FormattedMessage id="my-units" />
            </MenuItem>
            <StyledCreateOrgButtonContainer
              onClick={() => setCreateOrgIsVisible(true)}>
              <AddIconCircle width="20" height="20" />
              <ButtonText>
                <FormattedMessage id="create-organization" />
              </ButtonText>
            </StyledCreateOrgButtonContainer>
          </>
        )}
      </NavContainer>
      {children}
      {createOrgIsVisible && (
        <CreateOrgForm onClose={() => setCreateOrgIsVisible(false)} />
      )}
      {notification && notification.id === 'organization-created' && (
        <Message id={notification.id} type={notification.type} />
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
    </Container>
  );
});

export { LeftNav };
