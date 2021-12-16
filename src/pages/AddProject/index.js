import React from 'react';
import { CreateProjectForm } from '../../components';

const AddProject = () => {
  return (
    <div
      style={{
        margin: '30px',
        padding: '30px',
        border: 'solid lightgray 1px',
        overflow: 'auto',
        height: 'calc(100% - 120px)',
      }}>
      <CreateProjectForm />
    </div>
  );
};

export { AddProject };
