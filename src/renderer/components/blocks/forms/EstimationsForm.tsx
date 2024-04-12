import React from 'react';
import { Formik, Form } from 'formik';
import { Repeater, Field } from '@/components';
import { Estimation } from '@/schemas/Estimation.schema';
import * as yup from 'yup';

const validationSchema = yup.object({
  estimations: yup.array().of(
    yup.object({
      creditingPeriodStart: yup.date().required('Crediting period start is required'),
      creditingPeriodEnd: yup.date().required('Crediting period end is required'),
      unitCount: yup.number().required('Unit count is required').positive('Unit count must be positive'),
    }),
  ),
});

interface EstimationsFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: Estimation[];
}

const EstimationsForm: React.FC<EstimationsFormProps> = ({ readonly = false, data, onSubmit }) => {
  return (
    <Formik
      initialValues={{ estimations: data || [] }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form>
          <Repeater<Estimation>
            name="estimations"
            maxNumber={10}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            <Field name="creditingPeriodStart" label="Crediting Period Start" type="date" readonly={readonly} />
            <Field name="creditingPeriodEnd" label="Crediting Period End" type="date" readonly={readonly} />
            <Field name="unitCount" label="Unit Count" type="number" readonly={readonly} />
          </Repeater>
          {!readonly && (
            <button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-500 text-white p-2 rounded">
              Save Estimations
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export { EstimationsForm };
