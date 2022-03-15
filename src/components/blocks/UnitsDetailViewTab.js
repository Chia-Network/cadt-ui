import _ from 'lodash';
import React, { useState } from 'react';
import { Tab, Tabs, TabPanel } from '..';
import styled from 'styled-components';
import { UnitsDetails, UnitsIssuanceDetails, UnitsLabelsDetails } from '.';

export const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
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
        <UnitsDetails data={entry} />
      </TabPanel>
      {!_.isEmpty(entry.issuance) && (
        <TabPanel value={tabValue} index={1}>
          <UnitsIssuanceDetails data={entry?.issuance} />
        </TabPanel>
      )}
      {!_.isEmpty(entry.labels) &&
        _.map(entry.labels, labelValue => (
          <TabPanel
            value={tabValue}
            index={!_.isEmpty(unitsTabs) ? 2 - unitsTabs.length : 2}>
            <UnitsLabelsDetails data={labelValue} />
          </TabPanel>
        ))}
    </>
  );
};
export { UnitsDetailedViewTab };
