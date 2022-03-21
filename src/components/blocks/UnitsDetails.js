import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body, LinkIcon } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import {
  SpanTwoColumnsContainer,
  SpanTwoDetailColumnsContainer,
} from '../layout';

export const handleClickLink = link => {
  if (link) {
    if (link.slice(0, 4) === 'http') {
      return link;
    } else {
      return 'http://' + link;
    }
  }
};

const UnitsDetails = ({ data }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-location-id" />
            </Body>
            <Body>
              {data.projectLocationId ? data.projectLocationId : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-owner" />
            </Body>
            <Body>{data.unitOwner ? data.unitOwner : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="serial-number-pattern" />
            </Body>
            <Body>
              {data.serialNumberPattern ? data.serialNumberPattern : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="serial-number-block" />
            </Body>
            <Body>
              {data.serialNumberBlock ? data.serialNumberBlock : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="in-country-jurisdiction-of-owner" />
            </Body>
            <Body>
              {data.inCountryJurisdictionOfOwner
                ? data.inCountryJurisdictionOfOwner
                : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="country-jurisdiction-of-owner" />
            </Body>
            <Body>
              {data.countryJurisdictionOfOwner
                ? data.countryJurisdictionOfOwner
                : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-type" />
            </Body>
            <Body>{data.unitType ? data.unitType : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-status" />
            </Body>
            <Body>{data.unitStatus ? data.unitStatus : '---'}</Body>
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-status-reason" />
              </Body>
              <Body>
                {data.unitStatusReason ? data.unitStatusReason : '---'}
              </Body>
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-registry-link" />
              </Body>
              <Body>
                <a
                  href={handleClickLink(data.unitRegistryLink)}
                  style={{ wordWrap: 'break-word' }}
                  target="_blank"
                  rel="noreferrer noopener">
                  {data.unitRegistryLink ? data.unitRegistryLink : '---'}
                  {data.unitRegistryLink && <LinkIcon height="15" width="30" />}
                </a>
              </Body>
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="vintage-year" />
            </Body>
            <Body>{data.vintageYear ? data.vintageYear : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace" />
            </Body>
            <Body>{data.marketplace ? data.marketplace : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace-identifier" />
            </Body>
            <Body>
              {data.marketplaceIdentifier ? data.marketplaceIdentifier : '---'}
            </Body>
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="marketplace-link" />
              </Body>
              <Body>
                <a
                  href={handleClickLink(data.marketplaceLink)}
                  style={{ wordWrap: 'break-word' }}
                  target="_blank"
                  rel="noreferrer noopener">
                  {data.marketplaceLink ? data.marketplaceLink : '---'}
                  {data.marketplaceLink && <LinkIcon height="15" width="30" />}
                </a>
              </Body>
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-declaration" />
            </Body>
            <Body>
              {data.correspondingAdjustmentDeclaration
                ? data.correspondingAdjustmentDeclaration
                : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-status" />
            </Body>
            <Body>
              {data.correspondingAdjustmentStatus
                ? data.correspondingAdjustmentStatus
                : '---'}
            </Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-tags" />
              </Body>
              <Body>{data.unitTags ? data.unitTags : '---'}</Body>
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsDetails };
