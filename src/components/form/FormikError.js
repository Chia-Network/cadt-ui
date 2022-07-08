import React from 'react';
import { formatValidationError } from '../../utils/stringUtils';
import { useIntl } from 'react-intl';
import { ErrorMessage } from 'formik';

import { Body } from '../typography';

const FormikError = ({ name }) => {
  if (!name) {
    return null;
  }

  const intl = useIntl();

  const getTranslatedOrFormattedError = error => {
    const isErrorOfTranslationIdType = error
      ? error.includes('yup-validation-')
      : false;
    if (isErrorOfTranslationIdType) {
      return intl.formatMessage({ id: error });
    }
    /* fallback in case error is not of translation id type */
    return formatValidationError(error);
  };

  return (
    <ErrorMessage name={name}>
      {msg => (
        <Body size="Small" color="red">
          {getTranslatedOrFormattedError(msg)}
        </Body>
      )}
    </ErrorMessage>
  );
};

export { FormikError };
