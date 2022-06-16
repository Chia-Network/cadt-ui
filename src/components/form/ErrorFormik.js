import React from 'react';
import { formatValidationError } from '../../utils/stringUtils';
import { FormattedMessage } from 'react-intl';

import { Body } from '../typography';

const ErrorFormik = ({ touched, error }) => {
  if (!error) {
    return null;
  }

  const isErrorOfTranslationIdType = error.includes('yup-validation-');

  return touched && error ? (
    <Body size="Small" color="red">
      {isErrorOfTranslationIdType && <FormattedMessage id={error} />}
      {/* fallback in case error is not of translation id type */}
      {!isErrorOfTranslationIdType && formatValidationError(error)}
    </Body>
  ) : null;
};

export { ErrorFormik };
