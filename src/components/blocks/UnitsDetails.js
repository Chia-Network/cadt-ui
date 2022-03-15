import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '../layout';

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
            <Body width="100%">
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
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-status-reason" />
              </Body>
              <Body>
                {data.unitStatusReason ? data.unitStatusReason : '---'}
              </Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-registry-link" />
              </Body>
              <Body>
                <a
                  href={data.unitRegistryLink}
                  target="_blank"
                  rel="noreferrer noopener">
                  {data.unitRegistryLink ? data.unitRegistryLink : '---'}
                </a>
              </Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
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
              {data.marketplaceIdentifier
                ? data.marketplaceIdentifier
                : '---'}
            </Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="marketplace-link" />
              </Body>
              <Body>
                {data.marketplaceLink ? data.marketplaceLink : '---'}
              </Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
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
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-tags" />
              </Body>
              <Body>{data.unitTags ? data.unitTags : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsDetails };
