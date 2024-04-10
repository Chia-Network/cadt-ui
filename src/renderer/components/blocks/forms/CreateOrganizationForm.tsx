import React, { useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, FloatingLabel, Spinner } from '@/components';
import { IntlShape, useIntl } from 'react-intl';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface FormProps {
  onSubmit: (orgName: string) => Promise<any>;
}

const CreateOrganizationForm: React.FC<FormProps> = ({ onSubmit }) => {
  const intl: IntlShape = useIntl();

  const handleSubmit = useCallback(
    async (values: { name: string }, { setSubmitting }) => {
      await onSubmit(values.name);
      setSubmitting(false);
    },
    [onSubmit],
  ); // Include onSuccess in the dependencies array

  return (
    <Formik initialValues={{ name: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <Field name="name">
              {({ field }) => (
                <FloatingLabel
                  id="name"
                  label={intl.formatMessage({ id: 'organization-name' })}
                  color={errors.name && touched.name && 'error'}
                  variant="outlined"
                  type="text"
                  {...field}
                />
              )}
            </Field>
            {touched.name && <ErrorMessage name="name" component="div" className="text-red-600" />}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" light={true} /> : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { CreateOrganizationForm };
