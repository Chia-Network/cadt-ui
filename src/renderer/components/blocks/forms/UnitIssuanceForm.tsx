import { isEmpty, omit } from 'lodash';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { Issuance } from '@/schemas/Issuance.schema';
import { useGetProjectQuery } from '@/api';
import { IssuancesForm, Select, SelectOption, Spacer } from '@/components';
import dayjs from 'dayjs';

interface UnitIssuanceFormProps {
  readonly?: boolean;
  data?: Issuance | null;
  selectedWarehouseProjectId?: string | null;
}

export interface UnitIssuanceFormRef {
  submitForm: () => Promise<any>;
}

const UnitIssuanceForm = forwardRef<UnitIssuanceFormRef, UnitIssuanceFormProps>(
  ({ data: issuance, selectedWarehouseProjectId }, ref) => {
    const [selectedIssuance, setSelectedIssuance] = useState<Issuance | undefined>(issuance || undefined);
    const [error, setError] = useState<string | null>(null);
    const { data: projectData, isLoading: isProjectLoading } = useGetProjectQuery(
      // @ts-ignore
      { warehouseProjectId: selectedWarehouseProjectId },
      { skip: !selectedWarehouseProjectId },
    );

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        const errors: string[] = [];
        if (!selectedIssuance) {
          setError('A valid issuance must be selected');
          return;
        }

        return [isEmpty(errors) ? null : errors, { issuance: omit(selectedIssuance, ['orgUid']) }];
      },
    }));

    const issuanceOptions = useMemo(() => {
      if (isProjectLoading || !projectData?.issuances) {
        return [];
      }
      return projectData.issuances.map(
        (issuance): SelectOption => ({
          label: `${dayjs(issuance.startDate).format('DD/MM/YYYY')} - ${dayjs(issuance.endDate).format('DD/MM/YYYY')}`,
          value: issuance.id || '',
        }),
      );
    }, [projectData, isProjectLoading]);

    const handleSetIssuance = useCallback(
      (value) => {
        setError(null);
        const selectedIssuanceId = value;
        let foundIssuance = projectData?.issuances?.find((issuance) => issuance.id === selectedIssuanceId);
        if (foundIssuance) {
          if (foundIssuance.timeStaged === null) {
            foundIssuance = { ...foundIssuance, timeStaged: new Date(0) };
          }
        }
        setSelectedIssuance(foundIssuance);
        console.log('issuance', selectedIssuance);
      },
      [projectData, selectedIssuance],
    );

    return (
      <div>
        <Select
          name="Select Issuance"
          options={issuanceOptions}
          onChange={handleSetIssuance}
          initialValue={selectedIssuance ? selectedIssuance.id?.toString() : ''}
        />
        {error && <p className="text-red-500 text-s italic">{error}</p>}
        {selectedIssuance && (
          <>
            <Spacer size={15} />
            <IssuancesForm readonly={!!selectedIssuance} data={[selectedIssuance]} />
          </>
        )}
      </div>
    );
  },
);

export { UnitIssuanceForm };
