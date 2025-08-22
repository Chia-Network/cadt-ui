import React, { useCallback } from 'react';
import { noop } from 'lodash';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, FloatingLabel, FormButton, HelperText, Spacer } from '@/components';
import { Alert } from 'flowbite-react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useUrlHash } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const validationSchema = yup.object({
  apiHost: yup
    .string()
    .required('Server Address is required')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(https?:\/\/(www\.)?)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}|localhost|[a-z0-9]+|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(:[0-9]{1,5})?(\/.*)?$/,
      'Please enter a valid server address',
    ),
  apiKey: yup.string(),
});

interface FormProps {
  onSubmit: (apiHost: string, apiKey?: string) => Promise<any>;
  hasServerError: boolean;
  onClearError: () => void;
}

const ConnectForm: React.FC<FormProps> = ({ onSubmit, hasServerError, onClearError = noop }) => {
  const intl: IntlShape = useIntl();
  const [, setIsActive] = useUrlHash('connect');
  const appStore = useSelector((state: RootState) => state.app);
  const configFileLoaded = appStore.configFileLoaded;
  const apiHost = configFileLoaded ? appStore.apiHost : '';
  const apiKey = appStore?.apiKey ? appStore.apiKey : '';

  const handleSubmit = useCallback(
    async (values: { apiHost: string; apiKey?: string }, { setSubmitting }) => {
      await onSubmit(values.apiHost, values.apiKey);
      setSubmitting(false);
    },
    [onSubmit],
  );

  const handleChange = useCallback(
    (event, field) => {
      onClearError();
      field.onChange(event); // Call Formik's original onChange
    },
    [onClearError],
  );

  const handleRetry = useCallback(() => {
    setIsActive(false);
    window.location.reload();
  }, [setIsActive]);

  return (
    <Formik initialValues={{ apiHost, apiKey }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          {hasServerError && (
            <>
              <Alert color="failure">
                <FormattedMessage id="server-not-found" />
              </Alert>
              <Spacer size={15} />
            </>
          )}
          <div className="mb-4">
            <HelperText className="text-gray-400">
              <FormattedMessage
                id={configFileLoaded ? 'api-host-loaded-from-configuration' : 'server-address-helper'}
              />
            </HelperText>
            <Spacer size={5} />
            <Field name="apiHost">
              {({ field }) => (
                <FloatingLabel
                  id="apiHost"
                  disabled={configFileLoaded}
                  label={intl.formatMessage({ id: 'server-address' })}
                  color={errors.apiHost && touched.apiHost && 'error'}
                  variant="outlined"
                  required
                  type="text"
                  {...field}
                  onChange={(event) => handleChange(event, field)}
                />
              )}
            </Field>
            {touched.apiHost && <ErrorMessage name="apiHost" component="div" className="text-red-600" />}
          </div>
          <div className="mb-4">
            <Field name="apiKey">
              {({ field }) => (
                <FloatingLabel
                  id="apiKey"
                  label={intl.formatMessage({ id: 'api-key' })}
                  color={errors.apiKey && touched.apiKey && 'error'}
                  variant="outlined"
                  type="text"
                  {...field}
                  onChange={(event) => handleChange(event, field)}
                />
              )}
            </Field>
            {touched.apiKey && <ErrorMessage name="apiKey" component="div" className="text-red-600" />}
          </div>
          <div className="flex gap-4">
            <FormButton isSubmitting={isSubmitting} formikErrors={errors}>
              <FormattedMessage id="submit" />
            </FormButton>
            <Button color="light" type="button" onClick={handleRetry}>
              <FormattedMessage id="retry" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ConnectForm };
