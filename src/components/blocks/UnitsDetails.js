import _ from 'lodash';
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
            ) : !_.isEmpty(data.serialNumberBlock?.changes) ? (
              <>
                <Body color={changeColor('projectLocationId', 'INSERT')}>
                  {data.projectLocationId?.changes[0]}
                </Body>
                <Body color={changeColor('projectLocationId', 'DELETE')}>
                  <s>{data.projectLocationId?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('projectLocationId', 'INSERT')}>
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
            ) : !_.isEmpty(data.unitOwner?.changes) ? (
              <>
                <Body color={changeColor('unitOwner', 'INSERT')}>
                  {data.unitOwner?.changes[0]}
                </Body>
                <Body color={changeColor('unitOwner', 'DELETE')}>
                  <s>{data.unitOwner?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('unitOwner', 'INSERT')}>
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
            ) : data.serialNumberPattern?.changes[0] ? (
              <>
                <Body color={changeColor('serialNumberPattern', 'INSERT')}>
                  {data.serialNumberPattern?.changes[0]}
                </Body>
                <Body color={changeColor('serialNumberPattern', 'DELETE')}>
                  <s>{data.serialNumberPattern?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('serialNumberPattern', 'INSERT')}>
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
            ) : !_.isEmpty(data.serialNumberBlock?.changes[0]) ? (
              <>
                <Body color={changeColor('serialNumberBlock', 'INSERT')}>
                  {data.serialNumberBlock?.changes[0]}
                </Body>
                <Body color={changeColor('serialNumberBlock', 'DELETE')}>
                  <s>{data.serialNumberBlock?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('serialNumberBlock', 'INSERT')}>
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
            ) : !_.isEmpty(data.inCountryJurisdictionOfOwner?.changes) ? (
              <>
                <Body
                  color={changeColor('inCountryJurisdictionOfOwner', 'INSERT')}>
                  {data.inCountryJurisdictionOfOwner?.changes[0]}
                </Body>
                <Body
                  color={changeColor('inCountryJurisdictionOfOwner', 'DELETE')}>
                  <s>{data.inCountryJurisdictionOfOwner?.original}</s>
                </Body>
              </>
            ) : (
              <Body
                color={changeColor('inCountryJurisdictionOfOwner', 'INSERT')}>
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
            ) : !_.isEmpty(data.countryJurisdictionOfOwner?.changes) ? (
              <>
                <Body
                  color={changeColor('countryJurisdictionOfOwner', 'INSERT')}>
                  {data.countryJurisdictionOfOwner?.changes[0]}
                </Body>
                <Body
                  color={changeColor('countryJurisdictionOfOwner', 'DELETE')}>
                  <s>{data.countryJurisdictionOfOwner?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('countryJurisdictionOfOwner', 'INSERT')}>
                <s>{data.countryJurisdictionOfOwner?.original}</s>
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-type" />
            </Body>
            {!data.unitType?.original ? (
              <Body>{data.unitType ? data.unitType : '---'}</Body>
            ) : !_.isEmpty(data.unitType?.changes) ? (
              <>
                <Body color={changeColor('unitType', 'INSERT')}>
                  {data.unitType?.changes[0]}
                </Body>
                <Body color={changeColor('unitType', 'DELETE')}>
                  <s>{data.unitType?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('unitType', 'INSERT')}>
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
              <>
                <Body color={changeColor('unitStatus', 'INSERT')}>
                  {data.unitStatus?.changes[0]}
                </Body>
                <Body color={changeColor('unitStatus', 'DELETE')}>
                  <s>{data.unitStatus?.original}</s>
                </Body>
              </>
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
                <>
                  <Body color={changeColor('unitStatusReason', 'INSERT')}>
                    {data.unitStatusReason?.changes[0]}
                  </Body>
                  <Body color={changeColor('unitStatusReason', 'DELETE')}>
                    <s>{data.unitStatusReason?.original}</s>
                  </Body>
                </>
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
                <>
                  <Body color={changeColor('unitRegistryLink', 'INSERT')}>
                    <a
                      href={handleClickLink(data.unitRegistryLink?.changes[0])}
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
                  <Body color={changeColor('unitRegistryLink', 'DELETE')}>
                    <s>
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
                    </s>
                  </Body>
                </>
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
              <>
                <Body color={changeColor('vintageYear', 'INSERT')}>
                  {data.vintageYear?.changes[0]}
                </Body>
                <Body color={changeColor('vintageYear', 'DELETE')}>
                  <s>{data.vintageYear?.original}</s>
                </Body>
              </>
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
            ) : !_.isEmpty(data.marketplace?.changes) ? (
              <>
                <Body color={changeColor('marketplace', 'INSERT')}>
                  {data.marketplace?.changes[0]}
                </Body>
                <Body color={changeColor('marketplace', 'DELETE')}>
                  <s>{data.marketplace?.original}</s>
                </Body>
              </>
            ) : (
              <Body color={changeColor('marketplace')}>
                <s>{data.marketplace?.original}</s>
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
              <>
                <Body color={changeColor('marketplaceIdentifier', 'INSERT')}>
                  {data.marketplaceIdentifier?.changes[0]}
                </Body>
                <Body color={changeColor('marketplaceIdentifier', 'DELETE')}>
                  <s>{data.marketplaceIdentifier?.original}</s>
                </Body>
              </>
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
                <>
                  <Body color={changeColor('marketplaceLink', 'INSERT')}>
                    <a
                      href={handleClickLink(data.marketplaceLink?.changes[0])}
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
                  <Body color={changeColor('marketplaceLink', 'DELETE')}>
                    <s>
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
                    </s>
                  </Body>
                </>
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
              <>
                <Body
                  color={changeColor(
                    'correspondingAdjustmentDeclaration',
                    'INSERT',
                  )}>
                  {data.correspondingAdjustmentDeclaration?.changes[0]}
                </Body>
                <Body
                  color={changeColor(
                    'correspondingAdjustmentDeclaration',
                    'DELETE',
                  )}>
                  <s>{data.correspondingAdjustmentDeclaration?.original}</s>
                </Body>
              </>
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
              <>
                <Body
                  color={changeColor(
                    'correspondingAdjustmentStatus',
                    'INSERT',
                  )}>
                  {data.correspondingAdjustmentStatus?.changes[0]}
                </Body>
                <Body
                  color={changeColor(
                    'correspondingAdjustmentStatus',
                    'DELETE',
                  )}>
                  <s>{data.correspondingAdjustmentStatus?.original}</s>
                </Body>
              </>
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
                <>
                  <Body color={changeColor('unitTags', 'INSERT')}>
                    {data.unitTags?.changes[0]}
                  </Body>
                  <Body color={changeColor('unitTags', 'DELETE')}>
                    <s>{data.unitTags?.original}</s>
                  </Body>
                </>
              )}
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsDetails };
