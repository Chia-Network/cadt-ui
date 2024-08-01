import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Label } from '@/schemas/Label.schema';
import { PickList } from '@/schemas/PickList.schema';
import { deepOmit, validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';
import { useIntl } from 'react-intl';

const validationSchema = yup.object({
  labels: yup.array().of(
    yup.object({
      label: yup.string().required('Label is required'),
      labelType: yup.string().required('Label type is required'),
      labelLink: yup.string().required('Label link is required').url('Must be a valid URL'),
      validityPeriodStartDate: yup.date().required('Validity period start date is required'),
      validityPeriodEndDate: yup
        .date()
        .required('Validity period end date is required')
        .when('validityPeriodStartDate', (validityPeriodStartDate, schema) =>
          validityPeriodStartDate
            ? schema.min(validityPeriodStartDate, 'Validity Period End Date must be after the start date')
            : schema,
        ),
      creditingPeriodStartDate: yup.date().required('crediting period start date is required'),
      creditingPeriodEndDate: yup
        .date()
        .required('crediting period end date is required')
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

interface LabelsFormProps {
  readonly?: boolean;
  data?: Label[];
  picklistOptions?: PickList | null;
}

export interface LabelsFormRef {
  submitForm: () => Promise<any>;
}

const LabelsForm = forwardRef<LabelsFormRef, LabelsFormProps>(({ readonly = false, data, picklistOptions }, ref) => {
  const intl = useIntl();
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    submitForm: async () =>
      deepOmit(await validateAndSubmitFieldArrayForm(formikRef, 'labels'), [
        'orgUid',
        'warehouseProjectId',
        'warehouseUnitId',
        'timeStaged',
      ]),
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ labels: data || [] }}
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
            initialValue={data || []}
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
            {(label: Label, index: number, name: string) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name={`${name}[${index}].label`}
                    label={intl.formatMessage({ id: 'label' })}
                    type="text"
                    readonly={readonly}
                    required={true}
                    initialValue={label.label}
                  />
                  <Field
                    name={`${name}[${index}].labelType`}
                    label={intl.formatMessage({ id: 'label-type' })}
                    type="picklist"
                    options={picklistOptions?.labelType}
                    readonly={readonly}
                    required={true}
                    initialValue={label.labelType}
                  />
                  <Field
                    name={`${name}[${index}].labelLink`}
                    label={intl.formatMessage({ id: 'label-link' })}
                    type="link"
                    readonly={readonly}
                    required={true}
                    initialValue={label.labelLink}
                  />
                  <Field
                    name={`${name}[${index}].validityPeriodStartDate`}
                    label={intl.formatMessage({ id: 'validity-period-start-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={label.validityPeriodStartDate}
                  />
                  <Field
                    name={`${name}[${index}].validityPeriodEndDate`}
                    label={intl.formatMessage({ id: 'validity-period-end-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={label.validityPeriodEndDate}
                  />
                  <Field
                    name={`${name}[${index}].creditingPeriodStartDate`}
                    label={intl.formatMessage({ id: 'crediting-period-start-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={label.creditingPeriodStartDate}
                  />
                  <Field
                    name={`${name}[${index}].creditingPeriodEndDate`}
                    label={intl.formatMessage({ id: 'crediting-period-end-date' })}
                    type="date"
                    readonly={readonly}
                    required={true}
                    initialValue={label.creditingPeriodEndDate}
                  />
                  <Field
                    name={`${name}[${index}].unitQuantity`}
                    label={intl.formatMessage({ id: 'unit-quantity' })}
                    type="number"
                    readonly={readonly}
                    required={true}
                    initialValue={label.unitQuantity}
                  />
                </div>
              </>
            )}
          </Repeater>
        </Form>
      )}
    </Formik>
  );
});

export { LabelsForm };
