import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
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
  StyledLabelContainer,
  ModalFormContainerStyle,
  LabelContainer,
} from '..';
import {
  getOrganizationData,
  subscribeImportOrg,
  subscribeToFileStore,
  subscribeToOrg,
  unsubscribeFromFileStore,
  unsubscribeFromOrg,
} from '../../store/actions/climateWarehouseActions';
import { PrimaryButton } from '../form/PrimaryButton';

const StyledImportOrgContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
  padding: 5px 0 35px 0;
`;

const StyledSubscriptionsListContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyleSubscriptionsItemContainer = styled('div')`
  border: 1px solid #d9d9d9;
  padding: 0.5rem 0;
  display: flex;
  flex-basis: 40%;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: space-around;
`;

const StyledToggleContainer = styled('div')`
  display: flex;
  flex-basis: 40%;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;
`;

const SubscriptionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [orgUid, setOrgUid] = useState('');
  const intl = useIntl();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const [isValidationOn, setIsValidation] = useState(false);

  useEffect(() => {
    dispatch(getOrganizationData());
  }, []);

  const isOrgUidValid = Boolean(orgUid.length > 4);

  const isUserAlreadySubscribedToOrgUid = useMemo(() => {
    for (const orgUidKey in organizations) {
      if (orgUid === orgUidKey && organizations[orgUidKey]?.subscribed) {
        return true;
      }
    }
    return false;
  }, [orgUid]);

  const submitCustomOrganization = useCallback(() => {
    if (!isValidationOn) {
      setIsValidation(true);
    }

    if (isOrgUidValid && !isUserAlreadySubscribedToOrgUid) {
      dispatch(subscribeImportOrg({ orgUid }));
      setOrgUid('');
      setIsValidation(false);
    } else {
      setTimeout(() => setIsValidation(false), 3000);
    }
  }, [
    isValidationOn,
    setIsValidation,
    isOrgUidValid,
    isUserAlreadySubscribedToOrgUid,
    orgUid,
    setOrgUid,
  ]);

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
            <StyledImportOrgContainer>
              <StyledLabelContainer>
                <Body size="Bold">
                  <LabelContainer>
                    <FormattedMessage id="import-organization" />
                  </LabelContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={
                    isValidationOn && !isOrgUidValid
                      ? InputVariantEnum.error
                      : InputVariantEnum.default
                  }
                  value={orgUid}
                  onChange={value => setOrgUid(value)}
                  placeholderText={intl.formatMessage({
                    id: 'add-custom-organization',
                  })}
                />
              </InputContainer>
              <StyledLabelContainer />

              <PrimaryButton
                label={intl.formatMessage({ id: 'add' })}
                size="large"
                onClick={submitCustomOrganization}
              />

              {isValidationOn && !isUserAlreadySubscribedToOrgUid && (
                <Body size="Small" color="red">
                  {!isOrgUidValid && (
                    <div>
                      <FormattedMessage id="invalid-uid" />
                    </div>
                  )}
                </Body>
              )}
              {isValidationOn && isUserAlreadySubscribedToOrgUid && (
                <Body size="Small" color="red">
                  <div>
                    <FormattedMessage id="already-subscribed-org" />
                  </div>
                </Body>
              )}
            </StyledImportOrgContainer>

            <StyledSubscriptionsListContainer>
              <StyledLabelContainer>
                <Body size="Bold">
                  <LabelContainer>
                    <FormattedMessage id="existing-organizations" />
                  </LabelContainer>
                </Body>
              </StyledLabelContainer>
              {organizations &&
                Object.keys(organizations)?.length > 0 &&
                Object.keys(organizations).map(
                  organizationKey =>
                    !organizations[organizationKey]?.isHome && (
                      <StyleSubscriptionsItemContainer key={organizationKey}>
                        <StyledToggleContainer>
                          <Body>{organizations[organizationKey]?.name}</Body>
                          <Switch
                            checked={
                              organizations[organizationKey]?.subscribed ??
                              false
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
                        </StyledToggleContainer>
                        <StyledToggleContainer>
                          <Body>
                            <FormattedMessage id="subscribe-to-files" />
                          </Body>
                          <Switch
                            checked={
                              organizations[organizationKey]
                                ?.fileStoreSubscribed ?? false
                            }
                            onChange={() => {
                              if (
                                organizations[organizationKey]
                                  ?.fileStoreSubscribed
                              ) {
                                dispatch(
                                  unsubscribeFromFileStore(
                                    organizations[organizationKey]?.orgUid,
                                  ),
                                );
                              } else {
                                dispatch(
                                  subscribeToFileStore(
                                    organizations[organizationKey]?.orgUid,
                                  ),
                                );
                              }
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </StyledToggleContainer>
                      </StyleSubscriptionsItemContainer>
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
