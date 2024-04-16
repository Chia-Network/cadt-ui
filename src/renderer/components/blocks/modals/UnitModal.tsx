import React from 'react';
import { Modal, Tabs, UnitForm, IssuanceForm, LabelForm, Spinner } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetUnitQuery, useGetPickListsQuery } from '@/api';

interface UnitModalProps {
  warehouseUnitId: string;
  onClose: () => void;
}

const UnitModal: React.FC<UnitModalProps> = ({ warehouseUnitId, onClose }: UnitModalProps) => {
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

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
            {!unitLoading && !isPickListLoading && unitData ? (
              <UnitForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={unitData}
                picklistOptions={pickListData}
              />
            ) : (
              <Spinner size="xl" />
            )}
          </Tabs.Item>
          {unitData?.issuance && (
            <Tabs.Item title={<FormattedMessage id="issuance" />}>
              <IssuanceForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={[unitData?.issuance]}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
          {unitData?.labels?.length && (
            <Tabs.Item title={<FormattedMessage id="labels" />}>
              <LabelForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={unitData?.labels}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { UnitModal };
