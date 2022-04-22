import React, { useEffect, useMemo, useState } from 'react';
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
import { validateIp, validatePort } from '../../utils/urlUtils';

const StyledSubscriptionsListContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledIpPortContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & div:first-child {
    width: 9.8rem;
  }

  & div:nth-child(2) {
    width: 5rem;
  }
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
  const [orgUid, setOrgUid] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const intl = useIntl();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const [isValidationOn, setIsValidation] = useState(false);

  useEffect(() => {
    dispatch(getOrganizationData());
  }, []);

  const isOrgUidValid = Boolean(orgUid.length > 4);
  const isIpValid = useMemo(() => validateIp(ip), [ip]);
  const isPortValid = useMemo(() => validatePort(port), [port]);

  const submitCustomOrganization = () => {
    if (!isValidationOn) {
      setIsValidation(true);
    }

    if (isOrgUidValid && isIpValid && isPortValid) {
      dispatch(subscribeImportOrg({ orgUid, ip, port }));
      setOrgUid('');
      setIp('');
      setPort('');
      setIsValidation(false);
    } else {
      setTimeout(() => setIsValidation(false), 3000);
    }
  };

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

              <StyledIpPortContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={
                    isValidationOn && !isIpValid
                      ? InputVariantEnum.error
                      : InputVariantEnum.default
                  }
                  value={ip}
                  onChange={value => setIp(value)}
                  placeholderText={intl.formatMessage({
                    id: 'server-address',
                  })}
                />

                <StandardInput
                  size={InputSizeEnum.large}
                  variant={
                    isValidationOn && !isPortValid
                      ? InputVariantEnum.error
                      : InputVariantEnum.default
                  }
                  value={port}
                  onChange={value => setPort(value)}
                  placeholderText={intl.formatMessage({
                    id: 'port',
                  })}
                />

                <PrimaryButton
                  label={intl.formatMessage({ id: 'add' })}
                  size="large"
                  onClick={submitCustomOrganization}
                />
              </StyledIpPortContainer>

              {isValidationOn && (
                <Body size="Small" color="red">
                  {!isOrgUidValid && (
                    <div>
                      <FormattedMessage id="invalid-uid" />
                    </div>
                  )}
                  {!isIpValid && (
                    <div>
                      <FormattedMessage id="invalid-ip" />
                    </div>
                  )}
                  {!isPortValid && (
                    <div>
                      <FormattedMessage id="invalid-port" />
                    </div>
                  )}
                </Body>
              )}
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
