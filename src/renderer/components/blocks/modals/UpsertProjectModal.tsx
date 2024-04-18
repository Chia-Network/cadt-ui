import React, { useMemo, useState } from 'react';
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
} from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetPickListsQuery, useGetProjectQuery } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
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
  const [, createProjectModalActive] = useWildCardUrlHash('create-project');
  const [projectUpsertFragment] = useWildCardUrlHash('edit-project');
  const warehouseProjectId = projectUpsertFragment.replace('edit-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();

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
  }, []);

  const [activeStep, setActiveStep] = useState(UpsertProjectTabs.PROJECT);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          // @ts-ignore
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <ModalHeader />
      <Modal.Body>
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="mt-4">
          {/* TODO this call to handlecomplete is just a placeholder and does nothing useful, will probably break */}
          {activeStep === UpsertProjectTabs.PROJECT && (
            <ProjectForm data={projectData} onSubmit={async () => handleComplete} />
          )}
          {activeStep === UpsertProjectTabs.ISSUANCES && (
            <IssuanceForm data={[]} onSubmit={() => new Promise(() => {})} picklistOptions={pickListData} />
          )}
          {activeStep === UpsertProjectTabs.PROJECT_LOCATIONS && (
            <ProjectLocationForm data={projectData?.projectLocations} onSubmit={() => new Promise(() => {})} />
          )}
          {activeStep === UpsertProjectTabs.ESTIMATIONS && (
            <EstimationForm data={projectData?.estimations} onSubmit={() => new Promise(() => {})} />
          )}
          {activeStep === UpsertProjectTabs.LABELS && (
            <LabelForm data={projectData?.labels} onSubmit={() => new Promise(() => {})} />
          )}
          {activeStep === UpsertProjectTabs.RATINGS && (
            <RatingForm data={projectData?.projectRatings} onSubmit={() => new Promise(() => {})} />
          )}
          {activeStep === UpsertProjectTabs.CO_BENEFITS && (
            <CoBenefitForm data={projectData?.coBenefits} onSubmit={() => new Promise(() => {})} />
          )}
          {activeStep === UpsertProjectTabs.RELATED_PROJECTS && (
            <RelatedProjectForm data={projectData?.relatedProjects} onSubmit={() => new Promise(() => {})} />
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
