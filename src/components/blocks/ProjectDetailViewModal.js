import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { Tab, Tabs, TabPanel, Modal, modalTypeEnum } from '..';
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
import { getUnits } from '../../store/actions/climateWarehouseActions';

const ProjectDetailedViewModal = ({
  onClose,
  modalSizeAndPosition,
  projectObject,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getUnits({ useMockedResponse: false, useApiMock: false }));
  }, []);

  const estimationTabIndexAdjustment = _.remove(
    [
      _.isEmpty(projectObject?.issuances),
      _.isEmpty(projectObject?.projectLocations),
    ],
    item => item,
  );

  const labelsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(projectObject?.issuances),
      _.isEmpty(projectObject?.projectLocations),
      _.isEmpty(projectObject?.estimations),
    ],
    item => item,
  );

  const ratingsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(projectObject?.labels),
      _.isEmpty(projectObject?.issuances),
      _.isEmpty(projectObject?.projectLocations),
      _.isEmpty(projectObject?.estimations),
    ],
    item => item,
  );

  const coBenefitsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(projectObject?.labels),
      _.isEmpty(projectObject?.issuances),
      _.isEmpty(projectObject?.projectLocations),
      _.isEmpty(projectObject?.projectRatings),
      _.isEmpty(projectObject?.estimations),
    ],
    item => item,
  );

  const relatedProjectsTabIndexAdjustment = _.remove(
    [
      _.isEmpty(projectObject?.labels),
      _.isEmpty(projectObject?.issuances),
      _.isEmpty(projectObject?.projectLocations),
      _.isEmpty(projectObject?.projectRatings),
      _.isEmpty(projectObject?.estimations),
      _.isEmpty(projectObject?.coBenefits),
      _.isEmpty(projectObject?.relatedProjects),
    ],
    item => item,
  );

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'project-detailed-view',
      })}
      body={
        <>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={intl.formatMessage({ id: 'project' })} />
            {!_.isEmpty(projectObject?.issuances) && (
              <Tab label={intl.formatMessage({ id: 'issuance' })} />
            )}
            {!_.isEmpty(projectObject?.projectLocations) && (
              <Tab label={intl.formatMessage({ id: 'project-locations' })} />
            )}
            {!_.isEmpty(projectObject?.estimations) && (
              <Tab label={intl.formatMessage({ id: 'estimations' })} />
            )}
            {!_.isEmpty(projectObject?.labels) && (
              <Tab label={intl.formatMessage({ id: 'labels' })} />
            )}
            {!_.isEmpty(projectObject?.projectRatings) && (
              <Tab label={intl.formatMessage({ id: 'ratings' })} />
            )}
            {!_.isEmpty(projectObject?.coBenefits) && (
              <Tab label={intl.formatMessage({ id: 'co-benefits' })} />
            )}
            {!_.isEmpty(projectObject?.relatedProjects) && (
              <Tab label={intl.formatMessage({ id: 'related-projects' })} />
            )}
          </Tabs>
          <TabPanel noHeight value={tabValue} index={0}>
            <ProjectDetails data={projectObject} />
          </TabPanel>
          {!_.isEmpty(projectObject?.issuances) &&
            _.map(projectObject.issuances, issuance => (
              <TabPanel key={issuance.id} noHeight value={tabValue} index={1}>
                <ProjectIssuanceDetails data={issuance} />
              </TabPanel>
            ))}
          {!_.isEmpty(projectObject?.projectLocations) &&
            _.map(projectObject.projectLocations, locations => (
              <TabPanel
                key={locations.id}
                noHeight
                value={tabValue}
                index={_.isEmpty(projectObject?.issuances) ? 1 : 2}>
                <ProjectLocationsDetails data={locations} />
              </TabPanel>
            ))}
          {!_.isEmpty(projectObject?.estimations) &&
            _.map(projectObject.estimations, estimate => (
              <TabPanel
                key={estimate.id}
                noHeight
                value={tabValue}
                index={
                  !_.isEmpty(estimationTabIndexAdjustment)
                    ? 3 - estimationTabIndexAdjustment.length
                    : 3
                }>
                <EstimationsDetails data={estimate} />
              </TabPanel>
            ))}

          {!_.isEmpty(projectObject?.labels) &&
            _.map(projectObject.labels, labelValue => (
              <TabPanel
                key={labelValue.id}
                noHeight
                value={tabValue}
                index={
                  !_.isEmpty(labelsTabIndexAdjustment)
                    ? 4 - labelsTabIndexAdjustment.length
                    : 4
                }>
                <ProjectLabelsDetails data={labelValue} />
              </TabPanel>
            ))}
          {!_.isEmpty(projectObject?.projectRatings) &&
            _.map(projectObject.projectRatings, rating => (
              <TabPanel
                key={rating.id}
                noHeight
                value={tabValue}
                index={
                  !_.isEmpty(ratingsTabIndexAdjustment)
                    ? 5 - ratingsTabIndexAdjustment.length
                    : 5
                }>
                <ProjectRatingsDetails data={rating} />
              </TabPanel>
            ))}
          {!_.isEmpty(projectObject?.coBenefits) &&
            _.map(projectObject.coBenefits, coBenefit => (
              <TabPanel
                key={coBenefit.id}
                noHeight
                value={tabValue}
                index={
                  !_.isEmpty(coBenefitsTabIndexAdjustment)
                    ? 6 - coBenefitsTabIndexAdjustment.length
                    : 6
                }>
                <CoBenefitsDetails data={coBenefit} />
              </TabPanel>
            ))}
          {!_.isEmpty(projectObject?.relatedProjects) &&
            _.map(projectObject.relatedProjects, project => (
              <TabPanel
                key={project.id}
                noHeight
                value={tabValue}
                index={
                  !_.isEmpty(relatedProjectsTabIndexAdjustment)
                    ? 7 - relatedProjectsTabIndexAdjustment.length
                    : 7
                }>
                <RelatedProjectsDetails data={project} />
              </TabPanel>
            ))}
        </>
      }
      hideButtons
    />
  );
};
export { ProjectDetailedViewModal };
