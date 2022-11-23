import _ from 'lodash';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Step, StepLabel } from '@mui/material';
import { useIntl } from 'react-intl';
import { Formik, setNestedObjectValues } from 'formik';

import {
  Stepper,
  TabPanel,
  Modal,
  modalTypeEnum,
  ProjectDetailsForm,
  StyledFormContainer,
  FormikRepeater,
  ProjectIssuanceForm,
  ProjectLocationForm,
  ProjectEstimationForm,
  ProjectLabelForm,
  ProjectRatingForm,
  ProjectCoBenefitForm,
  ProjectRelatedProjectForm,
} from '..';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { projectSchema } from '../../store/validations';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';

export const emptyRating = {
  ratingType: '',
  ratingRangeHighest: '',
  ratingRangeLowest: '',
  rating: '',
  ratingLink: '',
};

export const emptyRelatedProject = {
  relatedProjectId: '',
  relationshipType: '',
  registry: '',
};

export const emptyLabel = {
  label: '',
  labelType: '',
  creditingPeriodStartDate: '',
  creditingPeriodEndDate: '',
  validityPeriodStartDate: '',
  validityPeriodEndDate: '',
  unitQuantity: 0,
  labelLink: '',
};

export const emptyLocation = {
  country: '',
  inCountryRegion: '',
  geographicIdentifier: '',
};

export const emptyEstimation = {
  creditingPeriodStart: '',
  creditingPeriodEnd: '',
  unitCount: 0,
};

export const emptyCobenefit = {
  cobenefit: '',
};

export const emptyProject = {
  currentRegistry: '',
  registryOfOrigin: '',
  originProjectId: '',
  program: '',
  projectId: '',
  projectName: '',
  projectLink: '',
  projectDeveloper: '',
  description: '',
  sector: '',
  projectType: '',
  coveredByNDC: '',
  ndcInformation: '',
  projectStatus: '',
  unitMetric: '',
  methodology: '',
  projectTags: '',
  validationBody: '',
  projectStatusDate: null,
  validationDate: null,
};

export const emptyIssuance = {
  startDate: '',
  endDate: '',
  verificationApproach: '',
  verificationReportDate: '',
  verificationBody: '',
};

const ProjectCreateModal = ({ onClose, modalSizeAndPosition }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);

  const stepperStepsTranslationIds = useMemo(
    () => [
      'project',
      'issuances',
      'project-locations',
      'estimations',
      'labels',
      'ratings',
      'co-benefits',
      'related-projects',
    ],
    [],
  );

  const onChangeStepTo = useCallback(
    async ({ formik, desiredStep = null }) => {
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
    },
    [setTabValue, apiResponseIsPending],
  );

  // if project was successfully created, close modal
  const projectWasSuccessfullyCreated =
    notification?.id === 'project-successfully-created';
  useEffect(() => {
    if (projectWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <Formik
      validationSchema={projectSchema}
      initialValues={emptyProject}
      onSubmit={values => {
        const dataToSend = _.cloneDeep(values);
        cleanObjectFromEmptyFieldsOrArrays(dataToSend);
        dispatch(postNewProject(dataToSend));
      }}
    >
      {formik => (
        <Modal
          modalSizeAndPosition={modalSizeAndPosition}
          onOk={() => onChangeStepTo({ formik, desiredStep: tabValue + 1 })}
          onClose={onClose}
          modalType={modalTypeEnum.basic}
          title={intl.formatMessage({
            id: 'create-project',
          })}
          label={intl.formatMessage({
            id: tabValue < 7 ? 'next' : 'create-project',
          })}
          extraButtonLabel={tabValue > 0 ? 'Back' : undefined}
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

export { ProjectCreateModal };
