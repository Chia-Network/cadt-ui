import _ from 'lodash';
import React, { useState } from 'react';
import { Tab, Tabs, TabPanel } from '..';
import styled from 'styled-components';
import { UnitsDetails, UnitsIssuanceDetails, UnitsLabelsDetails } from '.';
import theme from '../../theme';

export const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  margin: 20px 0px;
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

const UnitsDetailStagingViewTab = ({ entry }) => {
  const [tabValue, setTabValue] = useState(0);
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

  const issuanceTab = () => {
    if (!_.isEmpty(entry?.issuance)) {
      return <Tab label={'Issuance'} />;
    }
  };

  const unitsTabs = _.remove(
    [_.isEmpty(entry), _.isEmpty(entry?.labels), !issuanceTab()],
    item => item,
  );

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Units" />
        {issuanceTab()}
        {!_.isEmpty(entry?.labels) && <Tab label={'Labels'} />}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <UnitsDetails
          stagingData={entry}
          changeColor={getOriginalColorForKey}
        />
      </TabPanel>
      {issuanceTab() && (
        <TabPanel value={tabValue} index={1}>
          {
            <UnitsIssuanceDetails
              stagingData={entry?.issuance}
              changeColor={getOriginalColorForKey}
            />
          }
        </TabPanel>
      )}
      {!_.isEmpty(entry?.labels) &&
        _.map(entry?.labels, labelValue => (
          <TabPanel
            key={labelValue.id.original}
            noHeight
            value={tabValue}
            index={!_.isEmpty(unitsTabs) ? 2 - unitsTabs.length : 2}>
            <UnitsLabelsDetails
              stagingData={labelValue}
              changeColor={getOriginalColorForKey}
            />
          </TabPanel>
        ))}
    </>
  );
};
export { UnitsDetailStagingViewTab };
