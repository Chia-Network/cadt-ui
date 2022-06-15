import React from 'react';
import { formatValidationError } from '../../utils/stringUtils';
import { Body } from '../typography';

const ErrorFormik = ({ touched, error }) => {
  return touched && error ? (
    <Body size="Small" color="red">
      {formatValidationError(error)}
    </Body>
  ) : null;
};

export { ErrorFormik };
