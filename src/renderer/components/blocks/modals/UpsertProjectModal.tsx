import { isEmpty } from 'lodash';
import React, { useMemo, useState, useRef } from 'react';
import {
  Button,
  CoBenefitForm,
  ComponentCenteredSpinner,
  EstimationForm,
  IssuanceForm,
  LabelForm,
  Modal,
  ProjectForm,
  ProjectLocationForm,
  RatingForm,
  RelatedProjectForm,
  ProjectFormRef,
  IssuanceFormRef,
  ProjectLocationFormRef,
  EstimationFormRef,
  LabelFormRef,
  RatingFormRef,
  CoBenefitFormRef,
  RelatedProjectFormRef,
} from '@/components';
import { useWildCardUrlHash, useUrlHash } from '@/hooks';
import { useGetPickListsQuery, useGetProjectQuery, useStageProjectMutation } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import { Project } from '@/schemas/Project.schema';

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
  const issuanceFormRef = useRef<IssuanceFormRef>(null);
  const projectLocationFormRef = useRef<ProjectLocationFormRef>(null);
  const estimationFormRef = useRef<EstimationFormRef>(null);
  const labelFormRef = useRef<LabelFormRef>(null);
  const relatedProjectFormRef = useRef<RelatedProjectFormRef>(null);
  const ratingFormRef = useRef<RatingFormRef>(null);
  const cobenefitFormRef = useRef<CoBenefitFormRef>(null);

  const [projectFormData, setProjectFormData] = useState<Project>();
  const [, createProjectModalActive] = useWildCardUrlHash('create-project');
  const [projectUpsertFragment] = useWildCardUrlHash('edit-project');
  const warehouseProjectId = projectUpsertFragment.replace('edit-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();
  const [triggerStageProject, { isLoading: isProjectStaging }] = useStageProjectMutation();
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

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    let currentRef;

    switch (activeStep) {
      case UpsertProjectTabs.PROJECT:
        currentRef = projectFormRef;
        break;
      case UpsertProjectTabs.ISSUANCES:
        currentRef = issuanceFormRef;
        break;
      case UpsertProjectTabs.PROJECT_LOCATIONS:
        currentRef = projectLocationFormRef;
        break;
      case UpsertProjectTabs.ESTIMATIONS:
        currentRef = estimationFormRef;
        break;
      case UpsertProjectTabs.LABELS:
        currentRef = labelFormRef;
        break;
      case UpsertProjectTabs.RATINGS:
        currentRef = ratingFormRef;
        break;
      case UpsertProjectTabs.CO_BENEFITS:
        currentRef = cobenefitFormRef;
        break;
      case UpsertProjectTabs.RELATED_PROJECTS:
        currentRef = relatedProjectFormRef;
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
          setProjectFormData({ ...projectFormData, ...values });
        }

        console.log(projectFormData, values);

        if (activeStep === UpsertProjectTabs.RELATED_PROJECTS) {
          if (projectFormData) {
            const response: any = await triggerStageProject(projectFormData);

            if (response.data) {
              setProjectStagedSuccessModal(true);
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

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createProjectModalActive ? <FormattedMessage id="create-project" /> : <FormattedMessage id="edit-project" />}
      </Modal.Header>
    );
  };

  if (projectLoading || isPickListLoading) {
    return (
      <Modal show={true} onClose={onClose}>
        <ModalHeader />
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  if (isProjectStaging) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <ComponentCenteredSpinner />
      </div>
    );
  }

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <ModalHeader />
      <Modal.Body>
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="mt-4">
          {/* TODO this call to handlecomplete is just a placeholder and does nothing useful, will probably break */}
          {activeStep === UpsertProjectTabs.PROJECT && (
            // @ts-ignore
            <ProjectForm ref={projectFormRef} data={projectFormData || projectData} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.ISSUANCES && (
            <IssuanceForm
              ref={issuanceFormRef}
              data={projectFormData?.issuances || projectData?.issuances}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.PROJECT_LOCATIONS && (
            <ProjectLocationForm
              ref={projectLocationFormRef}
              data={projectData?.projectLocations}
              picklistOptions={pickListData}
            />
          )}
          {activeStep === UpsertProjectTabs.ESTIMATIONS && (
            <EstimationForm ref={estimationFormRef} data={projectData?.estimations} />
          )}
          {activeStep === UpsertProjectTabs.LABELS && (
            <LabelForm ref={labelFormRef} data={projectData?.labels} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.RATINGS && (
            <RatingForm ref={ratingFormRef} data={projectData?.projectRatings} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.CO_BENEFITS && (
            <CoBenefitForm ref={cobenefitFormRef} data={projectData?.coBenefits} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.RELATED_PROJECTS && (
            <RelatedProjectForm ref={relatedProjectFormRef} data={projectData?.relatedProjects} />
          )}
          <p>Step {activeStep + 1}</p>
          <div className="flex">
            <Button color="gray" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <div className="flex space-x-1 flex-grow justify-end">
              <Button onClick={handleNext}>
                {activeStep !== steps.length - 1 ? (
                  <FormattedMessage id="next" />
                ) : (
                  <FormattedMessage id="create-project" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UpsertProjectModal };
