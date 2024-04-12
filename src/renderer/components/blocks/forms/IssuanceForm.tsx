import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Field, Repeater } from '@/components';
import { Issuance } from '@/schemas/Issuance.schema';

const validationSchema = yup.object({
  issuances: yup.array().of(
    yup.object({
      startDate: yup.date().required('Start date is required'),
      endDate: yup.date().required('End date is required'),
      verificationApproach: yup.string().required('Verification approach is required'),
      verificationBody: yup.string().required('Verification body is required'),
      verificationReportDate: yup.date().required('Verification report date is required'),
    }),
  ),
});

interface IssuanceFormProps {
  onSubmit: (values: any) => Promise<any>;
  readonly?: boolean;
  data?: Issuance[] | undefined;
}

const IssuanceForm: React.FC<IssuanceFormProps> = ({ readonly = false, data }) => {
  return (
    <Formik
      initialValues={{ issuances: data }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Repeater<Issuance>
            name="issuances"
            maxNumber={100}
            minNumber={1}
            readonly={readonly}
            initialValue={data || []}
          >
            <Field name="startDate" label="Start Date" type="date" readonly={readonly} />
            <Field name="endDate" label="End Date" type="date" readonly={readonly} />
            <Field name="verificationApproach" label="Verification Approach" type="text" readonly={readonly} />
            <Field name="verificationBody" label="Verification Body" type="text" readonly={readonly} />
            <Field name="verificationReportDate" label="Verification Report Date" type="date" readonly={readonly} />
          </Repeater>
        </Form>
      )}
    </Formik>
  );
};

export { IssuanceForm };
