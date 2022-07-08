import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { Tab, Tabs, TabPanel, Modal, modalTypeEnum } from '..';
import { UnitsDetails, UnitsIssuanceDetails, UnitsLabelsDetails } from '.';
import {
  getIssuances,
  getProjects,
} from '../../store/actions/climateWarehouseActions';

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
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const UnitsDetailViewModal = ({
  onClose,
  modalSizeAndPosition,
  unitObject,
}) => {
  const intl = useIntl();
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const unitsTabs = _.remove(
    [
      _.isEmpty(unitObject),
      _.isEmpty(unitObject?.labels),
      _.isEmpty(unitObject?.issuance),
    ],
    item => item,
  );

  useEffect(() => {
    dispatch(getIssuances());
    dispatch(getProjects({ useMockedResponse: false, useApiMock: false }));
  }, []);

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'unit-detailed-view',
      })}
      body={
        <>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Units" />
            {!_.isEmpty(unitObject?.issuance) && <Tab label={'Issuance'} />}
            {!_.isEmpty(unitObject?.labels) && <Tab label={'Labels'} />}
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <UnitsDetails data={unitObject} />
          </TabPanel>
          {!_.isEmpty(unitObject?.issuance) && (
            <TabPanel value={tabValue} index={1}>
              <UnitsIssuanceDetails data={unitObject?.issuance} />
            </TabPanel>
          )}
          {!_.isEmpty(unitObject?.labels) &&
            _.map(unitObject?.labels, labelValue => (
              <TabPanel
                key={labelValue.id}
                noHeight
                value={tabValue}
                index={!_.isEmpty(unitsTabs) ? 2 - unitsTabs.length : 2}>
                <UnitsLabelsDetails data={labelValue} />
              </TabPanel>
            ))}
        </>
      }
      hideButtons
    />
  );
};
export { UnitsDetailViewModal };
