import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';

import {
  TabPanel,
  Modal,
  Message,
  modalTypeEnum,
  EstimationsRepeater,
  RatingsRepeater,
  ProjectDetailsForm,
  StyledFormContainer,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import LocationsRepeater from './LocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';

import {
  labelsSchema,
  issuancesSchema,
  coBenefitsSchema,
  relatedProjectsSchema,
  locationsSchema,
  estimationsSchema,
  ratingsSchema,
  projectSchema,
} from '../../store/validations';

const CreateProjectForm = withRouter(({ onClose, modalSizeAndPosition }) => {
  const [newLabels, setNewLabels] = useState([]);
  const [newRelatedProjects, setNewRelatedProjects] = useState([]);
  const [newIssuance, setNewIssuance] = useState([]);
  const [newProjectLocations, setNewProjectLocations] = useState([]);
  const [newCoBenefits, setNewCoBenefits] = useState([]);
  const [estimationsState, setEstimationsState] = useState([]);
  const [ratingsState, setRatingsState] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);

  const [newProject, setNewProject] = useState({
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
    projectStatusDate: '',
    validationDate: '',
  });

  const stepperStepsTranslationIds = [
    'project',
    'labels',
    'issuances',
    'co-benefits',
    'project-locations',
    'related-projects',
    'estimations',
    'ratings',
  ];

  const switchToNextTabIfDataIsValid = async (data, schema) => {
    const isValid = await schema.isValid(data);
    if (isValid) {
      if (stepperStepsTranslationIds[tabValue] === 'ratings') {
        handleSubmit();
      } else {
        setTabValue(tabValue + 1);
      }
    }
  };

  const onNextButtonPress = async () => {
    switch (stepperStepsTranslationIds[tabValue]) {
      case 'project':
        switchToNextTabIfDataIsValid(newProject, projectSchema);
        break;
      case 'labels':
        switchToNextTabIfDataIsValid(newLabels, labelsSchema);
        break;
      case 'issuances':
        switchToNextTabIfDataIsValid(newIssuance, issuancesSchema);
        break;
      case 'co-benefits':
        switchToNextTabIfDataIsValid(newCoBenefits, coBenefitsSchema);
        break;
      case 'project-locations':
        switchToNextTabIfDataIsValid(newProjectLocations, locationsSchema);
        break;
      case 'related-projects':
        switchToNextTabIfDataIsValid(newRelatedProjects, relatedProjectsSchema);
        break;
      case 'estimations':
        switchToNextTabIfDataIsValid(estimationsState, estimationsSchema);
        break;
      case 'ratings':
        switchToNextTabIfDataIsValid(ratingsState, ratingsSchema);
        break;
    }
  };

  const handleSubmit = async () => {
    const dataToSend = _.cloneDeep(newProject);

    Object.keys(dataToSend).forEach(el => {
      if (!dataToSend[el]) {
        delete dataToSend[el];
      }
    });

    if (!_.isEmpty(newLabels)) {
      dataToSend.labels = newLabels;
    }

    if (!_.isEmpty(newIssuance)) {
      dataToSend.issuances = newIssuance;
    }

    if (!_.isEmpty(newCoBenefits)) {
      dataToSend.coBenefits = newCoBenefits;
    }

    if (!_.isEmpty(newProjectLocations)) {
      dataToSend.projectLocations = newProjectLocations;
    }

    if (!_.isEmpty(newRelatedProjects)) {
      dataToSend.relatedProjects = newRelatedProjects;
    }

    if (!_.isEmpty(estimationsState)) {
      dataToSend.estimations = estimationsState;
    }

    if (!_.isEmpty(ratingsState)) {
      dataToSend.projectRatings = ratingsState;
    }

    const projectIsValid = await projectSchema.isValid(dataToSend);

    if (projectIsValid) {
      dispatch(postNewProject(dataToSend));
    }
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
      {notification && !projectWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        modalSizeAndPosition={modalSizeAndPosition}
        onOk={onNextButtonPress}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'create-project',
        })}
        label={intl.formatMessage({
          id: tabValue < 7 ? 'next' : 'create',
        })}
        extraButtonLabel={tabValue > 0 ? 'Back' : undefined}
        extraButtonOnClick={() =>
          setTabValue(prev => (prev > 0 ? prev - 1 : prev))
        }
        body={
          <StyledFormContainer>
            <Stepper activeStep={tabValue} alternativeLabel>
              {stepperStepsTranslationIds &&
                stepperStepsTranslationIds.map((stepTranslationId, index) => (
                  <Step
                    key={index}
                    onClick={() => setTabValue(index)}
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
                  projectDetails={newProject}
                  setProjectDetails={setNewProject}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <LabelsRepeater
                  labelsState={newLabels}
                  newLabelsState={setNewLabels}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <IssuanceRepeater
                  issuanceState={newIssuance}
                  newIssuanceState={setNewIssuance}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <CoBenefitsRepeater
                  coBenefitsState={newCoBenefits}
                  setNewCoBenefitsState={setNewCoBenefits}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <LocationsRepeater
                  locationsState={newProjectLocations}
                  setLocationsState={setNewProjectLocations}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <RelatedProjectsRepeater
                  relatedProjectsState={newRelatedProjects}
                  setRelatedProjectsState={setNewRelatedProjects}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
                <EstimationsRepeater
                  estimationsState={estimationsState}
                  setEstimationsState={setEstimationsState}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={7}>
                <RatingsRepeater
                  ratingsState={ratingsState}
                  setRatingsState={setRatingsState}
                />
              </TabPanel>
            </div>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateProjectForm };
