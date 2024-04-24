import React from 'react';
import { Spinner } from '@/components';

interface ComponentCenteredSpinnerProps {
  label?: string;
}

const ComponentCenteredSpinner: React.FC<ComponentCenteredSpinnerProps> = ({ label }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Spinner />
      {label && <div className="ml-4">{label}</div>}
    </div>
  );
};

export { ComponentCenteredSpinner };
