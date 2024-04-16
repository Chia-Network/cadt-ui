import React from 'react';
import { Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetStagedProjectsQuery } from '@/api/cadt/v1/staging/staging.api';

interface ProjectModalProps {
  stagingUuid: string;
  onClose: () => void;
}

const StagingDiffModal: React.FC<ProjectModalProps> = ({ stagingUuid, onClose }: ProjectModalProps) => {
  const { data, isLoading } = useGetStagedProjectsQuery();

  console.log('StagingDiffModal data', data);

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'staging-diff'} />
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <>
            <p>todo: this is the diff view for staging {stagingUuid}</p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export { StagingDiffModal };
