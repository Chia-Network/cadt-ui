import React, { useState, useEffect } from 'react';
import { IssuancesForm, LabelsForm, Modal, Spinner, Tabs, UnitForm } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetPickListsQuery, useGetUnitQuery } from '@/api';

interface UnitModalProps {
  warehouseUnitId: string;
  onClose: () => void;
  defaultTab?: 'unit' | 'issuance' | 'labels';
}

const UnitModal: React.FC<UnitModalProps> = ({ warehouseUnitId, onClose, defaultTab = 'unit' }: UnitModalProps) => {
  const [activeTab, setActiveTab] = useState(0); // 0 = unit, 1 = issuance, 2 = labels
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

  // Set the active tab based on defaultTab prop
  useEffect(() => {
    if (defaultTab === 'issuance' && unitData?.issuance) {
      setActiveTab(1);
    } else if (defaultTab === 'labels' && unitData?.labels?.length) {
      setActiveTab(2);
    } else {
      setActiveTab(0); // Default to unit tab
    }
  }, [defaultTab, unitData]);

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'detailed-unit-view'} />
      </Modal.Header>
      <Modal.Body>
        <div className="h-screen">
          <Tabs activeTab={activeTab} onActiveTabChange={setActiveTab}>
            {/* There is no per-tab deeplinking so we only need to put a spinned on the first */}
            <Tabs.Item title={<FormattedMessage id="unit" />}>
              {!unitLoading && !isPickListLoading && unitData ? (
                <UnitForm readonly={true} data={unitData} picklistOptions={pickListData} />
              ) : (
                <Spinner size="xl" />
              )}
            </Tabs.Item>
            {unitData?.issuance && (
              <Tabs.Item title={<FormattedMessage id="issuance" />}>
                <IssuancesForm readonly={true} data={[unitData?.issuance]} picklistOptions={pickListData} />
              </Tabs.Item>
            )}
            {unitData?.labels?.length && (
              <Tabs.Item title={<FormattedMessage id="labels" />}>
                <LabelsForm readonly={true} data={unitData?.labels} picklistOptions={pickListData} />
              </Tabs.Item>
            )}
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UnitModal };
