import { Card, CreateOrganizationForm, Modal, Spinner, Tabs } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCreateOrganizationMutation, useImportOrganizationMutation } from '@/api';
import { ImportOrganizationForm } from '@/components/blocks/forms/ImportOrganizationForm';
import React, { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface CreateOrganizationModalProps {
  orgCreationPending: boolean;
  onClose: () => void; // onClose prop for closing the modal
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  orgCreationPending,
  onClose,
}: CreateOrganizationModalProps) => {
  const [showCreateOrgError, setShowCreateOrgError] = useState<boolean>(false);

  const [triggerCreateOrganization, { error: createOrgError }] = useCreateOrganizationMutation();
  const [triggerImportOrganization, { error: importOrgError }] = useImportOrganizationMutation();

  const handleSubmitCreateOrg = async (orgName: string) => {
    const createOrgResult: any = await triggerCreateOrganization(orgName);
    if (createOrgResult?.data.orgId) {
      onClose();
    } else {
      setShowCreateOrgError(true);
    }
  };

  const handleSubmitImportOrg = async (orgName: string) => {
    const createOrgResult: any = await triggerImportOrganization({ orgUid: orgName });
    if (createOrgResult?.data.orgId) {
      onClose();
    } else {
      setShowCreateOrgError(true);
    }
  };

  useEffect(() => {
    setShowCreateOrgError(Boolean(createOrgError || importOrgError));
  }, [createOrgError, importOrgError]);

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
        {showCreateOrgError && (
          <Alert color="failure" icon={HiInformationCircle} className="mb-3">
            <span className="font-medium">
              <FormattedMessage id="error" />!
            </span>{' '}
            <FormattedMessage id="unable-to-create-organization" />
          </Alert>
        )}

        <Tabs>
          <Tabs.Item title={<FormattedMessage id="add-details" />}>
            <CreateOrganizationForm onSubmit={handleSubmitCreateOrg} />
          </Tabs.Item>
          <Tabs.Item title={<FormattedMessage id="import-by-id" />}>
            <ImportOrganizationForm onSubmit={handleSubmitImportOrg} />
          </Tabs.Item>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { CreateOrganizationModal };
