import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {Field, Repeater, Select, SelectOption} from '@/components';
import * as yup from 'yup';
import {Label} from '@/schemas/Label.schema';
import {PickList} from '@/schemas/PickList.schema';
import {deepOmit, validateAndSubmitFieldArrayForm} from '@/utils/formik-utils';
import {useGetProjectQuery} from '@/api';

/**
 * Validation schema for labels form
 */
const validationSchema = yup.object({
  labels: yup.array().of(
    yup.object({
      label: yup.string().required('Label is required'),
      labelType: yup.string().required('Label type is required'),
      labelLink: yup.string().url('Must be a valid URL').nullable(),
      validityPeriodStartDate: yup.date().nullable(),
      validityPeriodEndDate: yup
        .date()
        .nullable()
        .when('validityPeriodStartDate', (validityPeriodStartDate, schema) =>
          validityPeriodStartDate
            ? schema.min(validityPeriodStartDate, 'Validity Period End Date must be after the start date')
            : schema,
        ),
      creditingPeriodStartDate: yup.date().nullable(),
      creditingPeriodEndDate: yup
        .date()
        .nullable()
        .when('creditingPeriodStartDate', (creditingPeriodStartDate, schema) =>
          creditingPeriodStartDate
            ? schema.min(creditingPeriodStartDate, 'Crediting Period End Date must be after the start date')
            : schema,
        ),
      unitQuantity: yup
        .number()
        .positive('Unit Quantity must be positive')
        .integer('Must be an integer')
        .required('Unit Quantity is required'),
    }),
  ),
});

/**
 * Props for the LabelsForm component
 */
interface LabelsFormProps {
  readonly?: boolean;
  data?: Label[];
  picklistOptions?: PickList | null;
  selectedWarehouseProjectId?: string | null;
}

/**
 * Reference methods for the LabelsForm component
 */
export interface UnitLabelsFormRef {
  submitForm: () => Promise<any>;
}

/**
 * Labels form component to manage label data
 */
const UnitLabelsForm = forwardRef<UnitLabelsFormRef, LabelsFormProps>(
  ({ readonly = false, data: labels, picklistOptions, selectedWarehouseProjectId }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);
    const [selectedLabels, setSelectedLabels] = useState<Label[]>(labels || []);

    const { data: projectData, isLoading: isProjectLoading } = useGetProjectQuery(
      // @ts-ignore
      { warehouseProjectId: selectedWarehouseProjectId },
      { skip: !selectedWarehouseProjectId },
    );

    useImperativeHandle(ref, () => ({
      submitForm: async () =>
        deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'labels'), [
          'orgUid',
          'warehouseProjectId',
          'warehouseUnitId',
          'timeStaged',
        ]),
    }));

    useEffect(() => {
      if (labels && labels.length >= 0) {
        setSelectedLabels(labels);
      }
    }, [labels]);

    const labelsOptions = useMemo(() => {
      if (isProjectLoading || !projectData?.labels) {
        return [{ label: 'New Label', value: 'new' }];
      }
      return [
        { label: 'New Label', value: 'new' },
        ...projectData.labels.map(
          (label): SelectOption => ({
            label: label.label || `${label.labelType} - ${label.unitQuantity}`,
            value: label.id || '',
          }),
        ),
      ];
    }, [projectData, isProjectLoading]);

    const handleSetLabel = (labelId: string | number, index: number) => {
      const label = projectData?.labels?.find((label) => label.id === labelId);
      const updatedLabels = [...selectedLabels];
      updatedLabels[index] = label || {
        label: null,
        labelType: null,
        labelLink: null,
        validityPeriodStartDate: null,
        validityPeriodEndDate: null,
        creditingPeriodStartDate: null,
        creditingPeriodEndDate: null,
        unitQuantity: null,
      };
      setSelectedLabels(updatedLabels);
    };

    console.log(selectedLabels);

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ labels: selectedLabels || [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Repeater<Label>
              name="labels"
              maxNumber={100}
              minNumber={0}
              readonly={readonly}
              initialValue={labels || []}
              itemTemplate={{
                label: null,
                labelType: null,
                labelLink: null,
                validityPeriodStartDate: null,
                validityPeriodEndDate: null,
                creditingPeriodStartDate: null,
                creditingPeriodEndDate: null,
                unitQuantity: null,
              }}
            >
              {(_, index: number, name: string) => (
                <div key={`index-${index}`}>
                  {!readonly && (
                    <Select
                      name="Select Label"
                      options={labelsOptions}
                      onChange={(value) => handleSetLabel(value, index)}
                      initialValue={selectedLabels[index]?.id?.toString() || ''}
                    />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Field
                      name={`${name}[${index}].label`}
                      label="Label"
                      type="text"
                      readonly={readonly}
                      required={true}
                      initialValue={selectedLabels[index]?.label}
                    />
                    <Field
                      name={`${name}[${index}].labelType`}
                      label="Label Type"
                      type="picklist"
                      options={picklistOptions?.labelType}
                      readonly={readonly}
                      required={true}
                      initialValue={selectedLabels[index]?.labelType}
                    />
                    <Field
                      name={`${name}[${index}].labelLink`}
                      label="Label Link"
                      type="link"
                      readonly={readonly}
                      initialValue={selectedLabels[index]?.labelLink}
                    />
                    <Field
                      name={`${name}[${index}].validityPeriodStartDate`}
                      label="Validity Period Start Date"
                      type="date"
                      readonly={readonly}
                      initialValue={selectedLabels[index]?.validityPeriodStartDate}
                    />
                    <Field
                      name={`${name}[${index}].validityPeriodEndDate`}
                      label="Validity Period End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={selectedLabels[index]?.validityPeriodEndDate}
                    />
                    <Field
                      name={`${name}[${index}].creditingPeriodStartDate`}
                      label="Crediting Period Start Date"
                      type="date"
                      readonly={readonly}
                      initialValue={selectedLabels[index]?.creditingPeriodStartDate}
                    />
                    <Field
                      name={`${name}[${index}].creditingPeriodEndDate`}
                      label="Crediting Period End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={selectedLabels[index]?.creditingPeriodEndDate}
                    />
                    <Field
                      name={`${name}[${index}].unitQuantity`}
                      label="Unit Quantity"
                      type="number"
                      readonly={readonly}
                      required={true}
                      initialValue={selectedLabels[index]?.unitQuantity}
                    />
                  </div>
                </div>
              )}
            </Repeater>
          </Form>
        )}
      </Formik>
    );
  },
);

export { UnitLabelsForm };
