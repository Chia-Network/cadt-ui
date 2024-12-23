import { Card, CreateOrganizationForm, ImportOrganizationProps, Modal, Spinner, Tabs } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useCreateOrganizationMutation, useImportOrganizationMutation } from '@/api';
import { ImportOrganizationForm } from '@/components/blocks/forms/ImportOrganizationForm';
import React, { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface CreateOrganizationModalProps {
  orgCreationPending: boolean;
  orgListLoading: boolean;
  onClose: () => void; // onClose prop for closing the modal
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  orgCreationPending,
  orgListLoading,
  onClose,
}: CreateOrganizationModalProps) => {
  const [showCreateOrgError, setShowCreateOrgError] = useState<boolean>(false);

  const [triggerCreateOrganization, { error: createOrgError }] = useCreateOrganizationMutation();
  const [triggerImportOrganization, { error: importOrgError }] = useImportOrganizationMutation();

  const handleSubmitCreateOrg = async (orgName: string) => {
    const createOrgResult: any = await triggerCreateOrganization(orgName);
    if (createOrgResult?.data.success) {
      onClose();
    } else {
      setShowCreateOrgError(true);
    }
  };

  const handleSubmitImportOrg = async (importOrgFormValues: ImportOrganizationProps) => {
    const { orgUid, isHome } = importOrgFormValues;
    const createOrgResult: any = await triggerImportOrganization({ orgUid, isHome });
    if (createOrgResult?.data.success) {
      onClose();
    } else {
      setShowCreateOrgError(true);
    }
  };

  useEffect(() => {
    setShowCreateOrgError(Boolean(createOrgError || importOrgError));
  }, [createOrgError, importOrgError]);

  if (orgCreationPending || orgListLoading) {
    return (
      <Modal show={true} onClose={onClose} size={'3xl'}>
        <Modal.Header>
          <FormattedMessage id="create-organization" />
        </Modal.Header>
        <Modal.Body>
          <Card>
            <div className={'flex justify-center align-middle'}>
              {orgListLoading ? (
                <FormattedMessage id="organization-data-loading" />
              ) : (
                <FormattedMessage id="organization-creation-is-already-pending" />
              )}
              <Spinner className="ml-3" />
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={onClose} size={'2xl'}>
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
            <div className="space-y-3">
              <Alert color="info" icon={HiInformationCircle} className="mb-3">
                <FormattedMessage id="use-this-tab-to-create-a-new-organization" />
              </Alert>
              <CreateOrganizationForm onSubmit={handleSubmitCreateOrg} />
            </div>
          </Tabs.Item>
          <Tabs.Item title={<FormattedMessage id="import-by-id" />}>
            <div className="space-y-3">
              <Alert color="info" icon={HiInformationCircle} className="mb-3">
                <FormattedMessage id="use-this-tab-to-import-an-existing-organization-into-CADT-from-datalayer" />
              </Alert>
            </div>
            <ImportOrganizationForm onSubmit={handleSubmitImportOrg} />
          </Tabs.Item>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { CreateOrganizationModal };
