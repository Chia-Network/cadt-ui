import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Card, ComponentCenteredSpinner, Field, Label, Select, SelectOption } from '@/components';
import { Unit } from '@/schemas/Unit.schema';
import { useGetHomeOrgQuery, useGetProjectQuery } from '@/api';
import { PickList } from '@/schemas/PickList.schema';
import { useGetProjectOptionsList } from '@/hooks';

const validationSchema = yup.object({
  unitOwner: yup.string().required('Unit Owner is required'),
  unitBlockStart: yup.string().required('Unit Block Start is required'),
  unitBlockEnd: yup.string().required('Unit Block End is required'),
  unitCount: yup.number().required('Unit Count is required').positive('Unit Count must be positive'),
  countryJurisdictionOfOwner: yup.string().required('Country Jurisdiction Of Owner is required'),
  inCountryJurisdictionOfOwner: yup.string().required('In-Country Jurisdiction Of Owner is required'),
  unitType: yup.string().required('Unit Type is required'),
  unitStatus: yup.string().required('Unit Status is required'),
  unitStatusReason: yup.string().nullable(),
  vintageYear: yup
    .number()
    .required('Vintage Year is required')
    .min(1901, 'Vintage Year must be after 1900')
    .max(2155, 'Vintage Year must be before 2156'),
  unitRegistryLink: yup.string().url('Must be a valid URL'),
  marketplace: yup.string(),
  marketplaceIdentifier: yup.string(),
  marketplaceLink: yup.string().url('Must be a valid URL'),
  correspondingAdjustmentStatus: yup.string().required('Corresponding Adjustment Status is required'),
  correspondingAdjustmentDeclaration: yup.string().required('Corresponding Adjustment Declaration is required'),
  unitTags: yup.string(),
});

interface UnitFormProps {
  readonly?: boolean;
  data?: Unit;
  picklistOptions?: PickList | undefined;
}

export interface UnitFormRef {
  submitForm: () => Promise<any>;
}

const UnitForm = forwardRef<UnitFormRef, UnitFormProps>(({ readonly = false, data: unit, picklistOptions }, ref) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const { data: homeOrg, isLoading: isHomeOrgLoading } = useGetHomeOrgQuery();
  const [error, setError] = useState<string | null>(null);
  const { projects: projectOptions, isLoading: isProjectOptionsLoading } = useGetProjectOptionsList(homeOrg?.orgUid);
  const [selectedWarehouseProjectId, setSelectedWarehouseProjectId] = useState<string | undefined>(
    unit?.warehouseProjectId?.toString(),
  );

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isFetching: isProjectFetching,
  } = useGetProjectQuery(
    {
      // @ts-ignore
      warehouseProjectId: selectedWarehouseProjectId,
    },
    { skip: !selectedWarehouseProjectId },
  );

  const projectLocationOptions: SelectOption[] = useMemo(() => {
    if (isProjectLoading || !projectData?.projectLocations) {
      return [];
    }

    return projectData.projectLocations.map(
      (location): SelectOption => ({
        label: `${location.country} - ${location.inCountryRegion}`,
        value: location.id || '',
      }),
    );
  }, [projectData, isProjectLoading]);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (formikRef.current) {
        const formik = formikRef.current;
        if (formik) {
          const errors = await formik.validateForm(formik.values);
          formik.setTouched(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

          if (selectedWarehouseProjectId) {
            formik.values.warehouseProjectId = selectedWarehouseProjectId;
          } else {
            const error = { warehouseProjectId: 'A valid project must be selected' };
            setError(error.warehouseProjectId);
            return [{ ...errors, ...error }, formik.values];
          }

          return [errors, formik.values];
        }
      }
    },
  }));

  const handleSetWarehouseProjectId = (value) => {
    setError(null);
    setSelectedWarehouseProjectId(value);
  };

  if ((isHomeOrgLoading || isProjectOptionsLoading) && !readonly) {
    return <ComponentCenteredSpinner label="Loading Selected Project Data" />;
  }

  if ((isProjectLoading || isProjectFetching) && !readonly) {
    return <ComponentCenteredSpinner label="Loading Selected Project Data" />;
  }

  return (
    <Formik innerRef={formikRef} initialValues={unit || {}} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {!readonly && (
                  <>
                    <div>
                      <Label htmlFor="select-project">Select Project</Label>
                      <Select
                        id="select-project"
                        name="select-project"
                        onChange={handleSetWarehouseProjectId}
                        options={projectOptions}
                        initialValue={unit?.warehouseProjectId?.toString() || ''}
                      />
                      {error && <p className="text-red-500 text-s italic">{error}</p>}
                    </div>
                  </>
                )}

                <Field
                  name="projectLocationId"
                  label="Project Location Id"
                  disabled={!selectedWarehouseProjectId}
                  type="picklist"
                  options={projectLocationOptions}
                  readonly={readonly}
                  initialValue={unit?.projectLocationId}
                />
                <Field
                  name="unitOwner"
                  label="Unit Owner"
                  type="text"
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitOwner}
                />
                <Field
                  name="unitBlockStart"
                  label="Unit Block Start"
                  type="text"
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitBlockStart}
                />

                <Field
                  name="unitBlockEnd"
                  label="Unit Block End"
                  type="text"
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitBlockEnd}
                />

                <Field
                  name="unitCount"
                  label="Unit Count"
                  type="number"
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitCount}
                />

                <Field
                  name="countryJurisdictionOfOwner"
                  label="Country Jurisdiction Of Owner"
                  type="picklist"
                  options={picklistOptions?.countries}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.countryJurisdictionOfOwner}
                />

                <Field
                  name="inCountryJurisdictionOfOwner"
                  label="In-Country Jurisdiction Of Owner"
                  type="picklist"
                  options={picklistOptions?.countries}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.inCountryJurisdictionOfOwner}
                />

                <Field
                  name="unitType"
                  label="Unit Type"
                  type="picklist"
                  options={picklistOptions?.unitType}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitType}
                />

                <Field
                  name="unitStatus"
                  label="Unit Status"
                  type="picklist"
                  options={picklistOptions?.unitStatus}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.unitStatus}
                />

                <Field
                  name="unitStatusReason"
                  label="Unit Status Reason"
                  type="text"
                  readonly={readonly}
                  initialValue={unit?.unitStatusReason}
                />

                <Field
                  name="vintageYear"
                  label="Vintage Year"
                  type="number"
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.vintageYear}
                />
              </div>
              <div>
                <Field
                  name="unitRegistryLink"
                  label="Unit Registry Link"
                  type="link"
                  readonly={readonly}
                  initialValue={unit?.unitRegistryLink}
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
                  initialValue={unit?.marketplace}
                />

                <Field
                  name="marketplaceIdentifier"
                  label="Marketplace Identifier"
                  type="text"
                  readonly={readonly}
                  initialValue={unit?.marketplaceIdentifier}
                />

                <Field
                  name="marketplaceLink"
                  label="Marketplace Link"
                  type="text"
                  readonly={readonly}
                  initialValue={unit?.marketplaceLink}
                />

                <Field
                  name="correspondingAdjustmentStatus"
                  label="Corresponding Adjustment Status"
                  type="picklist"
                  options={picklistOptions?.correspondingAdjustmentStatus}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.correspondingAdjustmentStatus}
                />

                <Field
                  name="correspondingAdjustmentDeclaration"
                  label="Corresponding Adjustment Declaration"
                  type="picklist"
                  options={picklistOptions?.correspondingAdjustmentDeclaration}
                  readonly={readonly}
                  required={true}
                  initialValue={unit?.correspondingAdjustmentDeclaration}
                />
              </div>
            </Card>
            <Card>
              <Field name="unitTags" label="Unit Tags" type="tag" readonly={readonly} initialValue={unit?.unitTags} />
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
});

export { UnitForm };
