import React from 'react';
import { Form, Formik } from 'formik';
import { Field, Repeater } from '@/components';
import * as yup from 'yup';
import { Label } from '@/schemas/Label.schema';
import { PickList } from '@/schemas/PickList.schema';

const validationSchema = yup.object({
  labels: yup.array().of(
    yup.object({
      label: yup.string().required('Label is required'),
      labelType: yup.string().required('Label type is required'),
      labelLink: yup.string().url('Must be a valid URL').nullable(),
      validityPeriodStartDate: yup.date().nullable(),
      validityPeriodEndDate: yup.date().nullable(),
      creditingPeriodStartDate: yup.date().nullable(),
      creditingPeriodEndDate: yup.date().nullable(),
      unitQuantity: yup
        .number()
        .positive('Unit Quantity must be positive')
        .integer('Must be an integer')
        .required('Unit Quantity is required'),
    }),
  ),
});

interface LabelFormFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: Label[];
  picklistOptions: PickList | undefined | null;
}

const LabelForm: React.FC<LabelFormFormProps> = ({ readonly = false, data, picklistOptions }) => {
  return (
    <Formik
      initialValues={{ labels: data || [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<Label> name="locations" maxNumber={100} minNumber={1} readonly={readonly} initialValue={data || []}>
            {(label: Label) => (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field name="label" label="Label" type="text" readonly={readonly} initialValue={label.label} />
                  <Field
                    name="labelType"
                    label="Label Type"
                    type="picklist"
                    options={picklistOptions?.labelType}
                    readonly={readonly}
                    initialValue={label.labelType}
                  />
                </div>
                <div>
                  <Field
                    name="labelLink"
                    label="Label Link"
                    type="link"
                    readonly={readonly}
                    initialValue={label.labelLink}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Field
                    name="validityPeriodStartDate"
                    label="Validity Period Start Date"
                    type="date"
                    readonly={readonly}
                    initialValue={label.validityPeriodStartDate}
                  />
                  <Field
                    name="validityPeriodEndDate"
                    label="Validity Period End Date"
                    type="date"
                    readonly={readonly}
                    initialValue={label.validityPeriodEndDate}
                  />
                  <Field
                    name="creditingPeriodStartDate"
                    label="Crediting Period End Date"
                    type="date"
                    readonly={readonly}
                    initialValue={label.creditingPeriodStartDate}
                  />
                  <Field
                    name="creditingPeriodEndDate"
                    label="Crediting Period End Date"
                    type="date"
                    readonly={readonly}
                    initialValue={label.creditingPeriodEndDate}
                  />
                  <Field
                    name="unitQuantity"
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
};

export { LabelForm };
