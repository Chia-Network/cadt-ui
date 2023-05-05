import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Step, StepLabel } from '@mui/material';
import { useIntl } from 'react-intl';
import { Formik, setNestedObjectValues } from 'formik';

import {
  Stepper,
  Modal,
  TabPanel,
  modalTypeEnum,
  StyledFormContainer,
  FormikRepeater,
  ProjectDetailsForm,
  ProjectIssuanceForm,
  ProjectLocationForm,
  ProjectEstimationForm,
  ProjectLabelForm,
  ProjectRatingForm,
  ProjectCoBenefitForm,
  ProjectRelatedProjectForm,
  emptyIssuance,
  emptyCobenefit,
  emptyEstimation,
  emptyLocation,
  emptyLabel,
  emptyRelatedProject,
  emptyRating,
} from '..';
import { editStagingData } from '../../store/actions/climateWarehouseActions';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';
import { projectSchema } from '../../store/validations';

const ProjectEditStagingModal = ({
  onClose,
  changeGroup,
  modalSizeAndPosition,
}) => {
  const [project] = useState(changeGroup?.diff?.change[0] ?? null);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);

  const stepperStepsTranslationIds = [
    'project',
    'issuances',
    'project-locations',
    'estimations',
    'labels',
    'ratings',
    'co-benefits',
    'related-projects',
  ];

  const onChangeStepTo = useCallback(async ({ formik, desiredStep = null }) => {
    const errors = await formik.validateForm();

    // manually setting touched for error fields so errors are displayed
    formik.setTouched(setNestedObjectValues(errors, true));

    const isProjectValid = _.isEmpty(errors);

    if (isProjectValid) {
      if (
        desiredStep >= stepperStepsTranslationIds.length &&
        !apiResponseIsPending
      ) {
        formik.submitForm();
      } else {
        setTabValue(desiredStep);
      }
    }
  }, []);

  // if project was successfully edited, close modal
  const projectWasSuccessfullyEdited =
    notification?.id === 'staging-group-edited';
  useEffect(() => {
    if (projectWasSuccessfullyEdited) {
      onClose();
    }
  }, [notification]);

  if (!project) {
    return null;
  }

  return (
    <Formik
      validationSchema={projectSchema}
      initialValues={project}
      onSubmit={values => {
        const dataToSend = _.cloneDeep(values);
        cleanObjectFromEmptyFieldsOrArrays(dataToSend);
        dispatch(editStagingData(changeGroup.uuid, dataToSend));
      }}
    >
      {formik => (
        <Modal
          modalSizeAndPosition={modalSizeAndPosition}
          onOk={() => onChangeStepTo({ formik, desiredStep: tabValue + 1 })}
          onClose={onClose}
          modalType={modalTypeEnum.basic}
          title={intl.formatMessage({
            id: 'edit-staged-project',
          })}
          label={intl.formatMessage({
            id: tabValue < 7 ? 'next' : 'update-project',
          })}
          extraButtonLabel={
            tabValue > 0
              ? intl.formatMessage({
                  id: 'back',
                })
              : undefined
          }
          extraButtonOnClick={() =>
            onChangeStepTo({
              formik,
              desiredStep: tabValue > 0 ? tabValue - 1 : tabValue,
            })
          }
          body={
            <StyledFormContainer>
              <Stepper activeStep={tabValue} alternativeLabel>
                {stepperStepsTranslationIds &&
                  stepperStepsTranslationIds.map((stepTranslationId, index) => (
                    <Step
                      key={index}
                      onClick={() =>
                        onChangeStepTo({ formik, desiredStep: index })
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      <StepLabel>
                        {intl.formatMessage({
                          id: stepTranslationId,
                        })}
                      </StepLabel>
                    </Step>
                  ))}
              </Stepper>
              <div>
                <TabPanel
                  style={{ paddingTop: '1.25rem' }}
                  value={tabValue}
                  index={0}
                >
                  <ProjectDetailsForm />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <FormikRepeater
                    empty={emptyIssuance}
                    name="issuances"
                    tooltip={intl.formatMessage({
                      id: 'issuances-optional',
                    })}
                    min={0}
                    Component={ProjectIssuanceForm}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <FormikRepeater
                    empty={emptyLocation}
                    name="projectLocations"
                    tooltip={intl.formatMessage({
                      id: 'locations-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectLocationForm}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <FormikRepeater
                    empty={emptyEstimation}
                    name="estimations"
                    tooltip={intl.formatMessage({
                      id: 'estimations-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectEstimationForm}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                  <FormikRepeater
                    empty={emptyLabel}
                    name="labels"
                    tooltip={intl.formatMessage({
                      id: 'labels-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectLabelForm}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <FormikRepeater
                    empty={emptyRating}
                    name="projectRatings"
                    tooltip={intl.formatMessage({
                      id: 'ratings-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectRatingForm}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={6}>
                  <FormikRepeater
                    empty={emptyCobenefit}
                    name="coBenefits"
                    tooltip={intl.formatMessage({
                      id: 'cobenefits-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectCoBenefitForm}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={7}>
                  <FormikRepeater
                    empty={emptyRelatedProject}
                    name="relatedProjects"
                    tooltip={intl.formatMessage({
                      id: 'relatedprojects-optional',
                    })}
                    min={0}
                    max={100}
                    Component={ProjectRelatedProjectForm}
                  />
                </TabPanel>
              </div>
            </StyledFormContainer>
          }
        />
      )}
    </Formik>
  );
};

export { ProjectEditStagingModal };
