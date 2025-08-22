import React, { useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { CheckBox, FloatingLabel, FormButton, Label } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

const validationSchema = yup.object({
  orgUid: yup.string().length(64).required('OrgUid is required'),
});

export interface ImportOrganizationProps {
  orgUid: string;
  isHome: boolean;
}

interface FormProps {
  onSubmit: (params: ImportOrganizationProps) => Promise<any>;
}

const ImportOrganizationForm: React.FC<FormProps> = ({ onSubmit }) => {
  const intl: IntlShape = useIntl();

  const handleSubmit = useCallback(
    async (values: ImportOrganizationProps, { setSubmitting }) => {
      await onSubmit(values);
      setSubmitting(false);
    },
    [onSubmit],
  ); // Include onSuccess in the dependencies array

  return (
    <>
      <Formik initialValues={{ orgUid: '', isHome: true }} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
              <div className="flex space-x-2.5">
                <Field name="isHome">{({ field }) => <CheckBox id="isHome" checked {...field} />}</Field>
                <Label htmlFor="isHome">
                  <p className="text-gray-600">
                    <FormattedMessage id="import-as-home-organization" />
                  </p>
                </Label>
              </div>
            </div>
            <FormButton isSubmitting={isSubmitting} formikErrors={errors}>
              <FormattedMessage id="submit" />
            </FormButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { ImportOrganizationForm };
