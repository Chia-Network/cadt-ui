import React from 'react';
import { ComponentCenteredSpinner, Modal } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetUnitQuery } from '@/api';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertUnitModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [, createUnitModalActive] = useWildCardUrlHash('create-Unit');
  const [UnitUpsertFragment] = useWildCardUrlHash('edit-Unit');
  const warehouseUnitId = UnitUpsertFragment.replace('edit-Unit-', '');
  const { data: UnitData, isLoading: UnitLoading } = useGetUnitQuery({ warehouseUnitId });

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createUnitModalActive ? <FormattedMessage id="create-Unit" /> : <FormattedMessage id="edit-Unit" />}
      </Modal.Header>
    );
  };

  if (UnitLoading) {
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
        <>
          {createUnitModalActive || !UnitData ? (
            <>
              <p>todo blank Unit details form</p>
            </>
          ) : (
            <>
              <p>todo edit Unit details for Unit id {UnitData?.warehouseUnitId}</p>
            </>
          )}
        </>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertUnitModal };
