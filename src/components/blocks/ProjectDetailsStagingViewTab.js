import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Tab, Tabs, TabPanel } from '..';
import {
  ProjectLocationsDetails,
  ProjectDetails,
  ProjectIssuanceDetails,
  EstimationsDetails,
  ProjectLabelsDetails,
  ProjectRatingsDetails,
  CoBenefitsDetails,
  RelatedProjectsDetails,
} from '.';
import theme from '../../theme';

const ProjectDetailsStagingViewTab = ({ entry }) => {
  const [tabValue, setTabValue] = useState(0);
  const intl = useIntl();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getOriginalColorForKey = (entryProp, action) => {
    if (entryProp) {
      if (action === 'DELETE') {
        return theme.colors.default.status.error.primary;
      }
      if (action === 'INSERT') {
        return theme.colors.default.status.ok.primary;
      }
    }
    return theme.colors.default.onSurface;
  };

  const estimationTabIndexAdjustment = _.remove(
    [_.isEmpty(entry.issuances), _.isEmpty(entry.projectLocations)],
    item => item,
  );

  const labelsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(entry.issuances),
      _.isEmpty(entry.projectLocations),
      _.isEmpty(entry.estimations),
    ],
    item => item,
  );

  const ratingsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(entry.labels),
      _.isEmpty(entry.issuances),
      _.isEmpty(entry.projectLocations),
      _.isEmpty(entry.estimations),
    ],
    item => item,
  );

  const coBenefitsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(entry.labels),
      _.isEmpty(entry.issuances),
      _.isEmpty(entry.projectLocations),
      _.isEmpty(entry.projectRatings),
      _.isEmpty(entry.estimations),
    ],
    item => item,
  );

  const relatedProjectsTabIndexAdjustment = _.remove(
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

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label={intl.formatMessage({ id: 'project' })} />
        {!_.isEmpty(entry?.issuances) && (
          <Tab label={intl.formatMessage({ id: 'issuance' })} />
        )}
        {!_.isEmpty(entry?.projectLocations) && (
          <Tab label={intl.formatMessage({ id: 'project-locations' })} />
        )}
        {!_.isEmpty(entry?.estimations) && (
          <Tab label={intl.formatMessage({ id: 'estimations' })} />
        )}
        {!_.isEmpty(entry?.labels) && (
          <Tab label={intl.formatMessage({ id: 'labels' })} />
        )}
        {!_.isEmpty(entry?.projectRatings) && (
          <Tab label={intl.formatMessage({ id: 'ratings' })} />
        )}
        {!_.isEmpty(entry?.coBenefits) && (
          <Tab label={intl.formatMessage({ id: 'co-benefits' })} />
        )}
        {!_.isEmpty(entry?.relatedProjects) && (
          <Tab label={intl.formatMessage({ id: 'related-projects' })} />
        )}
      </Tabs>
      <TabPanel noHeight value={tabValue} index={0}>
        <ProjectDetails
          stagingData={entry}
          changeColor={getOriginalColorForKey}
        />
      </TabPanel>
      {!_.isEmpty(entry?.issuances) &&
        _.map(entry.issuances, issuance => (
          <TabPanel key={issuance.id} noHeight value={tabValue} index={1}>
            <ProjectIssuanceDetails
              stagingData={issuance}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
      {!_.isEmpty(entry?.projectLocations) &&
        _.map(entry.projectLocations, locations => (
          <TabPanel
            key={locations.id}
            noHeight
            value={tabValue}
            index={_.isEmpty(entry?.issuances) ? 1 : 2}>
            <ProjectLocationsDetails
              stagingData={locations}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
      {!_.isEmpty(entry?.estimations) &&
        _.map(entry.estimations, estimate => (
          <TabPanel
            key={estimate.id}
            noHeight
            value={tabValue}
            index={
              !_.isEmpty(estimationTabIndexAdjustment)
                ? 3 - estimationTabIndexAdjustment.length
                : 3
            }>
            <EstimationsDetails
              stagingData={estimate}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}

      {!_.isEmpty(entry?.labels) &&
        _.map(entry.labels, labelValue => (
          <TabPanel
            key={labelValue.id}
            noHeight
            value={tabValue}
            index={
              !_.isEmpty(labelsTabIndexAdjustment)
                ? 4 - labelsTabIndexAdjustment.length
                : 4
            }>
            <ProjectLabelsDetails
              stagingData={labelValue}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
      {!_.isEmpty(entry?.projectRatings) &&
        _.map(entry.projectRatings, rating => (
          <TabPanel
            key={rating.id}
            noHeight
            value={tabValue}
            index={
              !_.isEmpty(ratingsTabIndexAdjustment)
                ? 5 - ratingsTabIndexAdjustment.length
                : 5
            }>
            <ProjectRatingsDetails
              stagingData={rating}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
      {!_.isEmpty(entry?.coBenefits) &&
        _.map(entry.coBenefits, coBenefit => (
          <TabPanel
            key={coBenefit.id}
            noHeight
            value={tabValue}
            index={
              !_.isEmpty(coBenefitsTabIndexAdjustment)
                ? 6 - coBenefitsTabIndexAdjustment.length
                : 6
            }>
            <CoBenefitsDetails
              stagingData={coBenefit}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
      {!_.isEmpty(entry?.relatedProjects) &&
        _.map(entry.relatedProjects, project => (
          <TabPanel
            key={project.id}
            noHeight
            value={tabValue}
            index={
              !_.isEmpty(relatedProjectsTabIndexAdjustment)
                ? 7 - relatedProjectsTabIndexAdjustment.length
                : 7
            }>
            <RelatedProjectsDetails
              stagingData={project}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
    </>
  );
};
export { ProjectDetailsStagingViewTab };
