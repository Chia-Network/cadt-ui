import React, { useState } from 'react';
import { Button, ComponentCenteredSpinner, Modal, ProjectForm } from '@/components';
import { useWildCardUrlHash } from '@/hooks';
import { useGetProjectQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';

interface UpsertModalProps {
  onClose: () => void;
}

const UpsertProjectModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [, createProjectModalActive] = useWildCardUrlHash('create-project');
  const [projectUpsertFragment] = useWildCardUrlHash('edit-project');
  const warehouseProjectId = projectUpsertFragment.replace('edit-project-', '');
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId });

  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const [activeStep, setActiveStep] = useState(0);
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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const ModalHeader: React.FC = () => {
    return (
      <Modal.Header>
        {createProjectModalActive ? <FormattedMessage id="create-project" /> : <FormattedMessage id="edit-project" />}
      </Modal.Header>
    );
  };

  if (projectLoading) {
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
    <Modal show={true} onClose={onClose}>
      <ModalHeader />
      <Modal.Body>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <>
              <p>All steps completed - you&apos;re finished</p>
              <Button onClick={handleReset}>Reset</Button>
            </>
          ) : (
            <>
              <p>Step {activeStep + 1}</p>
              <div className="flex">
                <Button color="gray" disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <div className="flex space-x-1 flex-grow justify-end">
                  <Button onClick={handleNext}>Next</Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <p>Step {activeStep + 1} already completed</p>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                      </Button>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        <ProjectForm data={projectData} onSubmit={async () => new Promise(noop)} />
      </Modal.Body>
    </Modal>
  );
};

export { UpsertProjectModal };
