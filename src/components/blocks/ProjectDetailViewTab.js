import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabPanel } from '..';
import styled from 'styled-components';
import { getProjects } from '../../store/actions/climateWarehouseActions';
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

export const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  margin: 16px 0;
  gap: 20px;
`;

export const StyledDetailedViewTab = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
`;

export const StyledItem = styled('div')`
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

  //   const projectTabs = _.remove(
  //     [
  //       _.isEmpty(entry.labels),
  //       _.isEmpty(entry.issuances),
  //       _.isEmpty(entry.projectLocations),
  //       _.isEmpty(entry.projectRatings),
  //       _.isEmpty(entry.estimations),
  //       _.isEmpty(entry.coBenefits),
  //       _.isEmpty(entry.relatedProjects),
  //     ],
  //     item => item,
  //   );

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
        <ProjectDetails data={entry} />
      </TabPanel>
      {!_.isEmpty(entry.issuances) &&
        _.map(entry.issuances, issuance => (
          <TabPanel noHeight value={tabValue} index={1}>
            <ProjectIssuanceDetails data={issuance} />
          </TabPanel>
        ))}
      {!_.isEmpty(entry.projectLocations) &&
        _.map(entry.projectLocations, locations => (
          <TabPanel noHeight value={tabValue} index={2}>
            <ProjectLocationsDetails data={locations} />
          </TabPanel>
        ))}
      {!_.isEmpty(entry.estimations) &&
        _.map(entry.estimations, estimate => (
          <TabPanel noHeight value={tabValue} index={3}>
            <EstimationsDetails data={estimate} />
          </TabPanel>
        ))}

      {!_.isEmpty(entry.labels) &&
        _.map(entry.labels, labelValue => (
          <TabPanel noHeight value={tabValue} index={4}>
            <ProjectLabelsDetails data={labelValue} />
          </TabPanel>
        ))}
      {!_.isEmpty(entry.projectRatings) &&
        _.map(entry.projectRatings, rating => (
          <TabPanel noHeight value={tabValue} index={5}>
            <ProjectRatingsDetails data={rating} />
          </TabPanel>
        ))}
      {!_.isEmpty(entry.coBenefits) &&
        _.map(entry.coBenefits, coBenefit => (
          <TabPanel noHeight value={tabValue} index={6}>
            <CoBenefitsDetails data={coBenefit} />
          </TabPanel>
        ))}
      {!_.isEmpty(entry.relatedProjects) &&
        _.map(entry.relatedProjects, project => (
          <TabPanel value={tabValue} index={7}>
            <RelatedProjectsDetails data={project} />
          </TabPanel>
        ))}
    </>
  );
};
export { ProjectDetailedViewTab };
