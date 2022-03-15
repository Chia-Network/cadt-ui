import React, { useState } from 'react';
import { Tab, Tabs, TabPanel } from '..';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';

// import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
// import { Body } from '../../components';
// import { getUnits } from '../../store/actions/climateWarehouseActions';

const StyledDetailedViewTabItem = styled('div')`
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 20px;
`;

//  const StyledDetailedViewTab = styled('div')`
//  `;

// const StyledWordWrap = styled('div')`
//   word-break: break-word;
//   display: inline-block;
// `;

const ProjectDetailedViewTab = ({ entry }) => {
  //   const { units } = useSelector(store => store.climateWarehouse);
  //   const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

    return (
      <>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Project" />
        </Tabs>
        <TabPanel>
          <StyledDetailedViewTabItem>
            <div>{console.log(entry)}</div>
          </StyledDetailedViewTabItem>
        </TabPanel>
      </>
    );
  };
export { ProjectDetailedViewTab };
