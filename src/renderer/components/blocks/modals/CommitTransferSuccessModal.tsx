import React from 'react';
import { Modal } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';

interface Props {
  onClose: () => void;
}

const CommitTransferSuccessModal: React.FC<Props> = ({ onClose }: Props) => {
  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="project-transfer-committed" />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <FormattedMessage id="the-project-has-been-successfully-transfered-and-the-associated-changes-have-been-committed" />
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { CommitTransferSuccessModal };
