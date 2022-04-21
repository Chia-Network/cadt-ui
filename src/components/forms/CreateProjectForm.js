import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';

import {
  TabPanel,
  Modal,
  modalTypeEnum,
  EstimationsRepeater,
  RatingsRepeater,
  ProjectDetailsForm,
  StyledFormContainer,
} from '..';
import ProjectLabelsRepeater from './ProjectLabelsRepeater';
import ProjectIssuancesRepeater from './ProjectIssuancesRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import LocationsRepeater from './LocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';

import { projectSchema } from '../../store/validations';
import { setValidateForm, setForm } from '../../store/actions/app';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';

const CreateProjectForm = ({ onClose, modalSizeAndPosition }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);

  const [project, setProject] = useState({
    currentRegistry: '',
    registryOfOrigin: '',
    originProjectId: '',
    program: '',
    projectId: '',
    projectName: '',
    projectLink: '',
    projectDeveloper: '',
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
  });

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
    dispatch(postNewProject(dataToSend));
  };

  const projectWasSuccessfullyCreated =
    notification?.id === 'project-successfully-created';
  useEffect(() => {
    if (projectWasSuccessfullyCreated) {
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
          id: 'create-project',
        })}
        label={intl.formatMessage({
          id: tabValue < 7 ? 'next' : 'create-project',
        })}
        extraButtonLabel={tabValue > 0 ? 'Back' : undefined}
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

export { CreateProjectForm };
