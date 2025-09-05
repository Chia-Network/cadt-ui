import React from 'react';
import { Modal } from '@/components';
import { FormattedMessage } from 'react-intl';

interface Props {
  onClose: () => void;
  errorMessage?: string;
}

const CommitTransferErrorModal: React.FC<Props> = ({ onClose, errorMessage }: Props) => {
  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="project-transfer-error" />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <FormattedMessage id="failed-to-commit-project-transfer" />.{' '}
          </p>
          <p>
            {errorMessage ? (
              errorMessage
            ) : (
              <>
                <FormattedMessage id="no-changes-have-been-made" />.
              </>
            )}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { CommitTransferErrorModal };
