import { isEmpty } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import {
  Button,
  CoBenefitsForm,
  CoBenefitsFormRef,
  ComponentCenteredSpinner,
  EstimationsForm,
  EstimationsFormRef,
  IssuancesForm,
  IssuancesFormRef,
  LabelsForm,
  LabelsFormRef,
  Modal,
  ProjectForm,
  ProjectFormRef,
  ProjectLocationsForm,
  ProjectLocationsFormRef,
  RatingsForm,
  RatingsFormRef,
  RelatedProjectsForm,
  RelatedProjectsFormRef,
  Spacer,
} from '@/components';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';
import {
  useGetPickListsQuery,
  useGetProjectQuery,
  useStageCreateProjectMutation,
  useStageUpdateProjectMutation,
} from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Project } from '@/schemas/Project.schema';
import { Alert } from 'flowbite-react';

// unfortunate  use of material UI here but dont have an altenative for stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';

enum UpsertProjectTabs {
  PROJECT,
  ISSUANCES,
  PROJECT_LOCATIONS,
  ESTIMATIONS,
  LABELS,
  RATINGS,
  CO_BENEFITS,
  RELATED_PROJECTS,
}

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertProjectModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const intl: IntlShape = useIntl();
  const projectFormRef = useRef<ProjectFormRef>(null);
  const issuancesFormRef = useRef<IssuancesFormRef>(null);
  const projectLocationsFormRef = useRef<ProjectLocationsFormRef>(null);
  const estimationsFormRef = useRef<EstimationsFormRef>(null);
  const labelsFormRef = useRef<LabelsFormRef>(null);
  const relatedProjectsFormRef = useRef<RelatedProjectsFormRef>(null);
  const ratingsFormRef = useRef<RatingsFormRef>(null);
  const cobenefitsFormRef = useRef<CoBenefitsFormRef>(null);

  const [projectFormData, setProjectFormData] = useState<Project>();
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [, createProjectModalActive] = useWildCardUrlHash('create-project');
  const [projectUpsertFragment] = useWildCardUrlHash('edit-project');
  const warehouseProjectId = projectUpsertFragment.replace('edit-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();
  const [triggerStageCreateProject, { isLoading: isProjectStaging }] = useStageCreateProjectMutation();
  // @ts-ignore
  const [triggerStageUpdateProject, { isLoading: isProjectUpdateStaging }] = useStageUpdateProjectMutation();
  const [, setProjectStagedSuccessModal] = useUrlHash('success-stage-project');

  const steps: string[] = useMemo<string[]>(() => {
    return [
      intl.formatMessage({ id: 'project' }),
      intl.formatMessage({ id: 'issuances' }),
      intl.formatMessage({ id: 'project-locations' }),
      intl.formatMessage({ id: 'estimations' }),
      intl.formatMessage({ id: 'labels' }),
      intl.formatMessage({ id: 'ratings' }),
      intl.formatMessage({ id: 'co-benefits' }),
      intl.formatMessage({ id: 'related-projects' }),
    ];
  }, [intl]);

  const [activeStep, setActiveStep] = useState(UpsertProjectTabs.PROJECT);

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const handleNext = () => {
    let currentRef;

    switch (activeStep) {
      case UpsertProjectTabs.PROJECT:
        currentRef = projectFormRef;
        break;
      case UpsertProjectTabs.ISSUANCES:
        currentRef = issuancesFormRef;
        break;
      case UpsertProjectTabs.PROJECT_LOCATIONS:
        currentRef = projectLocationsFormRef;
        break;
      case UpsertProjectTabs.ESTIMATIONS:
        currentRef = estimationsFormRef;
        break;
      case UpsertProjectTabs.LABELS:
        currentRef = labelsFormRef;
        break;
      case UpsertProjectTabs.RATINGS:
        currentRef = ratingsFormRef;
        break;
      case UpsertProjectTabs.CO_BENEFITS:
        currentRef = cobenefitsFormRef;
        break;
      case UpsertProjectTabs.RELATED_PROJECTS:
        currentRef = relatedProjectsFormRef;
        break;
      default:
        break;
    }

    currentRef.current
      ?.submitForm()
      .then(async ([errors, values]) => {
        if (!isEmpty(errors)) {
          console.error('Form submission error:', errors);
          return;
        }

        if (values) {
          console.log('values:', values);
          setProjectFormData({ ...projectFormData, ...values });
        }

        if (activeStep === UpsertProjectTabs.RELATED_PROJECTS) {
          if (projectFormData) {
            let response: any;

            if (createProjectModalActive) {
              response = await triggerStageCreateProject(projectFormData);
            } else {
              response = await triggerStageUpdateProject(projectFormData);
            }

            if (response.data) {
              setProjectStagedSuccessModal(true);
              onClose();
            } else {
              let errorMessage = `Error processing Unit: ${response.error.data.message}`;
              if (response.error.data.errors && Array.isArray(response.error.data.errors)) {
                errorMessage = `${errorMessage} - ${response.error.data.errors.join(', ')}`;
              }

              setFormSubmitError(errorMessage);
            }
          }
        } else {
          const newActiveStep = isLastStep()
            ? // @ts-ignore
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
          setActiveStep(newActiveStep);
        }
      })
      .catch((error) => {
        console.error('Form submission error:', error);
      });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createProjectModalActive ? <FormattedMessage id="create-project" /> : <FormattedMessage id="edit-project" />}
      </Modal.Header>
    );
  };

  if (projectLoading || isPickListLoading || isProjectStaging || isProjectUpdateStaging) {
    return (
      <Modal show={true} onClose={onClose}>
        <ModalHeader />
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <ModalHeader />
      <Modal.Body>
        {formSubmitError && (
          <>
            <Alert color="failure">{formSubmitError}</Alert>
            <Spacer size={15} />
          </>
        )}
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="h-screen">
          {/* TODO this call to handlecomplete is just a placeholder and does nothing useful, will probably break */}
          {activeStep === UpsertProjectTabs.PROJECT && (
            // @ts-ignore
            <ProjectForm ref={projectFormRef} data={projectFormData || projectData} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.ISSUANCES && (
            <IssuancesForm
              ref={issuancesFormRef}
              data={projectFormData?.issuances || projectData?.issuances}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.PROJECT_LOCATIONS && (
            <ProjectLocationsForm
              ref={projectLocationsFormRef}
              data={projectFormData?.projectLocations || projectData?.projectLocations}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.ESTIMATIONS && (
            <EstimationsForm ref={estimationsFormRef} data={projectFormData?.estimations || projectData?.estimations} />
          )}
          {activeStep === UpsertProjectTabs.LABELS && (
            <LabelsForm
              ref={labelsFormRef}
              data={projectFormData?.labels || projectData?.labels}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.RATINGS && (
            <RatingsForm
              ref={ratingsFormRef}
              data={projectFormData?.projectRatings || projectData?.projectRatings}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.CO_BENEFITS && (
            <CoBenefitsForm
              ref={cobenefitsFormRef}
              data={projectFormData?.coBenefits || projectData?.coBenefits}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.RELATED_PROJECTS && (
            <RelatedProjectsForm
              ref={relatedProjectsFormRef}
              data={projectFormData?.relatedProjects || projectData?.relatedProjects}
            />
          )}
          <Spacer size={15} />
          <div className="flex">
            <Button color="gray" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <div className="flex space-x-1 flex-grow justify-end">
              <Button onClick={handleNext}>
                {activeStep !== steps.length - 1 ? (
                  <FormattedMessage id="next" />
                ) : (
                  <FormattedMessage id={createProjectModalActive ? 'create-project' : 'edit-project'} />
                )}
              </Button>
            </div>
          </div>
          <Spacer size={15} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertProjectModal };
