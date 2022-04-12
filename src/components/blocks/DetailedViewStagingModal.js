import _ from 'lodash';
import React, { useMemo } from 'react';
import {
  Modal,
  modalTypeEnum,
  ProjectDetailsStagingViewTab,
  UnitsDetailStagingViewTab,
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

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={title}
      body={
        <div>
          {_.has(record, 'warehouseUnitId')
            ? [recordDetails].map((detail, index) => (
                <UnitsDetailStagingViewTab entry={detail} key={index} />
              ))
            : [recordDetails].map((detail, index) => (
                <ProjectDetailsStagingViewTab entry={detail} key={index} />
              ))}
        </div>
      }
      hideButtons
    />
  );
};

export { DetailedViewStagingModal };
