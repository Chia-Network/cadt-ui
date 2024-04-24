import React from 'react';
import { IssuancesForm, LabelsForm, Modal, Spinner, Tabs, UnitForm } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetPickListsQuery, useGetUnitQuery } from '@/api';

interface UnitModalProps {
  warehouseUnitId: string;
  onClose: () => void;
}

const UnitModal: React.FC<UnitModalProps> = ({ warehouseUnitId, onClose }: UnitModalProps) => {
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'detailed-unit-view'} />
      </Modal.Header>
      <Modal.Body>
        <div className="h-screen">
          <Tabs>
            {/* There is no per-tab deeplinking so we only need to put a spinned on the first */}
            <Tabs.Item title={<FormattedMessage id="unit" />}>
              {!unitLoading && !isPickListLoading && unitData ? (
                <UnitForm
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
                <IssuancesForm
                  readonly={true}
                  data={[unitData?.issuance]}
                  picklistOptions={pickListData}
                />
              </Tabs.Item>
            )}
            {unitData?.labels?.length && (
              <Tabs.Item title={<FormattedMessage id="labels" />}>
                <LabelsForm
                  readonly={true}
                  data={unitData?.labels}
                  picklistOptions={pickListData}
                />
              </Tabs.Item>
            )}
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UnitModal };
