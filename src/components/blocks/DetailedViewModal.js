import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Modal, modalTypeEnum, Tab, Tabs, TabPanel } from '..';
import { useIntl } from 'react-intl';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { DetailedViewTab } from '.';

const detailedViewModalTypeEnum = {
  project: 'projects',
  units: 'units',
};

const DetailedViewModal = ({ onClose, modalSizeAndPosition, type, record }) => {
  const intl = useIntl();
  const [tabValue, setTabValue] = useState(0);

  const fullRecord =
    type === detailedViewModalTypeEnum.project
      ? useSelector(
          state =>
            state.climateWarehouse.projects.filter(
              project =>
                project.warehouseProjectId === record.warehouseProjectId,
            )[0],
        )
      : useSelector(
          state =>
            state.climateWarehouse.units.filter(
              unit => unit.warehouseUnitId === record.warehouseUnitId,
            )[0],
        );

  const recordTabsWithEntries = useMemo(
    () =>
      fullRecord
        ? Object.keys(fullRecord).filter(
            key => Array.isArray(fullRecord[key]) && fullRecord[key].length > 0,
          )
        : [],
    [fullRecord],
  );

  const recordDetails = useMemo(
    () =>
      fullRecord
        ? Object.keys(fullRecord)
            .filter(
              key => key !== 'issuance' && !Array.isArray(fullRecord[key]),
            )
            .reduce((acc, cur) => {
              acc[cur] = fullRecord[cur];
              return acc;
            }, {})
        : {},
    [fullRecord],
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (
    (type !== detailedViewModalTypeEnum.project &&
      type !== detailedViewModalTypeEnum.units) ||
    (record?.warehouseProjectId != null && record?.warehouseUnitId != null)
  ) {
    return <></>;
  }

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id:
          type === detailedViewModalTypeEnum.project
            ? 'project-detailed-view'
            : 'unit-detailed-view',
      })}
      body={
        <div>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label={
                type === detailedViewModalTypeEnum.project ? 'Project' : 'Unit'
              }
            />
            {recordTabsWithEntries.map(tab => (
              <Tab label={convertPascalCaseToSentenceCase(tab)} key={tab} />
            ))}
            {type === detailedViewModalTypeEnum.units &&
              fullRecord?.issuance && <Tab label="Issuance" />}
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <DetailedViewTab data={[recordDetails]} />
          </TabPanel>
          {recordTabsWithEntries.map((tabKey, index) => (
            <TabPanel value={tabValue} index={index + 1} key={tabKey}>
              <DetailedViewTab data={fullRecord[tabKey]} />
            </TabPanel>
          ))}
          {type === detailedViewModalTypeEnum.units && fullRecord?.issuance && (
            <TabPanel value={tabValue} index={recordTabsWithEntries.length + 1}>
              <DetailedViewTab data={[fullRecord.issuance]} />
            </TabPanel>
          )}
        </div>
      }
      hideButtons
    />
  );
};

export { DetailedViewModal };
