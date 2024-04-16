import React from 'react';
import {
  Modal,
  Tabs,
  ProjectForm,
  IssuanceForm,
  ProjectLocationForm,
  EstimationForm,
  CoBenefitForm,
  RelatedProjectForm,
  RatingForm,
  Spinner,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetProjectQuery, useGetPickListsQuery } from '@/api';

interface ProjectModalProps {
  warehouseProjectId: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ warehouseProjectId, onClose }: ProjectModalProps) => {
  const { data: projectData, isLoading: isProjectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

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
            {!isProjectLoading && !isPickListLoading && projectData ? (
              <ProjectForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData}
                picklistOptions={pickListData}
              />
            ) : (
              <Spinner size="xl" />
            )}
          </Tabs.Item>
          {projectData?.issuances?.length && (
            <Tabs.Item title={<FormattedMessage id="issuance" />}>
              <IssuanceForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData?.issuances}
                showUnits={true}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
          {projectData?.projectLocations?.length && (
            <Tabs.Item title={<FormattedMessage id="project-locations" />}>
              <ProjectLocationForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData?.projectLocations}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
          {projectData?.estimations?.length && (
            <Tabs.Item title={<FormattedMessage id="estimations" />}>
              <EstimationForm onSubmit={handleProjectFormSubmit} readonly={true} data={projectData?.estimations} />
            </Tabs.Item>
          )}
          {projectData?.coBenefits?.length && (
            <Tabs.Item title={<FormattedMessage id="co-benefits" />}>
              <CoBenefitForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData?.coBenefits}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
          {projectData?.relatedProjects?.length && (
            <Tabs.Item title={<FormattedMessage id="related-projects" />}>
              <RelatedProjectForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData?.relatedProjects}
              />
            </Tabs.Item>
          )}
          {(projectData?.projectRatings?.length || projectData?.labels?.length) && (
            <Tabs.Item title={<FormattedMessage id="ratings" />}>
              <RatingForm
                onSubmit={handleProjectFormSubmit}
                readonly={true}
                data={projectData?.projectRatings}
                picklistOptions={pickListData}
              />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export { ProjectModal };
