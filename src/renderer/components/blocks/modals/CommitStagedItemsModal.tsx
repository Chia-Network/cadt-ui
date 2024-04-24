import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCommitAllMutation, useCommitProjectsMutation, useCommitUnitsMutation } from '@/api/cadt/v1/staging';

interface ModalProps {
  numStagedItems: number;
  onClose: () => void;
}

const CommitStagedItemsModal: React.FC<ModalProps> = ({ onClose, numStagedItems }) => {
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
      {numStagedItems ? (
        <>
          <Modal.Body>
            <p>
              <FormattedMessage id="what-would-you-like-to-commit" />?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => triggerCommitAll()}
              isProcessing={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
              disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
            >
              <FormattedMessage id="commit-all" />
            </Button>
            <Button
              onClick={() => triggerCommitProjects()}
              isProcessing={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
              disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
            >
              <FormattedMessage id="commit-projects-only" />
            </Button>
            <Button
              onClick={() => triggerCommitUnits()}
              isProcessing={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
              disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
            >
              <FormattedMessage id="commit-units-only" />
            </Button>
            <Button
              color="gray"
              onClick={handleClickClose}
              disabled={commitAllLoading || commitProjectsLoading || commitUnitsLoading}
            >
              <FormattedMessage id="cancel" />
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Modal.Footer>
          <p>
            <FormattedMessage id="nothing-to-commit" />.
          </p>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export { CommitStagedItemsModal };
