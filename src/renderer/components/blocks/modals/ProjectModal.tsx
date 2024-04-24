import React from 'react';
import {
  CoBenefitForm,
  EstimationForm,
  IssuanceForm,
  Modal,
  ProjectForm,
  ProjectLocationForm,
  RatingForm,
  RelatedProjectForm,
  Spinner,
  Tabs,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetPickListsQuery, useGetProjectQuery } from '@/api';

interface ProjectModalProps {
  warehouseProjectId: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ warehouseProjectId, onClose }: ProjectModalProps) => {
  const { data: projectData, isLoading: isProjectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id={'detailed-project-view'} />
      </Modal.Header>
      <Modal.Body>
        <div className="h-screen">
          <Tabs>
            {/* There is no per-tab deeplinking so we only need to put a spinned on the first */}
            <Tabs.Item title={<FormattedMessage id="project" />}>
              {!isProjectLoading && !isPickListLoading && projectData ? (
                <ProjectForm
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
                  readonly={true}
                  data={projectData?.projectLocations}
                  picklistOptions={pickListData}
                />
              </Tabs.Item>
            )}
            {projectData?.estimations?.length && (
              <Tabs.Item title={<FormattedMessage id="estimations" />}>
                <EstimationForm readonly={true} data={projectData?.estimations} />
              </Tabs.Item>
            )}
            {projectData?.coBenefits?.length && (
              <Tabs.Item title={<FormattedMessage id="co-benefits" />}>
                <CoBenefitForm
                  readonly={true}
                  data={projectData?.coBenefits}
                  picklistOptions={pickListData}
                />
              </Tabs.Item>
            )}
            {projectData?.relatedProjects?.length && (
              <Tabs.Item title={<FormattedMessage id="related-projects" />}>
                <RelatedProjectForm
                  readonly={true}
                  data={projectData?.relatedProjects}
                />
              </Tabs.Item>
            )}
            {(projectData?.projectRatings?.length || projectData?.labels?.length) && (
              <Tabs.Item title={<FormattedMessage id="ratings" />}>
                <RatingForm
                  readonly={true}
                  data={projectData?.projectRatings}
                  picklistOptions={pickListData}
                />
              </Tabs.Item>
            )}
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { ProjectModal };
