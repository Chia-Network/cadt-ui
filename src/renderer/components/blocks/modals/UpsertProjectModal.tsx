import React from 'react';
import { ComponentCenteredSpinner, Modal } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetProjectQuery } from '@/api';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertProjectModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [, createProjectModalActive] = useWildCardUrlHash('create-project');
  const [projectUpsertFragment] = useWildCardUrlHash('edit-project');
  const warehouseProjectId = projectUpsertFragment.replace('edit-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createProjectModalActive ? <FormattedMessage id="create-project" /> : <FormattedMessage id="edit-project" />}
      </Modal.Header>
    );
  };

  if (projectLoading) {
    return (
      <Modal show={true} onClose={onClose}>
        <ModalHeader />
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={onClose}>
      <ModalHeader />
      <Modal.Body>
        <div className="h-screen">
          <p>the project form goes here {projectData?.warehouseProjectId}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertProjectModal };
