import React from 'react';
import { Button } from '@/components';

interface FormButtonProps {
  isSubmitting: boolean;
  formikErrors: any;
  children?: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ isSubmitting, formikErrors, children }) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting || Boolean(Object.keys(formikErrors).length)}
      isProcessing={isSubmitting}
    >
      {children}
    </Button>
  );
};

export { FormButton };
