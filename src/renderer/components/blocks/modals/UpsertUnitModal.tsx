import React from 'react';
import { ComponentCenteredSpinner, Modal, UnitForm } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetUnitQuery, useGetPickListsQuery, useStageUnitMutation } from '@/api';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertUnitModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [, createUnitModalActive] = useWildCardUrlHash('create-unit');
  const [unitUpsertFragment] = useWildCardUrlHash('edit-unit');
  const warehouseUnitId = unitUpsertFragment.replace('edit-unit-', '');
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId }, {
    skip: !warehouseUnitId,
  });
  const [triggerStageUnit, { isLoading: isUnitStaging }] = useStageUnitMutation();

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createUnitModalActive ? <FormattedMessage id="create-unit" /> : <FormattedMessage id="edit-unit" />}
      </Modal.Header>
    );
  };

  if (unitLoading || isPickListLoading || isUnitStaging) {
    return (
      <Modal show={true} onClose={onClose}>
        <ModalHeader />
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={onClose}>
      <ModalHeader />
      <Modal.Body>
        <div className="h-screen">
          <UnitForm data={unitData} picklistOptions={pickListData}/>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertUnitModal };
