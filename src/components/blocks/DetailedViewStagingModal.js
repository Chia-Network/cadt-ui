import React, { useMemo } from 'react';
import {
  Modal,
  modalTypeEnum,
  //DetailedViewStagingTab,
  UnitsDetailViewTab,
} from '..';

import { getDiffObject } from '../../utils/objectUtils';

const DetailedViewStagingModal = ({
  onClose,
  modalSizeAndPosition,
  record,
  changes,
  title,
  action,
}) => {
  const recordTabsWithEntries = useMemo(() => {
    let allTabs = record
      ? Object.keys(record).filter(key => Array.isArray(record[key]))
      : [];

    if (changes && changes.length > 0) {
      changes.forEach(changeItem => {
        Object.keys(changeItem).forEach(key => {
          if (Array.isArray(changeItem[key])) {
            allTabs.push(key);
          }
        });
      });
    }

    allTabs = [...new window.Set(allTabs)];

    const allTabsWithData = [];
    allTabs.forEach(tabName => {
      let hasRecordData = record[tabName]?.length > 0 ?? false;

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
  console.log(recordTabsWithEntries);
  const recordDiffs = useMemo(() => {
    const changesArray = changes ?? [];
    return getDiffObject(record, ...changesArray);
  }, [record, changes]);

  const recordDetails = useMemo(() => {
    const detailsObj = {};

    Object.keys(record).forEach(key => {
      return (detailsObj[key] = recordDiffs[key]);
    });

    return detailsObj;
  }, [recordDiffs]);

  if (!modalSizeAndPosition || !record || !title || !onClose || !action) {
    return <></>;
  }
  console.log(record);

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={title}
      body={
        <div>
          {/* <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Details" />
            {recordTabsWithEntries.map(tab => (
              <Tab label={convertPascalCaseToSentenceCase(tab)} key={tab} />
            ))}
            {record?.issuance && <Tab label="Issuance" />}
          </Tabs>
          <TabPanel value={tabValue} index={0}> */}
          {[recordDetails].map((detail, id) => (
            <UnitsDetailViewTab entry={detail} key={id} action={action} />
          ))}
          {/* </TabPanel> */}
          {/* {recordTabsWithEntries.map((tabKey, index) => ( */}
          {/* <TabPanel value={tabValue} index={index + 1} key={tabKey}>
          <DetailedViewStagingTab */}
          {/* //     key={index}
          //     data={recordDiffs[tabKey]}
          //     action={action}
          //   />
          // ))} */}
          {/* {record?.issuance && (
            <TabPanel value={tabValue} index={recordTabsWithEntries.length + 1}>
              <DetailedViewStagingTab
                data={[recordDiffs.issuance]}
                action={action}
              />
            </TabPanel>
          )} */}
        </div>
      }
      hideButtons
    />
  );
};

export { DetailedViewStagingModal };
