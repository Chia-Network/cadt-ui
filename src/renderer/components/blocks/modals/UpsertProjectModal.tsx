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
  UnitLabelsFormRef,
} from '@/components';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';
import {
  useGetPickListsQuery,
  useGetProjectQuery,
  useStageCreateProjectMutation,
  useStageUpdateProjectMutation,
  useTransferProjectMutation,
} from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Project } from '@/schemas/Project.schema';
import { Alert } from 'flowbite-react';

// unfortunate use of material UI here but dont have an alternative for stepper
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
  const labelsFormRef = useRef<UnitLabelsFormRef>(null);
  const relatedProjectsFormRef = useRef<RelatedProjectsFormRef>(null);
  const ratingsFormRef = useRef<RatingsFormRef>(null);
  const cobenefitsFormRef = useRef<CoBenefitsFormRef>(null);

  const [projectFormData, setProjectFormData] = useState<Project>();
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(UpsertProjectTabs.PROJECT);
  const [createProjectModalActive] = useUrlHash('create-project');
  const [projectUpsertFragment, editProjectModalActive] = useWildCardUrlHash('edit-project');
  const [projectTransferFragment, transferProjectModalActive] = useWildCardUrlHash('transfer-project');
  const warehouseProjectId = editProjectModalActive
    ? projectUpsertFragment.replace('edit-project-', '')
    : projectTransferFragment.replace('transfer-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();
  const [triggerStageCreateProject, { isLoading: isProjectStaging }] = useStageCreateProjectMutation();
  // @ts-ignore
  const [triggerStageUpdateProject, { isLoading: isProjectUpdateStaging }] = useStageUpdateProjectMutation();
  const [triggerTransferProject, { isLoading: isTransferProjectLoading }] = useTransferProjectMutation();
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

  const nextButtonTitleId: string = useMemo(() => {
    if (createProjectModalActive && activeStep === steps.length - 1) {
      return 'create-project';
    } else if (editProjectModalActive && activeStep === steps.length - 1) {
      return 'edit-project';
    } else if (transferProjectModalActive && activeStep === steps.length - 1) {
      return 'create-project-transfer';
    } else {
      return 'next';
    }
  }, [activeStep, createProjectModalActive, editProjectModalActive, steps.length, transferProjectModalActive]);

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
            let response: any = {
              error: { data: { message: 'application internal state error. reload the application' } },
            };

            console.log(projectFormData);

            if (createProjectModalActive) {
              response = await triggerStageCreateProject(projectFormData);
            } else if (editProjectModalActive) {
              response = await triggerStageUpdateProject(projectFormData);
            } else if (transferProjectModalActive) {
              response = await triggerTransferProject(projectFormData);
            }

            if (response.data) {
              setProjectStagedSuccessModal(true);
              onClose();
            } else {
              let errorMessage = `Error processing project: ${response.error.data.message}`;
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
    const title: string = useMemo(() => {
      if (createProjectModalActive) {
        return 'create-project';
      } else if (editProjectModalActive) {
        return 'edit-project';
      } else if (transferProjectModalActive) {
        return 'transfer-project';
      } else {
        return '';
      }
    }, []);

    return (
      <Modal.Header>
        <FormattedMessage id={title} />
      </Modal.Header>
    );
  };

  if (projectLoading || isPickListLoading || isProjectStaging || isProjectUpdateStaging || isTransferProjectLoading) {
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
                <FormattedMessage id={nextButtonTitleId} />
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
