import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import {
  Modal,
  TabPanel,
  EstimationsRepeater,
  RatingsRepeater,
  modalTypeEnum,
  StyledFormContainer,
} from '..';
import ProjectLabelsRepeater from './ProjectLabelsRepeater';
import ProjectIssuancesRepeater from './ProjectIssuancesRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import LocationsRepeater from './LocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { updateProjectRecord } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';
import { ProjectDetailsForm } from '.';

import { projectSchema } from '../../store/validations';
import { setValidateForm, setForm } from '../../store/actions/app';
import {
  formatAPIData,
  cleanObjectFromEmptyFieldsOrArrays,
} from '../../utils/formatData';

const EditProjectsForm = ({
  onClose,
  record,
  modalSizeAndPosition = { modalSizeAndPosition },
}) => {
  const projectToBeEdited = useSelector(
    state =>
      state.climateWarehouse.projects.filter(
        project => project.warehouseProjectId === record.warehouseProjectId,
      )[0],
  );
  const [project, setProject] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);

  useEffect(() => {
    const formattedProjectData = formatAPIData(projectToBeEdited);
    setProject(formattedProjectData);
  }, [projectToBeEdited]);

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

  useEffect(() => {
    dispatch(setForm(stepperStepsTranslationIds[tabValue]));
  }, [tabValue]);

  const onChangeStep = async (desiredStep = null) => {
    const isValid = await projectSchema.isValid(project);
    dispatch(setValidateForm(true));
    if (isValid) {
      dispatch(setValidateForm(false));
      if (
        desiredStep >= stepperStepsTranslationIds.length &&
        !apiResponseIsPending
      ) {
        handleSubmitProject();
      } else {
        setTabValue(desiredStep);
      }
    }
  };

  const handleSubmitProject = async () => {
    const dataToSend = _.cloneDeep(project);
    cleanObjectFromEmptyFieldsOrArrays(dataToSend);
    dispatch(updateProjectRecord(dataToSend));
  };

  const projectWasSuccessfullyEdited =
    notification?.id === 'project-successfully-edited';
  useEffect(() => {
    if (projectWasSuccessfullyEdited) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      <Modal
        modalSizeAndPosition={modalSizeAndPosition}
        onOk={() => onChangeStep(tabValue + 1)}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'edit-project',
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
          onChangeStep(tabValue > 0 ? tabValue - 1 : tabValue)
        }
        body={
          <StyledFormContainer>
            <Stepper activeStep={tabValue} alternativeLabel>
              {stepperStepsTranslationIds &&
                stepperStepsTranslationIds.map((stepTranslationId, index) => (
                  <Step
                    key={index}
                    onClick={() => onChangeStep(index)}
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
                <ProjectDetailsForm
                  projectDetails={project}
                  setProjectDetails={setProject}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <ProjectIssuancesRepeater
                  issuanceState={project?.issuances ?? []}
                  newIssuanceState={value =>
                    setProject(prev => ({
                      ...prev,
                      issuances: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <LocationsRepeater
                  locationsState={project?.projectLocations ?? []}
                  setLocationsState={value =>
                    setProject(prev => ({
                      ...prev,
                      projectLocations: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <EstimationsRepeater
                  estimationsState={project?.estimations ?? []}
                  setEstimationsState={value =>
                    setProject(prev => ({
                      ...prev,
                      estimations: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <ProjectLabelsRepeater
                  labelsState={project?.labels ?? []}
                  newLabelsState={value =>
                    setProject(prev => ({
                      ...prev,
                      labels: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <RatingsRepeater
                  ratingsState={project?.projectRatings ?? []}
                  setRatingsState={value =>
                    setProject(prev => ({
                      ...prev,
                      projectRatings: value,
                    }))
                  }
                />
              </TabPanel>

              <TabPanel value={tabValue} index={6}>
                <CoBenefitsRepeater
                  coBenefitsState={project?.coBenefits ?? []}
                  setNewCoBenefitsState={value =>
                    setProject(prev => ({
                      ...prev,
                      coBenefits: value,
                    }))
                  }
                />
              </TabPanel>

              <TabPanel value={tabValue} index={7}>
                <RelatedProjectsRepeater
                  relatedProjectsState={project?.relatedProjects ?? []}
                  setRelatedProjectsState={value =>
                    setProject(prev => ({
                      ...prev,
                      relatedProjects: value,
                    }))
                  }
                />
              </TabPanel>
            </div>
          </StyledFormContainer>
        }
      />
    </>
  );
};

export { EditProjectsForm };
