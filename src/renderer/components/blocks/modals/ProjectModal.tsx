import React from 'react';
import { Modal, Tabs, ProjectForm, IssuanceForm, ProjectLocationForm, EstimationsForm, Spinner } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetProjectQuery } from '@/api';

interface ProjectModalProps {
  warehouseProjectId: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ warehouseProjectId, onClose }: ProjectModalProps) => {
  const { data, isLoading } = useGetProjectQuery({ warehouseProjectId });

  const handleProjectFormSubmit = async () => {
    return Promise.resolve();
  };

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'detailed-project-view'} />
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          {/* There is no per-tab deeplinking so we only need to put a spinned on the first */}
          <Tabs.Item title={<FormattedMessage id="project" />}>
            {!isLoading && data ? (
              <ProjectForm onSubmit={handleProjectFormSubmit} readonly={true} data={data} />
            ) : (
              <Spinner size="xl" />
            )}
          </Tabs.Item>
          {data?.issuances?.length && (
            <Tabs.Item title={<FormattedMessage id="issuance" />}>
              <IssuanceForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={data?.issuances}
                showUnits={true}
              />
            </Tabs.Item>
          )}
          {data?.projectLocations?.length && (
            <Tabs.Item title={<FormattedMessage id="project-locations" />}>
              <ProjectLocationForm onSubmit={handleProjectFormSubmit} readonly={true} data={data?.projectLocations} />
            </Tabs.Item>
          )}
          {data?.estimations?.length && (
            <Tabs.Item title={<FormattedMessage id="estimations" />}>
              <EstimationsForm onSubmit={handleProjectFormSubmit} readonly={true} data={data?.estimations} />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { ProjectModal };
