import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';

import {
  Modal,
  Body,
  InputSizeEnum,
  StandardInput,
  InputVariantEnum,
  modalTypeEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
} from '..';
import {
  getOrganizationData,
  subscribeImportOrg,
  subscribeToOrg,
  unsubscribeFromOrg,
} from '../../store/actions/climateWarehouseActions';
import { PrimaryButton } from '../form/PrimaryButton';

const StyledSubscriptionsListContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledSubscriptionContainer = styled('div')`
  border: 1px solid #d9d9d9;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubscriptionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [customOrgUID, setCustomOrgUID] = useState('');
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);
  const { organizations } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    dispatch(getOrganizationData());
  }, []);

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-created';
  useEffect(() => {
    if (orgWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      <Modal
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'organization-subscriptions',
        })}
        body={
          <ModalFormContainerStyle>
            <StyledFieldContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  value={customOrgUID}
                  onChange={value => setCustomOrgUID(value)}
                  placeholderText={intl.formatMessage({
                    id: 'add-custom-organization',
                  })}
                />
              </InputContainer>
              <StyledLabelContainer />
              <PrimaryButton
                label={intl.formatMessage({ id: 'add' })}
                size="large"
                onClick={() => {
                  if (customOrgUID.length) {
                    dispatch(subscribeImportOrg(customOrgUID));
                  }
                }}
              />
            </StyledFieldContainer>

            <StyledSubscriptionsListContainer>
              {organizations &&
                Object.keys(organizations)?.length > 0 &&
                Object.keys(organizations).map(
                  organizationKey =>
                    !organizations[organizationKey]?.isHome && (
                      <StyledSubscriptionContainer key={organizationKey}>
                        <Body>{organizations[organizationKey]?.name}</Body>
                        <Switch
                          checked={
                            organizations[organizationKey]?.subscribed ?? false
                          }
                          onChange={() => {
                            if (organizations[organizationKey]?.subscribed) {
                              dispatch(
                                unsubscribeFromOrg(
                                  organizations[organizationKey]?.orgUid,
                                ),
                              );
                            } else {
                              dispatch(
                                subscribeToOrg(
                                  organizations[organizationKey]?.orgUid,
                                ),
                              );
                            }
                          }}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </StyledSubscriptionContainer>
                    ),
                )}
            </StyledSubscriptionsListContainer>
          </ModalFormContainerStyle>
        }
        hideButtons
      />
    </>
  );
};

export { SubscriptionModal };
