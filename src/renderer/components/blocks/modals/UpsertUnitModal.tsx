import React from 'react';
import { ComponentCenteredSpinner, Modal } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetUnitQuery } from '@/api';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertUnitModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [, createUnitModalActive] = useWildCardUrlHash('create-unit');
  const [unitUpsertFragment] = useWildCardUrlHash('edit-unit');
  const warehouseUnitId = unitUpsertFragment.replace('edit-unit-', '');
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId });

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createUnitModalActive ? <FormattedMessage id="create-unit" /> : <FormattedMessage id="edit-unit" />}
      </Modal.Header>
    );
  };

  if (unitLoading) {
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
        <p>the unit form goes here {unitData?.warehouseUnitId}</p>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertUnitModal };
