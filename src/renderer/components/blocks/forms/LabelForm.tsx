import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Label } from '@/schemas/Label.schema';
import { PickList } from '@/schemas/PickList.schema';
import { validateAndSubmitFieldArrayForm } from '@/utils/formik-utils';

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

interface LabelFormFormProps {
  readonly?: boolean;
  data?: Label[];
  picklistOptions?: PickList | null;
}

export interface LabelFormRef {
  submitForm: () => Promise<any>;
}

const LabelForm = forwardRef<LabelFormRef, LabelFormFormProps>(
  ({ readonly = false, data, picklistOptions }, ref) => {
    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      submitForm: () => validateAndSubmitFieldArrayForm(formikRef, 'labels'),
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
                unitQuantity: null
              }}
            >
              {(label: Label, index: number, name: string) => (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Field name="label" label="Label" type="text" readonly={readonly} initialValue={label.label} />
                    <Field
                      name={`${name}[${index}].labelType`}
                      label="Label Type"
                      type="picklist"
                      options={picklistOptions?.labelType}
                      readonly={readonly}
                      initialValue={label.labelType}
                    />
                    <Field
                      name={`${name}[${index}].labelLink`}
                      label="Label Link"
                      type="link"
                      readonly={readonly}
                      initialValue={label.labelLink}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Field
                      name={`${name}[${index}].validityPeriodStartDate`}
                      label="Validity Period Start Date"
                      type="date"
                      readonly={readonly}
                      initialValue={label.validityPeriodStartDate}
                    />
                    <Field
                      name={`${name}[${index}].validityPeriodEndDate`}
                      label="Validity Period End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={label.validityPeriodEndDate}
                    />
                    <Field
                      name={`${name}[${index}].creditingPeriodStartDate`}
                      label="Crediting Period End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={label.creditingPeriodStartDate}
                    />
                    <Field
                      name={`${name}[${index}].creditingPeriodEndDate`}
                      label="Crediting Period End Date"
                      type="date"
                      readonly={readonly}
                      initialValue={label.creditingPeriodEndDate}
                    />
                    <Field
                      name={`${name}[${index}].unitQuantity`}
                      label="Unit Quantity"
                      type="number"
                      readonly={readonly}
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
  },
);

export { LabelForm };
