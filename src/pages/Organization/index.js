import React, { useEffect } from 'react';
import { getMyOrgUid } from '../../utils/getMyOrgUid';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { useDispatch } from 'react-redux';

import { validateUrl } from '../../utils/urlUtils';
import { Body, CopyIcon, H2, H4 } from '../../components';
import { FormattedMessage } from 'react-intl';
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
`;

const Organization = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);
  const myOrganzation = organizations[myOrgUid];
  const createMarkup = icon => {
    return { __html: icon };
  };

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
                fill="#D9D9D9"
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
                fill="#D9D9D9"
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
                fill="#D9D9D9"
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
      </div>

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
