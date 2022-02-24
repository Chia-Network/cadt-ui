import React, { useState, useMemo } from 'react';
import {
  Modal,
  modalTypeEnum,
  Tab,
  Tabs,
  TabPanel,
  DetailedViewStagingTab,
} from '..';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { getDiffObject } from '../../utils/objectUtils';

const DetailedViewStagingModal = ({
  onClose,
  modalSizeAndPosition,
  record,
  changes,
  title,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const recordTabsWithEntries = useMemo(() => {
    const allTabs = record
      ? Object.keys(record).filter(key => Array.isArray(record[key]))
      : [];

    const allTabsWithData = [];
    allTabs.forEach(tabName => {
      let hasRecordData = record[tabName].length > 0;

      let hasChanges =
        changes?.some(
          change => change[tabName] != null && change[tabName].length > 0,
        ) ?? false;

      if (hasRecordData || hasChanges) {
        allTabsWithData.push(tabName);
      }
    });

    return allTabsWithData;
  }, [record]);

  const recordDiffs = useMemo(() => {
    const changesArray = changes ?? [];
    return getDiffObject(record, ...changesArray);
  }, [record, changes]);

  const recordDetails = useMemo(() => {
    const detailsObj = {};
    Object.keys(record).forEach(key => {
      if (typeof record[key] !== 'object') {
        detailsObj[key] = recordDiffs[key];
      }
    });
    return detailsObj;
  }, [recordDiffs]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!modalSizeAndPosition || !record || !title || !onClose) {
    return <></>;
  }

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={title}
      body={
        <div>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Details" />
            {recordTabsWithEntries.map(tab => (
              <Tab label={convertPascalCaseToSentenceCase(tab)} key={tab} />
            ))}
            {record?.issuance && <Tab label="Issuance" />}
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <DetailedViewStagingTab data={[recordDetails]} />
          </TabPanel>
          {recordTabsWithEntries.map((tabKey, index) => (
            <TabPanel value={tabValue} index={index + 1} key={tabKey}>
              <DetailedViewStagingTab data={recordDiffs[tabKey]} />
            </TabPanel>
          ))}
          {record?.issuance && (
            <TabPanel value={tabValue} index={recordTabsWithEntries.length + 1}>
              <DetailedViewStagingTab data={[recordDiffs.issuance]} />
            </TabPanel>
          )}
        </div>
      }
      hideButtons
    />
  );
};

export { DetailedViewStagingModal };
