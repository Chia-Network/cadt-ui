import React, { useState } from 'react';
import { Button, Card, FloatingLabel, Modal, Spinner, Tabs } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

interface CreateOrganizationModalProps {
  onClose: () => void; // onClose prop for closing the modal
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({ onClose }: CreateOrganizationModalProps) => {
  const intl: IntlShape = useIntl();
  const [orgCreationPending, setOrgCreationPending] = useState<boolean>(false);

  const CreateOrgLayoutBody: React.FC = () => {
    const [orgName, setOrgName] = useState<string>('');
    const [orgNameChanged, setOrgNameChanged] = useState<boolean>(true);

    const handleOrgUidChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrgNameChanged(true);
      setOrgName(event.target.value);
    };

    const accept = async () => {
      setOrgNameChanged(false);

      if (!orgName) {
        return;
      }

      onClose();
      setOrgCreationPending(true);
    };

    return (
      <>
        <div className="mt-4 mb-4">
          {!orgNameChanged && !orgName && <p>todo error</p>}
          <FloatingLabel
            variant="outlined"
            label={intl.formatMessage({ id: 'organization-name' })}
            onChange={handleOrgUidChanged}
            value={orgName}
          />
        </div>
        {/* Variation of Modal.Footer */}
        <div className="flex items-center space-x-2 rounded-b border-gray-200 pt-2 dark:border-gray-600">
          <Button onClick={accept} disabled={!orgName}>
            <FormattedMessage id="create-organization" />
          </Button>
          <Button color="gray" onClick={onClose}>
            <FormattedMessage id="cancel" />
          </Button>
        </div>
      </>
    );
  };

  const ImportByOrgUidLayoutBody: React.FC = () => {
    const [orgUid, setOrgUid] = useState<string>('');
    const [orgUidChanged, setOrgUidChanged] = useState<boolean>(true);

    const handleOrgUidChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrgUidChanged(true);
      setOrgUid(event.target.value);
    };

    const accept = async () => {
      setOrgUidChanged(false);

      if (!orgUid) {
        return;
      }

      onClose();
      setOrgCreationPending(true);
    };

    return (
      <>
        <div className="mt-4 mb-4">
          {!orgUidChanged && !orgUid && <p>todo error</p>}
          <FloatingLabel
            variant="outlined"
            label={intl.formatMessage({ id: 'organization-orguid' })}
            onChange={handleOrgUidChanged}
            value={orgUid}
          />
        </div>
        {/* Variation of Modal.Footer */}
        <div className="flex items-center space-x-2 rounded-b border-gray-200 pt-2 dark:border-gray-600">
          <Button onClick={accept} disabled={!orgUid}>
            <FormattedMessage id="create-organization" />
          </Button>
          <Button color="gray" onClick={onClose}>
            <FormattedMessage id="cancel" />
          </Button>
        </div>
      </>
    );
  };

  if (orgCreationPending) {
    return (
      <Modal show={true} onClose={onClose} size={'3xl'}>
        <Modal.Header>
          <FormattedMessage id="create-organization" />
        </Modal.Header>
        <Modal.Body>
          <Card>
            <div className={'flex justify-center align-middle'}>
              <FormattedMessage id="organization-creation-is-already-pending" />
              <Spinner className="ml-3" />
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={onClose} size={'3xl'}>
      <Modal.Header>
        <FormattedMessage id="create-organization" />
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          <Tabs.Item title={<FormattedMessage id="add-details" />}>
            <CreateOrgLayoutBody />
          </Tabs.Item>
          <Tabs.Item title={<FormattedMessage id="import-by-id" />}>
            <ImportByOrgUidLayoutBody />
          </Tabs.Item>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { CreateOrganizationModal };
