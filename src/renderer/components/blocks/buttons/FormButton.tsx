import React from 'react';
import { Button, Spinner } from '@/components';

interface FormButtonProps {
  isSubmitting: boolean;
  formikErrors: any;
  children?: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ isSubmitting, formikErrors, children }) => {
  return (
    <Button type="submit" disabled={isSubmitting || Boolean(Object.keys(formikErrors).length)}>
      {isSubmitting ? <Spinner size="sm" light={true} /> : children}
    </Button>
  );
};

export { FormButton };
