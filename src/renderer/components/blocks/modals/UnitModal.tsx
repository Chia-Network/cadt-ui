import React from 'react';
import { Modal, Tabs, UnitForm, IssuanceForm, Spinner } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetUnitQuery } from '@/api';

interface UnitModalProps {
  warehouseUnitId: string;
  onClose: () => void;
}

const UnitModal: React.FC<UnitModalProps> = ({ warehouseUnitId, onClose }: UnitModalProps) => {
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId });

  const handleProjectFormSubmit = async () => {
    return Promise.resolve();
  };

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'detailed-unit-view'} />
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          {/* There is no per-tab deeplinking so we only need to put a spinned on the first */}
          <Tabs.Item title={<FormattedMessage id="unit" />}>
            {!unitLoading && unitData ? (
              <UnitForm onSubmit={handleProjectFormSubmit} readonly={true} data={unitData} />
            ) : (
              <Spinner size="xl" />
            )}
          </Tabs.Item>
          {unitData?.issuance && (
            <Tabs.Item title={<FormattedMessage id="issuance" />}>
              <IssuanceForm onSubmit={handleProjectFormSubmit} readonly={true} data={[unitData?.issuance]} />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { UnitModal };
