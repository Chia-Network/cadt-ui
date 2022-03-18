import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body, LinkIcon } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '../layout';

export const handleClickLink = link => {
  if (link) {
    if (link.slice(0, 4) === 'http') {
      return link;
    } else {
      return 'http://' + link;
    }
  }
};

const UnitsDetails = ({ data, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-location-id" />
            </Body>
            {!data.projectLocationId?.original ? (
              <Body>
                {data.projectLocationId ? data.projectLocationId : '---'}
              </Body>
            ) : (
              <Body color={changeColor('projectLocationId')}>
                {data.projectLocationId?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body width="100%">
              <FormattedMessage id="unit-owner" />
            </Body>
            {!data.unitOwner?.original ? (
              <Body>{data.unitOwner ? data.unitOwner : '---'}</Body>
            ) : (
              <Body color={changeColor('unitOwner')}>
                {data.unitOwner?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="serial-number-pattern" />
            </Body>
            {!data.serialNumberPattern?.original ? (
              <Body>
                {data.serialNumberPattern ? data.serialNumberPattern : '---'}
              </Body>
            ) : (
              <Body color={changeColor('serialNumberPattern')}>
                {data.serialNumberPattern?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="serial-number-block" />
            </Body>
            {!data.serialNumberBlock?.original ? (
              <Body>
                {data.serialNumberBlock ? data.serialNumberBlock : '---'}
              </Body>
            ) : (
              <Body color={changeColor('serialNumberBlock')}>
                {data.serialNumberBlock?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="in-country-jurisdiction-of-owner" />
            </Body>
            {!data.inCountryJurisdictionOfOwner?.original ? (
              <Body>
                {data.inCountryJurisdictionOfOwner
                  ? data.inCountryJurisdictionOfOwner
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('inCountryJurisdictionOfOwner')}>
                {data.inCountryJurisdictionOfOwner?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="country-jurisdiction-of-owner" />
            </Body>
            {!data.countryJurisdictionOfOwner?.original ? (
              <Body>
                {data.countryJurisdictionOfOwner
                  ? data.countryJurisdictionOfOwner
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('countryJurisdictionOfOwner')}>
                {data.countryJurisdictionOfOwner?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-type" />
            </Body>
            {!data.unitType?.original ? (
              <Body>{data.unitType ? data.unitType : '---'}</Body>
            ) : (
              <Body color={changeColor('unitType')}>
                {data.unitType?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-status" />
            </Body>
            {!data.unitStatus?.original ? (
              <Body>{data.unitStatus ? data.unitStatus : '---'}</Body>
            ) : (
              <Body color={changeColor('unitStatus')}>
                {data.unitStatus?.original}
              </Body>
            )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-status-reason" />
              </Body>
              {!data.unitStatusReason?.original ? (
                <Body>
                  {data.unitStatusReason ? data.unitStatusReason : '---'}
                </Body>
              ) : (
                <Body color={changeColor('unitStatusReason')}>
                  {data.unitStatusReason?.original}
                </Body>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-registry-link" />
              </Body>
              {!data.unitRegistryLink?.original ? (
                <Body>
                  <a
                    href={handleClickLink(data.unitRegistryLink)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.unitRegistryLink ? data.unitRegistryLink : '---'}
                    {data.unitRegistryLink && (
                      <LinkIcon height="15" width="30" />
                    )}
                  </a>
                </Body>
              ) : (
                <Body color={changeColor('unitRegistryLink')}>
                  <a
                    href={handleClickLink(data.unitRegistryLink?.original)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.unitRegistryLink?.original
                      ? data.unitRegistryLink?.original
                      : '---'}
                    {data.unitRegistryLink?.original && (
                      <LinkIcon height="15" width="30" />
                    )}
                  </a>
                </Body>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="vintage-year" />
            </Body>
            {!data.vintageYear?.original ? (
              <Body>{data.vintageYear ? data.vintageYear : '---'}</Body>
            ) : (
              <Body color={changeColor('vintageYear')}>
                {data.vintageYear?.original}
              </Body>
            )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace" />
            </Body>
            {!data.marketplace?.original ? (
              <Body>{data.marketplace ? data.marketplace : '---'}</Body>
            ) : (
              <Body color={changeColor('marketplace')}>
                {data.marketplace?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace-identifier" />
            </Body>
            {!data.marketplaceIdentifier?.original ? (
              <Body>
                {data.marketplaceIdentifier
                  ? data.marketplaceIdentifier
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('marketplaceIdentifier')}>
                {data.marketplaceIdentifier?.original}
              </Body>
            )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="marketplace-link" />
              </Body>
              {!data.marketplaceLink?.original ? (
                <Body>
                  <a
                    href={handleClickLink(data.marketplaceLink)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.marketplaceLink ? data.marketplaceLink : '---'}
                    {data.marketplaceLink && (
                      <LinkIcon height="15" width="30" />
                    )}
                  </a>
                </Body>
              ) : (
                <Body color={changeColor('marketplaceLink')}>
                  <a
                    href={handleClickLink(data.marketplaceLink?.original)}
                    target="_blank"
                    rel="noreferrer noopener">
                    {data.marketplaceLink?.original
                      ? data.marketplaceLink?.original
                      : '---'}
                    {data.marketplaceLink?.original && (
                      <LinkIcon height="15" width="30" />
                    )}
                  </a>
                </Body>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-declaration" />
            </Body>
            {!data.correspondingAdjustmentDeclaration?.original ? (
              <Body>
                {data.correspondingAdjustmentDeclaration
                  ? data.correspondingAdjustmentDeclaration
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('correspondingAdjustmentDeclaration')}>
                {data.correspondingAdjustmentDeclaration?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-status" />
            </Body>
            {!data.correspondingAdjustmentStatus?.original ? (
              <Body>
                {data.correspondingAdjustmentStatus
                  ? data.correspondingAdjustmentStatus
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('correspondingAdjustmentStatus')}>
                {data.correspondingAdjustmentStatus?.original}
              </Body>
            )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-tags" />
              </Body>
              {!data.unitTags?.original ? (
                <Body>{data.unitTags ? data.unitTags : '---'}</Body>
              ) : (
                <Body color={changeColor('unitTags')}>
                  {data.unitTags?.original}
                </Body>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsDetails };
