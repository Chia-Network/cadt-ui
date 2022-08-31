import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Body,
  CopyIcon,
  H2,
  H4,
  PrimaryButton,
  SubscriptionModal,
  OrgEditFormModal,
  OrganizationLogo,
  SuccessIcon,
  WarningIcon,
  modalTypeEnum,
  Modal,
} from '../../components';
import { deleteMyOrg } from '../../store/actions/climateWarehouseActions';

const StyledOrganizationContainer = styled('div')`
  padding: 30px 63px;
  display: flex;
  flex-direction: row;
`;

const StyledRowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const StyledLogoContainer = styled('div')`
  margin-left: auto;
`;

const StyledItemContainer = styled('div')`
  padding: 14px 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  button {
    width: fit-content;
  }
`;

const StyledCopyIconContainer = styled('div')`
  display: inline-block;
  cursor: pointer;
  margin-left: 2px;
  color: ${props => props.theme.colors.default.onBorder};
  :hover {
    color: ${props => props.theme.colors.default.onDisable};
  }
  :active {
    color: #096dd9;
  }
`;

const Organization = () => {
  const intl = useIntl();
  const [isSubscriptionsModalDisplayed, setIsSubscriptionsModalDisplayed] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { myOrgUid, organizations, walletBalance, isWalletSynced } =
    useSelector(store => store.climateWarehouse);
  const dispatch = useDispatch();

  if (!organizations || !myOrgUid) {
    return null;
  }

  const myOrganization = organizations && organizations[myOrgUid];

  return (
    <StyledOrganizationContainer>
      <div>
        <H2>
          <FormattedMessage id="organization-information" />
        </H2>
        <StyledItemContainer>
          <H4>
            <FormattedMessage id="organization-name" />
          </H4>
          <Body size="Big">
            {myOrganization.name}
            <StyledCopyIconContainer>
              <CopyIcon
                height={18}
                width={18}
                onClick={() => {
                  navigator.clipboard.writeText(myOrganization.name);
                }}
              />
            </StyledCopyIconContainer>
          </Body>
        </StyledItemContainer>
        <StyledItemContainer>
          <H4>
            <FormattedMessage id="org-uid" />
          </H4>
          <Body size="Big">
            {myOrgUid}
            <StyledCopyIconContainer>
              <CopyIcon
                height={18}
                width={18}
                onClick={() => {
                  navigator.clipboard.writeText(myOrgUid);
                }}
              />
            </StyledCopyIconContainer>
          </Body>
        </StyledItemContainer>

        <StyledItemContainer>
          <H4>
            <FormattedMessage id="spendable-balance" />
          </H4>
          <Body size="Big">{walletBalance} xch</Body>
        </StyledItemContainer>

        <StyledItemContainer>
          <H4>
            <FormattedMessage id="wallet-sync-status" />
          </H4>
          <Body size="Big">
            {isWalletSynced ? (
              <>
                <FormattedMessage id="synced" />
                <StyledCopyIconContainer>
                  <SuccessIcon height={18} width={18} />
                </StyledCopyIconContainer>
              </>
            ) : (
              <>
                <FormattedMessage id="syncing" />
                <StyledCopyIconContainer>
                  <WarningIcon height={18} width={18} />
                </StyledCopyIconContainer>
              </>
            )}
          </Body>
        </StyledItemContainer>

        <StyledItemContainer>
          <H4>
            <FormattedMessage id="public-address" />
          </H4>
          <Body size="Big">
            {myOrganization.xchAddress}
            <StyledCopyIconContainer>
              <CopyIcon
                height={18}
                width={18}
                onClick={() => {
                  navigator.clipboard.writeText(myOrganization.xchAddress);
                }}
              />
            </StyledCopyIconContainer>
          </Body>
        </StyledItemContainer>
        <StyledItemContainer>
          <H4>
            <FormattedMessage id="address-qr-code" />
          </H4>
          <QRCode value={myOrganization.xchAddress} />
        </StyledItemContainer>
        <StyledItemContainer>
          <H4>
            <FormattedMessage id="organization-subscriptions" />
          </H4>
          <PrimaryButton
            label={intl.formatMessage({ id: 'manage' })}
            size="large"
            onClick={() => setIsSubscriptionsModalDisplayed(true)}
          />
        </StyledItemContainer>
        <StyledItemContainer>
          <H4>
            <FormattedMessage id="actions" />
          </H4>
          <StyledRowContainer>
            <PrimaryButton
              label={intl.formatMessage({ id: 'edit-organization' })}
              size="large"
              onClick={() => setIsEditModalOpen(true)}
            />
            <PrimaryButton
              label={intl.formatMessage({ id: 'delete-organization' })}
              size="large"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </StyledRowContainer>
        </StyledItemContainer>
      </div>

      {isSubscriptionsModalDisplayed && (
        <SubscriptionModal
          onClose={() => setIsSubscriptionsModalDisplayed(false)}
        />
      )}
      {isEditModalOpen && (
        <OrgEditFormModal
          onClose={() => setIsEditModalOpen(false)}
          name={myOrganization?.name}
          icon={myOrganization?.icon}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          title={intl.formatMessage({
            id: 'notification',
          })}
          body={intl.formatMessage({
            id: 'confirm-organization-deletion',
          })}
          modalType={modalTypeEnum.confirmation}
          onClose={() => setIsDeleteModalOpen(false)}
          onOk={() => {
            dispatch(deleteMyOrg());
            setIsDeleteModalOpen(false);
          }}
        />
      )}

      <StyledLogoContainer>
        {myOrganization?.icon && (
          <OrganizationLogo logo={myOrganization.icon} />
        )}
      </StyledLogoContainer>
    </StyledOrganizationContainer>
  );
};

export { Organization };
