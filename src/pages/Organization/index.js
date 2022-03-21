import React, { useEffect, useState } from 'react';
import { getMyOrgUid } from '../../utils/getMyOrgUid';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { useDispatch } from 'react-redux';

import { validateUrl } from '../../utils/urlUtils';
import {
  Body,
  CopyIcon,
  H2,
  H4,
  PrimaryButton,
  SubscriptionModal,
} from '../../components';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  activateProgressIndicator,
  deactivateProgressIndicator,
} from '../../store/actions/app';

const StyledOrganizationContainer = styled('div')`
  padding: 30px 63px;
  display: flex;
  flex-direction: row;
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

const StyledSvgContainer = styled('div')`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 100px;
    height: 100px;
  }
`;

const StyledCopyIconContainer = styled('div')`
  display: inline-block;
  cursor: pointer;
  margin-left: 2px;
  color: #d9d9d9;
  :hover {
    color: #bfbfbf;
  }
  :active {
    color: #096dd9;
  }
`;

const Organization = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isSubscriptionsModalDisplayed, setIsSubscriptionsModalDisplayed] =
    useState(false);
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);
  const myOrganzation = organizations[myOrgUid];
  const createMarkup = icon => {
    return { __html: icon };
  };

  // TODO remove after pushing fix: location.pathname change doesn't trigger re-render #568
  // After pushing the above fix test wether accessing the Organization page triggers the left nav MenuItem selected state
  useEffect(() => {
    dispatch(activateProgressIndicator);
    dispatch(deactivateProgressIndicator);
  }, []);

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
            {myOrganzation.name}
            <StyledCopyIconContainer>
              <CopyIcon
                height={18}
                width={18}
                onClick={() => {
                  navigator.clipboard.writeText(myOrganzation.name);
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
            <FormattedMessage id="public-address" />
          </H4>
          <Body size="Big">
            {myOrganzation.xchAddress}
            <StyledCopyIconContainer>
              <CopyIcon
                height={18}
                width={18}
                onClick={() => {
                  navigator.clipboard.writeText(myOrganzation.xchAddress);
                }}
              />
            </StyledCopyIconContainer>
          </Body>
        </StyledItemContainer>

        <StyledItemContainer>
          <H4>
            <FormattedMessage id="address-qr-code" />
          </H4>
          <QRCode value={myOrganzation.xchAddress} />
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
      </div>

      {isSubscriptionsModalDisplayed && (
        <SubscriptionModal
          onClose={() => setIsSubscriptionsModalDisplayed(false)}
        />
      )}

      <StyledLogoContainer>
        {validateUrl(myOrganzation.icon) && (
          <img src={myOrganzation.icon} width={100} height={100} />
        )}
        {!validateUrl(myOrganzation.icon) && (
          <StyledSvgContainer
            dangerouslySetInnerHTML={createMarkup(myOrganzation.icon)}
          />
        )}
      </StyledLogoContainer>
    </StyledOrganizationContainer>
  );
};

export { Organization };
