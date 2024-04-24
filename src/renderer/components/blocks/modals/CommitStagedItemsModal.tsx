import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCommitAllMutation, useCommitProjectsMutation, useCommitUnitsMutation } from '@/api/cadt/v1/staging';

interface ModalProps {
  type: 'project' | 'unit';
  onClose: () => void;
}

const CommitStagedItemsModal: React.FC<ModalProps> = ({ onClose, type }) => {
  const [triggerCommitAll, { isLoading: commitAllLoading }] = useCommitAllMutation();
  const [triggerCommitProjects, { isLoading: commitProjectsLoading }] = useCommitProjectsMutation();
  const [triggerCommitUnits, { isLoading: commitUnitsLoading }] = useCommitUnitsMutation();
  const handleClickClose = async () => {
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="commit-staged-changes" />
      </Modal.Header>
      <Modal.Body>
        <p>
          <FormattedMessage id="what-would-you-like-to-commit" />?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            await triggerCommitAll();
            onClose();
          }}
          isProcessing={commitAllLoading}
          disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
        >
          <FormattedMessage id="commit-all" />
        </Button>
        {type === 'project' && (
          <Button
            outline
            onClick={async () => {
              await triggerCommitProjects();
              onClose();
            }}
            isProcessing={commitProjectsLoading}
            disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
          >
            <FormattedMessage id="commit-projects-only" />
          </Button>
        )}
        {type === 'unit' && (
          <Button
            outline
            onClick={async () => {
              await triggerCommitUnits();
              onClose();
            }}
            isProcessing={commitUnitsLoading}
            disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
          >
            <FormattedMessage id="commit-units-only" />
          </Button>
        )}
        <Button
          color="gray"
          onClick={handleClickClose}
          disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
        >
          <FormattedMessage id="cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CommitStagedItemsModal };
