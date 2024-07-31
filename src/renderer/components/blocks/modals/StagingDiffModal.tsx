import React from 'react';
import { Modal, StagingDiff } from '@/components';
import { FormattedMessage } from 'react-intl';

interface ProjectModalProps {
  stagingUuid: string;
  onClose: () => void;
}

const StagingDiffModal: React.FC<ProjectModalProps> = ({ stagingUuid, onClose }: ProjectModalProps) => {
  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'change-record'} />
      </Modal.Header>
      <Modal.Body>
        <StagingDiff stagingUuid={stagingUuid} />
      </Modal.Body>
    </Modal>
  );
};

export { StagingDiffModal };
