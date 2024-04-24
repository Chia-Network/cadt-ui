import { isEmpty } from 'lodash';
import React, { useRef, useMemo, useState } from 'react';
import {
  ComponentCenteredSpinner,
  Modal,
  UnitForm,
  UnitIssuanceForm,
  LabelsForm,
  UnitFormRef,
  IssuancesFormRef,
  LabelsFormRef,
  Spacer,
  Button,
} from '@/components';
import { useWildCardUrlHash, useUrlHash } from '@/hooks';
import { useGetUnitQuery, useGetPickListsQuery, useStageCreateUnitMutation } from '@/api';
import { FormattedMessage, useIntl } from 'react-intl';
import { Unit } from '@/schemas/Unit.schema';
import { Alert } from 'flowbite-react'

// unfortunate  use of material UI here but dont have an altenative for stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';

interface UpsertModalProps {
  onClose: () => void;
}

enum UpsertUnitTabs {
  UNIT,
  ISSUANCES,
  LABELS,
}

const UpsertUnitModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const intl = useIntl();
  const unitFormRef = useRef<UnitFormRef>(null);
  const issuancesFormRef = useRef<IssuancesFormRef>(null);
  const labelsFormRef = useRef<LabelsFormRef>(null);

  const [, createUnitModalActive] = useWildCardUrlHash('create-unit');
  const [unitUpsertFragment] = useWildCardUrlHash('edit-unit');
  const warehouseUnitId = unitUpsertFragment.replace('edit-unit-', '');
  const { data: pickListData, isLoading: isPickListLoading } = useGetPickListsQuery();
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery(
    { warehouseUnitId },
    {
      skip: !warehouseUnitId,
    },
  );

  const [unitFormData, setUnitFormData] = useState<Unit>();
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [triggerStageCreateUnit, { isLoading: isUnitStaging }] = useStageCreateUnitMutation();
  const [activeStep, setActiveStep] = useState(UpsertUnitTabs.UNIT);
  const [, setUnitStagedSuccessModal] = useUrlHash('success-stage-unit');

  const steps: string[] = useMemo<string[]>(() => {
    return [
      intl.formatMessage({ id: 'unit' }),
      intl.formatMessage({ id: 'issuances' }),
      intl.formatMessage({ id: 'labels' }),
    ];
  }, [intl]);

  const handleBack = () => {
    setFormSubmitError(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const handleNext = () => {
    setFormSubmitError(null);
    let currentRef;

    switch (activeStep) {
      case UpsertUnitTabs.UNIT:
        currentRef = unitFormRef;
        break;
      case UpsertUnitTabs.ISSUANCES:
        currentRef = issuancesFormRef;
        break;
      case UpsertUnitTabs.LABELS:
        currentRef = labelsFormRef;
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
          setUnitFormData({ ...unitFormData, ...values });
        }

        if (activeStep === UpsertUnitTabs.LABELS) {
          if (unitFormData) {
            const response: any = await triggerStageCreateUnit(unitFormData);

            if (response.data) {
               setUnitStagedSuccessModal(true);
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


  if (unitLoading || isPickListLoading || isUnitStaging) {
    return (
      <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
        <Modal.Header>
          {createUnitModalActive ? <FormattedMessage id="create-unit" /> : <FormattedMessage id="edit-unit" />}
        </Modal.Header>
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        {createUnitModalActive ? <FormattedMessage id="create-unit" /> : <FormattedMessage id="edit-unit" />}
      </Modal.Header>
      <Modal.Body>
        {formSubmitError && <><Alert color="failure">{formSubmitError}</Alert><Spacer size={15} /></>}
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="h-screen">
          {activeStep === UpsertUnitTabs.UNIT && <UnitForm ref={unitFormRef} data={unitFormData || unitData} picklistOptions={pickListData} />}
          {activeStep === UpsertUnitTabs.ISSUANCES && <UnitIssuanceForm ref={issuancesFormRef} data={unitFormData?.issuance || unitData?.issuance} selectedWarehouseProjectId={unitFormData?.warehouseProjectId || unitData?.warehouseProjectId} />}
          {activeStep === UpsertUnitTabs.LABELS && <LabelsForm ref={labelsFormRef} data={unitFormData?.labels || unitData?.labels} picklistOptions={pickListData} />}

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
                  <FormattedMessage id="create-project" />
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

export { UpsertUnitModal };
