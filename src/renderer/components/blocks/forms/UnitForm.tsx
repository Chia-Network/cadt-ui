import React, { useMemo } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Card, Field, SelectOption } from '@/components';
import { Unit } from '@/schemas/Unit.schema';
import { useGetProjectQuery } from '@/api';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  unitOwner: yup.string().required('Unit Owner is required'),
  unitBlockStart: yup.string().required('Unit Block Start is required'),
  unitBlockEnd: yup.string().required('Unit Block End is required'),
  unitCount: yup.number().required('Unit Count is required').positive('Unit Count must be positive'),
  serialNumberBlock: yup.string().required('Serial Number Block is required'),
  countryJurisdictionOfOwner: yup.string().required('Country Jurisdiction Of Owner is required'),
  inCountryJurisdictionOfOwner: yup.string().required('In-Country Jurisdiction Of Owner is required'),
  unitType: yup.string().required('Unit Type is required'),
  unitStatusReason: yup.string().required('Unit Status Reason is required'),
  vintageYear: yup.number().required('Vintage Year is required'),
  unitRegistryLink: yup.string().url('Must be a valid URL'),
  marketplace: yup.string(),
  marketplaceIdentifier: yup.string(),
  marketplaceLink: yup.string().url('Must be a valid URL'),
  correspondingAdjustmentStatus: yup.string().required('Corresponding Adjustment Status is required'),
  correspondingAdjustmentDeclaration: yup.string().required('Corresponding Adjustment Declaration is required'),
  unitTags: yup.string(),
});

interface UnitFormProps {
  onSubmit: () => Promise<any>;
  readonly?: boolean;
  data: Unit;
  picklistOptions: PickList | undefined;
}

const UnitForm: React.FC<UnitFormProps> = ({ readonly = false, data, picklistOptions }) => {
  const { data: projectData, isLoading } = useGetProjectQuery(
    {
      // @ts-ignore
      warehouseProjectId: data?.issuance?.warehouseProjectId,
    },
    { skip: !data?.issuance?.warehouseProjectId },
  );

  const projectLocationOptions: SelectOption[] = useMemo(() => {
    if (isLoading || !projectData?.projectLocations) {
      return [];
    }

    return projectData.projectLocations.map(
      (location): SelectOption => ({
        label: `${location.country} - ${location.inCountryRegion}`,
        value: location.id || '',
      }),
    );
  }, [projectData, isLoading]);

  return (
    <Formik initialValues={data || {}} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field
                  name="projectLocationId"
                  label="Project Location Id"
                  type="picklist"
                  options={projectLocationOptions}
                  readonly={readonly}
                  initialValue={data.projectLocationId}
                />
                <Field
                  name="unitOwner"
                  label="Unit Owner"
                  type="text"
                  readonly={readonly}
                  initialValue={data.unitOwner}
                />
                <Field
                  name="unitBlockStart"
                  label="Unit Block Start"
                  type="text"
                  readonly={readonly}
                  initialValue={data.unitBlockStart}
                />

                <Field
                  name="unitBlockEnd"
                  label="Unit Block End"
                  type="text"
                  readonly={readonly}
                  initialValue={data.unitBlockEnd}
                />

                <Field
                  name="unitCount"
                  label="Unit Count"
                  type="text"
                  readonly={readonly}
                  initialValue={data.unitCount}
                />

                <Field
                  name="serialNumberBlock"
                  label="Serial Number Block"
                  type="text"
                  readonly={readonly}
                  initialValue={data.serialNumberBlock}
                />

                <Field
                  name="countryJurisdictionOfOwner"
                  label="Country Jurisdiction Of Owner"
                  type="text"
                  readonly={readonly}
                  initialValue={data.countryJurisdictionOfOwner}
                />

                <Field
                  name="inCountryJurisdictionOfOwner"
                  label="In-Country Jurisdiction Of Owner"
                  type="text"
                  readonly={readonly}
                  initialValue={data.inCountryJurisdictionOfOwner}
                />

                <Field
                  name="unitType"
                  label="Unit Type"
                  type="picklist"
                  options={picklistOptions?.unitType}
                  readonly={readonly}
                  initialValue={data.unitType}
                />

                <Field
                  name="unitStatusReason"
                  label="Unit Status Reason"
                  type="picklist"
                  options={picklistOptions?.unitStatus}
                  readonly={readonly}
                  initialValue={data.unitStatusReason}
                />

                <Field
                  name="vintageYear"
                  label="Unit Status Reason"
                  type="text"
                  readonly={readonly}
                  initialValue={data.vintageYear}
                />
              </div>
              <div>
                <Field
                  name="unitRegistryLink"
                  label="Unit Registry Link"
                  type="link"
                  readonly={readonly}
                  initialValue={data.unitRegistryLink}
                />
              </div>
            </Card>
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Field
                  name="marketplace"
                  label="Marketplace"
                  type="text"
                  readonly={readonly}
                  initialValue={data.marketplace}
                />

                <Field
                  name="marketplaceIdentifier"
                  label="Marketplace Identifier"
                  type="text"
                  readonly={readonly}
                  initialValue={data.marketplaceIdentifier}
                />

                <Field
                  name="marketplaceLink"
                  label="Marketplace Link"
                  type="text"
                  readonly={readonly}
                  initialValue={data.marketplaceLink}
                />

                <Field
                  name="correspondingAdjustmentStatus"
                  label="Corresponding Adjustment Status"
                  type="picklist"
                  options={picklistOptions?.correspondingAdjustmentStatus}
                  readonly={readonly}
                  initialValue={data.correspondingAdjustmentStatus}
                />

                <Field
                  name="correspondingAdjustmentDeclaration"
                  label="Corresponding Adjustment Declaration"
                  type="picklist"
                  options={picklistOptions?.correspondingAdjustmentDeclaration}
                  readonly={readonly}
                  initialValue={data.correspondingAdjustmentDeclaration}
                />
              </div>
            </Card>
            <Card>
              <Field name="unitTags" label="Unit Tags" type="tag" readonly={readonly} initialValue={data.unitTags} />
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { UnitForm };
