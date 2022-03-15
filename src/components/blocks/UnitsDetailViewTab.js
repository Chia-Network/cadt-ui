import _ from 'lodash';
import React, { useState } from 'react';
import { Tab, Tabs, TabPanel, Body, SpanTwoColumnsContainer } from '..';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  gap: 20px;
`;

const StyledDetailedViewTab = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const StyledItem = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const UnitsDetailedViewTab = ({ entry }) => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const unitsTabs = _.remove(
    [_.isEmpty(entry), _.isEmpty(entry.labels), _.isEmpty(entry.issuance)],
    item => item,
  );

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Units" />
        {!_.isEmpty(entry.issuance) && <Tab label={'Issuance'} />}
        {!_.isEmpty(entry.labels) && <Tab label={'Labels'} />}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <StyledDetailedViewTabItem>
          <div style={{ width: '60%' }}>
            <StyledDetailedViewTab>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-location-id" />
                </Body>
                <Body>
                  {entry.projectLocationId ? entry.projectLocationId : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body width="100%">
                  <FormattedMessage id="unit-owner" />
                </Body>
                <Body>{entry.unitOwner ? entry.unitOwner : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="serial-number-pattern" />
                </Body>
                <Body>
                  {entry.serialNumberPattern
                    ? entry.serialNumberPattern
                    : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="serial-number-block" />
                </Body>
                <Body>
                  {entry.serialNumberBlock ? entry.serialNumberBlock : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="in-country-jurisdiction-of-owner" />
                </Body>
                <Body>
                  {entry.inCountryJurisdictionOfOwner
                    ? entry.inCountryJurisdictionOfOwner
                    : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="country-jurisdiction-of-owner" />
                </Body>
                <Body>
                  {entry.countryJurisdictionOfOwner
                    ? entry.countryJurisdictionOfOwner
                    : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="unit-type" />
                </Body>
                <Body>{entry.unitType ? entry.unitType : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="unit-status" />
                </Body>
                <Body>{entry.unitStatus ? entry.unitStatus : '---'}</Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="unit-status-reason" />
                  </Body>
                  <Body>
                    {entry.unitStatusReason ? entry.unitStatusReason : '---'}
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
                      href={entry.unitRegistryLink}
                      target="_blank"
                      rel="noreferrer noopener">
                      {entry.unitRegistryLink ? entry.unitRegistryLink : '---'}
                    </a>
                  </Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="vintage-year" />
                </Body>
                <Body>{entry.vintageYear ? entry.vintageYear : '---'}</Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <hr />
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="marketplace" />
                </Body>
                <Body>{entry.marketplace ? entry.marketplace : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="marketplace-identifier" />
                </Body>
                <Body>
                  {entry.marketplaceIdentifier
                    ? entry.marketplaceIdentifier
                    : '---'}
                </Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="marketplace-link" />
                  </Body>
                  <Body>
                    {entry.marketplaceLink ? entry.marketplaceLink : '---'}
                  </Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="corresponding-adjustment-declaration" />
                </Body>
                <Body>
                  {entry.correspondingAdjustmentDeclaration
                    ? entry.correspondingAdjustmentDeclaration
                    : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="corresponding-adjustment-status" />
                </Body>
                <Body>
                  {entry.correspondingAdjustmentStatus
                    ? entry.correspondingAdjustmentStatus
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
                  <Body>{entry.unitTags ? entry.unitTags : '---'}</Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
            </StyledDetailedViewTab>
          </div>
        </StyledDetailedViewTabItem>
      </TabPanel>
      {!_.isEmpty(entry.issuance) && (
        <TabPanel value={tabValue} index={1}>
          <StyledDetailedViewTabItem>
            <div style={{ width: '60%' }}>
              <StyledDetailedViewTab>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="start-date" />
                  </Body>
                  <Body>
                    {entry.issuance.startDate
                      ? entry.issuance.startDate
                      : '---'}
                  </Body>
                </StyledItem>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="end-date" />
                  </Body>
                  <Body>
                    {entry.issuance.endDate ? entry.issuance.endDate : '---'}
                  </Body>
                </StyledItem>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="verification-body" />
                  </Body>
                  <Body>
                    {entry.issuance.verificationBody
                      ? entry.issuance.verificationBody
                      : '---'}
                  </Body>
                </StyledItem>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="verification-approach" />
                  </Body>
                  <Body>
                    {entry.issuance.verificationApproach
                      ? entry.issuance.verificationApproach
                      : '---'}
                  </Body>
                </StyledItem>
              </StyledDetailedViewTab>
            </div>
          </StyledDetailedViewTabItem>
        </TabPanel>
      )}
      {!_.isEmpty(entry.labels) &&
        _.map(entry.labels, labelValue => (
          <TabPanel
            value={tabValue}
            index={!_.isEmpty(unitsTabs) ? 2 - unitsTabs.length : 2}>
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="label" />
                    </Body>
                    <Body>{labelValue.label ? labelValue.label : '---'}</Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="label-type" />
                    </Body>
                    <Body>
                      {labelValue.labelType ? labelValue.labelType : '---'}
                    </Body>
                  </StyledItem>
                  <SpanTwoColumnsContainer>
                    <StyledItem>
                      <Body size="Bold" width="100%">
                        <FormattedMessage id="label-link" />
                      </Body>
                      <Body>
                        <a
                          href={labelValue.labelLink && labelValue.labelLink}
                          target="_blank"
                          rel="noreferrer noopener">
                          {labelValue.labelLink ? labelValue.labelLink : '---'}
                        </a>
                      </Body>
                    </StyledItem>
                  </SpanTwoColumnsContainer>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="validity-period-start-date" />
                    </Body>
                    <Body>
                      {labelValue.validityPeriodStartDate
                        ? labelValue.validityPeriodStartDate
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="validity-period-end-date" />
                    </Body>
                    <Body>
                      {labelValue.validityPeriodEndDate
                        ? labelValue.validityPeriodEndDate
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="crediting-period-start-date" />
                    </Body>
                    <Body>
                      {labelValue.creditingPeriodStartDate
                        ? labelValue.creditingPeriodStartDate
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="crediting-period-end-date" />
                    </Body>
                    <Body>
                      {labelValue.creditingPeriodEndDate
                        ? labelValue.creditingPeriodEndDate
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="unit-quantity" />
                    </Body>
                    <Body>
                      {labelValue.unitQuantity
                        ? labelValue.unitQuantity
                        : '---'}
                    </Body>
                  </StyledItem>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
    </>
  );
};
export { UnitsDetailedViewTab };
