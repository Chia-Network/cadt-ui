import React, { useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, Spinner } from 'flowbite-react';
import { IntlShape, useIntl } from 'react-intl';
import { FloatingLabel } from '@/components';

const validationSchema = yup.object({
  orgUid: yup.string().length(64).required('OrgUid is required'),
});

interface FormProps {
  onSubmit: (orgUid: string) => Promise<any>;
}

const ImportOrganizationForm: React.FC<FormProps> = ({ onSubmit }) => {
  const intl: IntlShape = useIntl();

  const handleSubmit = useCallback(
    async (values: { orgUid: string }, { setSubmitting }) => {
      await onSubmit(values.orgUid);
      setSubmitting(false);
    },
    [onSubmit],
  ); // Include onSuccess in the dependencies array

  return (
    <>
      <Formik initialValues={{ orgUid: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field name="orgUid">
                {({ field }) => (
                  <FloatingLabel
                    id="name"
                    label={intl.formatMessage({ id: 'organization-orguid' })}
                    color={errors.orgUid && touched.orgUid && 'error'}
                    variant="outlined"
                    type="text"
                    {...field}
                  />
                )}
              </Field>
              {touched.orgUid && <ErrorMessage name="orgUid" component="div" className="text-red-600" />}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" light={true} /> : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { ImportOrganizationForm };
