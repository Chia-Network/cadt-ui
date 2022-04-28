import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, modalTypeEnum } from '..';
import { useIntl } from 'react-intl';
import { UnitsDetailViewTab, ProjectDetailedViewTab } from '.';

const detailedViewModalTypeEnum = {
  project: 'projects',
  units: 'units',
};

const DetailedViewModal = ({
  onClose,
  modalSizeAndPosition,
  type,
  unitOrProjectWarehouseId,
}) => {
  const intl = useIntl();

  const fullRecord =
    type === detailedViewModalTypeEnum.project
      ? useSelector(
          state =>
            state.climateWarehouse.projects.filter(
              project =>
                project.warehouseProjectId === unitOrProjectWarehouseId,
            )[0],
        )
      : useSelector(
          state =>
            state.climateWarehouse.units.filter(
              unit => unit.warehouseUnitId === unitOrProjectWarehouseId,
            )[0],
        );

  if (
    (type !== detailedViewModalTypeEnum.project &&
      type !== detailedViewModalTypeEnum.units) ||
    !unitOrProjectWarehouseId
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
        type === detailedViewModalTypeEnum.units ? (
          <UnitsDetailViewTab entry={fullRecord} />
        ) : (
          <ProjectDetailedViewTab entry={fullRecord} />
        )
      }
      hideButtons
    />
  );
};

export { DetailedViewModal };
