import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabPanel, Body, SpanTwoColumnsContainer } from '..';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { getProjects } from '../../store/actions/climateWarehouseActions';

const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  margin: 16px 0;
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

const ProjectDetailedViewTab = ({ entry }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getProjects({ useMockedResponse: false, useApiMock: false }));
  }, []);

  const projectTabs = _.remove(
    [
      _.isEmpty(entry.labels),
      _.isEmpty(entry.issuances),
      _.isEmpty(entry.projectLocations),
      _.isEmpty(entry.projectRatings),
      _.isEmpty(entry.estimations),
      _.isEmpty(entry.coBenefits),
      _.isEmpty(entry.relatedProjects),
    ],
    item => item,
  );
  console.log(entry);
  console.log(projectTabs);
  console.log(entry.coBenefits);
  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Project" />
        {!_.isEmpty(entry.issuances) && <Tab label={'Issuances'} />}
        {!_.isEmpty(entry.projectLocations) && (
          <Tab label={'Project Locations'} />
        )}
        {!_.isEmpty(entry.estimations) && <Tab label={'Estimations'} />}
        {!_.isEmpty(entry.labels) && <Tab label={'Labels'} />}
        {!_.isEmpty(entry.projectRatings) && <Tab label={'Ratings'} />}
        {!_.isEmpty(entry.coBenefits) && <Tab label={'Co-Benefits'} />}
        {!_.isEmpty(entry.relatedProjects) && (
          <Tab label={'Related Projects'} />
        )}
      </Tabs>
      <TabPanel noHeight value={tabValue} index={0}>
        <StyledDetailedViewTabItem>
          <div style={{ width: '60%' }}>
            <StyledDetailedViewTab>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-name" />
                </Body>
                <Body>{entry.projectName ? entry.projectName : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body width="100%">
                  <FormattedMessage id="project-id" />
                </Body>
                <Body>{entry.projectId ? entry.projectId : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-developer" />
                </Body>
                <Body>
                  {entry.projectDeveloper ? entry.projectDeveloper : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="program" />
                </Body>
                <Body>{entry.program ? entry.program : '---'}</Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="project-link" />
                  </Body>
                  <Body>{entry.projectLink ? entry.projectLink : '---'}</Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="sector" />
                </Body>
                <Body>{entry.sector ? entry.sector : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-type" />
                </Body>
                <Body>{entry.projectType ? entry.projectType : '---'}</Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-status" />
                </Body>
                <Body>{entry.projectStatus ? entry.projectStatus : '---'}</Body>
              </StyledItem>

              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-status-date" />
                </Body>
                <Body>
                  {entry.projectStatusDate ? entry.projectStatusDate : '---'}
                </Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <hr />
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="covered-by-ndc" />
                </Body>
                <Body>{entry.coveredByNDC ? entry.coveredByNDC : '---'}</Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="ndc-information" />
                  </Body>
                  <Body>
                    {entry.ndcInformation ? entry.ndcInformation : '---'}
                  </Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="current-registry" />
                  </Body>
                  <Body>
                    {entry.currentRegistry ? entry.currentRegistry : '---'}
                  </Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="registry-of-origin" />
                </Body>
                <Body>
                  {entry.registryOfOrigin ? entry.registryOfOrigin : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="origin-project-id" />
                </Body>
                <Body>
                  {entry.originProjectId ? entry.originProjectId : '---'}
                </Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <hr />
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="unit-metric" />
                </Body>
                <Body>{entry.unitMetric ? entry.unitMetric : '---'}</Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <StyledItem>
                  <Body size="Bold" width="100%">
                    <FormattedMessage id="methodology" />
                  </Body>
                  <Body>{entry.methodology ? entry.methodology : '---'}</Body>
                </StyledItem>
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="validation-body" />
                </Body>
                <Body>
                  {entry.validationBody ? entry.validationBody : '---'}
                </Body>
              </StyledItem>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="validation-date" />
                </Body>
                <Body>
                  {entry.validationDate ? entry.validationDate : '---'}
                </Body>
              </StyledItem>
              <SpanTwoColumnsContainer>
                <hr />
              </SpanTwoColumnsContainer>
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-tags" />
                </Body>
                <Body>{entry.projectTags ? entry.projectTags : '---'}</Body>
              </StyledItem>
            </StyledDetailedViewTab>
          </div>
        </StyledDetailedViewTabItem>
      </TabPanel>

      {!_.isEmpty(entry.issuances) &&
        _.map(entry.issuances, issuance => (
          <TabPanel noHeight value={tabValue} index={1}>
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="start-date" />
                    </Body>
                    <Body>
                      {issuance.startDate ? issuance.startDate : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="end-date" />
                    </Body>
                    <Body>{issuance.endDate ? issuance.endDate : '---'}</Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="verification-body" />
                    </Body>
                    <Body>
                      {issuance.verificationBody
                        ? issuance.verificationBody
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="verification-approach" />
                    </Body>
                    <Body>
                      {issuance.verificationApproach
                        ? issuance.verificationApproach
                        : '---'}
                    </Body>
                  </StyledItem>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
      {!_.isEmpty(entry.projectLocations) &&
        _.map(entry.projectLocations, locations => (
          <TabPanel noHeight value={tabValue} index={2}>
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="host-country" />
                    </Body>
                    <Body>{locations.country ? locations.country : '---'}</Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="in-country-region" />
                    </Body>
                    <Body>
                      {locations.inCountryRegion
                        ? locations.inCountryRegion
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="geographic-identifier" />
                    </Body>
                    <Body>
                      {locations.geographicIdentifier
                        ? locations.geographicIdentifier
                        : '---'}
                    </Body>
                  </StyledItem>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
      {!_.isEmpty(entry.estimations) &&
        _.map(entry.estimations, estimate => (
          <TabPanel noHeight value={tabValue} index={3}>
            <StyledDetailedViewTabItem>
              {console.log(estimate)}
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="crediting-period-start-date" />
                    </Body>
                    <Body>
                      {estimate.creditingPeriodStart
                        ? estimate.creditingPeriodStart
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="crediting-period-end-date" />
                    </Body>
                    <Body>
                      {estimate.creditingPeriodEnd
                        ? estimate.creditingPeriodEnd
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="unit-count" />
                    </Body>
                    <Body>
                      {estimate.unitCount >= 0 ? estimate.unitCount : '---'}
                    </Body>
                  </StyledItem>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}

      {!_.isEmpty(entry.labels) &&
        _.map(entry.labels, labelValue => (
          <TabPanel noHeight value={tabValue} index={4}>
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
                  <SpanTwoColumnsContainer>
                    <hr />
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
                  <SpanTwoColumnsContainer>
                    <hr />
                  </SpanTwoColumnsContainer>
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
      {!_.isEmpty(entry.projectRatings) &&
        _.map(entry.projectRatings, rating => (
          <TabPanel noHeight value={tabValue} index={5}>
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="rating-type" />
                    </Body>
                    <Body>{rating.ratingType ? rating.ratingType : '---'}</Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="rating" />
                    </Body>
                    <Body>{rating.rating ? rating.rating : '---'}</Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="rating-range-highest" />
                    </Body>
                    <Body>
                      {rating.ratingRangeHighest
                        ? rating.ratingRangeHighest
                        : '---'}
                    </Body>
                  </StyledItem>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="rating-range-lowest" />
                    </Body>
                    <Body>
                      {rating.ratingRangeLowest
                        ? rating.ratingRangeLowest
                        : '---'}
                    </Body>
                  </StyledItem>
                  <SpanTwoColumnsContainer>
                    <StyledItem>
                      <Body size="Bold" width="100%">
                        <FormattedMessage id="rating-range-highest" />
                      </Body>
                      <Body>
                        {rating.ratingReportLink
                          ? rating.ratingReportLink
                          : '---'}
                      </Body>
                    </StyledItem>
                  </SpanTwoColumnsContainer>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
      {!_.isEmpty(entry.coBenefits) &&
        _.map(entry.coBenefits, coBenefit => (
          <TabPanel noHeight value={tabValue} index={6}>
            {console.log(coBenefit)}
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <StyledItem>
                    <Body size="Bold" width="100%">
                      <FormattedMessage id="co-benefit" />
                    </Body>
                    <Body>
                      {coBenefit.cobenefit ? coBenefit.cobenefit : '---'}
                    </Body>
                  </StyledItem>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
      {!_.isEmpty(entry.relatedProjects) &&
        _.map(entry.relatedProjects, project => (
          <TabPanel value={tabValue} index={7}>
            <StyledDetailedViewTabItem>
              <div style={{ width: '60%' }}>
                <StyledDetailedViewTab>
                  <SpanTwoColumnsContainer>
                    <StyledItem>
                      <Body size="Bold" width="100%">
                        <FormattedMessage id="related-project-id" />
                      </Body>
                      <Body>
                        {project.relatedProjectId
                          ? project.relatedProjectId
                          : '---'}
                      </Body>
                    </StyledItem>
                    <StyledItem>
                      <Body size="Bold" width="100%">
                        <FormattedMessage id="relationship-type" />
                      </Body>
                      <Body>
                        {project.relationshipType
                          ? project.relationshipType
                          : '---'}
                      </Body>
                    </StyledItem>
                    <StyledItem>
                      <Body size="Bold" width="100%">
                        <FormattedMessage id="registry" />
                      </Body>
                      <Body>{project.registry ? project.registry : '---'}</Body>
                    </StyledItem>
                  </SpanTwoColumnsContainer>
                </StyledDetailedViewTab>
              </div>
            </StyledDetailedViewTabItem>
          </TabPanel>
        ))}
    </>
  );
};
export { ProjectDetailedViewTab };
