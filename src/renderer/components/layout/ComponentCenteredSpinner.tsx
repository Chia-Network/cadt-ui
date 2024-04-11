import React from 'react';
import { Spinner } from '@/components';

const ComponentCenteredSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Spinner />
    </div>
  );
};

export { ComponentCenteredSpinner };
