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
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';

const CreateProjectForm = withRouter(({ onClose, modalSizeAndPosition }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);

  const [project, setProject] = useState({
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
        switchToNextTabIfDataIsValid(project, projectSchema);
        break;
      case 'labels':
        switchToNextTabIfDataIsValid(project.labels, labelsSchema);
        break;
      case 'issuances':
        switchToNextTabIfDataIsValid(project.issuances, issuancesSchema);
        break;
      case 'co-benefits':
        switchToNextTabIfDataIsValid(project.coBenefits, coBenefitsSchema);
        break;
      case 'project-locations':
        switchToNextTabIfDataIsValid(project.projectLocations, locationsSchema);
        break;
      case 'related-projects':
        switchToNextTabIfDataIsValid(
          project.relatedProjects,
          relatedProjectsSchema,
        );
        break;
      case 'estimations':
        switchToNextTabIfDataIsValid(project.estimations, estimationsSchema);
        break;
      case 'ratings':
        switchToNextTabIfDataIsValid(project.projectRatings, ratingsSchema);
        break;
    }
  };

  const handleSubmit = async () => {
    const dataToSend = _.cloneDeep(project);
    cleanObjectFromEmptyFieldsOrArrays(dataToSend);
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
                  projectDetails={project}
                  setProjectDetails={setProject}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <LabelsRepeater
                  labelsState={project?.labels ?? []}
                  newLabelsState={value =>
                    setProject(prev => ({
                      ...prev,
                      labels: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <IssuanceRepeater
                  issuanceState={project?.issuances ?? []}
                  newIssuanceState={value =>
                    setProject(prev => ({
                      ...prev,
                      issuances: value,
                    }))
                  }
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
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
              <TabPanel value={tabValue} index={4}>
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
              <TabPanel value={tabValue} index={5}>
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
              <TabPanel value={tabValue} index={6}>
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
              <TabPanel value={tabValue} index={7}>
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
            </div>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateProjectForm };
