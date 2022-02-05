import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  TabPanel,
  Modal,
  Body,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  DateSelect,
  Message,
  ToolTipContainer,
  DescriptionIcon,
  modalTypeEnum,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import LocationsRepeater from './LocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';
import { LabelContainer } from '../../utils/compUtils';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const CreateProjectForm = withRouter(
  ({ onClose, left, top, width, height }) => {
    const [newQualifications, setNewQualifications] = useState([]);
    const [newRelatedProjects, setNewRelatedProjects] = useState([]);
    const [newVintage, setNewVintage] = useState([]);
    const [date, setDate] = useState();
    const [validationDate, setValidationDate] = useState();
    const [newProjectLocations, setNewProjectLocations] = useState([]);
    const [newCoBenefits, setNewCoBenefits] = useState([]);
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
      coveredByNDC: 0,
      NDCLinkage: '',
      projectStatus: '',
      unitMetric: '',
      methodology: '',
      methodologyVersion: 0,
      validationApproach: '',
      estimatedAnnualAverageEmissionReduction: 60,
      projectTag: '',
    });
    const handleSubmit = () => {
      if (tabValue === 5) {
        const dataToSend = _.cloneDeep(newProject);

        if (!_.isEmpty(newVintage)) {
          dataToSend.vintages = newVintage;
        }

        if (!_.isEmpty(newCoBenefits)) {
          dataToSend.coBenefits = newCoBenefits;
        }

        if (!_.isEmpty(newQualifications)) {
          dataToSend.qualifications = newQualifications;
        }

        if (!_.isEmpty(date)) {
          dataToSend.projectStatusDate = `${date.$M + 1}/${date.$D}/${date.$y}`;
        }

        if (!_.isEmpty(validationDate)) {
          dataToSend.validationDate = `${validationDate.$M + 1}/${
            validationDate.$D
          }/${validationDate.$y}`;
        }

        if (!_.isEmpty(newProjectLocations)) {
          dataToSend.projectLocations = newProjectLocations;
        }

        if (!_.isEmpty(newRelatedProjects)) {
          dataToSend.relatedProjects = newRelatedProjects;
        }

        dispatch(postNewProject(dataToSend));
      } else {
        setTabValue(prev => prev + 1);
      }
    };

    const projectWasSuccessfullyCreated =
      notification && notification.id === 'project-successfully-created';
    useEffect(() => {
      if (projectWasSuccessfullyCreated) {
        onClose();
      }
    }, [notification]);

    const stepperStepsTranslationIds = [
      'project',
      'labels',
      'issuances',
      'co-benefits',
      'project-locations',
      'related-projects',
    ];

    return (
      <>
        {notification && !projectWasSuccessfullyCreated && (
          <Message id={notification.id} type={notification.type} />
        )}
        <Modal
          left={left}
          top={top}
          width={width}
          height={height}
          onOk={handleSubmit}
          onClose={onClose}
          modalType={modalTypeEnum.basic}
          title={intl.formatMessage({
            id: 'create-project',
          })}
          label={intl.formatMessage({
            id: tabValue < 5 ? 'next' : 'create',
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
                  <ModalFormContainerStyle>
                    <FormContainerStyle>
                      <BodyContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="registry-of-origin" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-registry-of-origin-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'registry-of-origin',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.registryOfOrigin}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  registryOfOrigin: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="origin-project-id" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-origin-project-id-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'origin-project-id',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.originProjectId}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  originProjectId: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="program" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-program-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'program',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.program}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  program: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-id" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-id-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-id',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.projectId}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                projectId: value,
                              }))
                            }
                          />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-name" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-name-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'project-name',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.projectName}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  projectName: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-link" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-link-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'project-link',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.projectLink}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  projectLink: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-developer" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-developer-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'project-developer',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.projectDeveloper}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  projectDeveloper: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="sector" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-sector-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'sector',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.sector}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  sector: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-type" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-type-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-type',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.projectType}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                projectType: value,
                              }))
                            }
                          />
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="covered-by-ndc" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-covered-by-ndc-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'covered-by-ndc',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.coveredByNDC}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  coveredByNDC: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                      </BodyContainer>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="ndc-linkage" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-ndc-linkage-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'ndc-linkage',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.NDCLinkage}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  NDCLinkage: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-status" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-status-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'project-status',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.projectStatus}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  projectStatus: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="project-status-date" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-status-date-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <DateSelect
                              size="large"
                              dateValue={date}
                              setDateValue={setDate}
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="unit-metric" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-unit-metric-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'unit-metric',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.unitMetric}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  unitMetric: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body color={'#262626'}>
                              <LabelContainer>
                                <FormattedMessage id="methodology" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-methodology-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'methodology',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.methodology}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  methodology: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body color={'#262626'}>
                              <LabelContainer>
                                <FormattedMessage id="methodology-version" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-methodology-version-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'methodology-version',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.methodologyVersion}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  methodologyVersion: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body color={'#262626'}>
                              <LabelContainer>
                                <FormattedMessage id="validation-approach" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-validation-approach-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'validation-approach',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.validationApproach}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  validationApproach: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body style={{ color: '#262626' }}>
                              <LabelContainer>
                                <FormattedMessage id="validation-date" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-validation-date-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <DateSelect
                              size="large"
                              dateValue={validationDate}
                              setDateValue={setValidationDate}
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body color={'#262626'}>
                              <LabelContainer>
                                <FormattedMessage id="estimated-annual-average-emission-reduction" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-estimated-annual-average-emission-reduction-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'estimated-annual-average-emission-reduction',
                              })}
                              state={InputStateEnum.default}
                              value={
                                newProject.estimatedAnnualAverageEmissionReduction
                              }
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  estimatedAnnualAverageEmissionReduction:
                                    value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                        <StyledFieldContainer>
                          <StyledLabelContainer>
                            <Body color={'#262626'}>
                              <LabelContainer>
                                <FormattedMessage id="project-tag" />
                              </LabelContainer>
                              <ToolTipContainer
                                tooltip={intl.formatMessage({
                                  id: 'projects-project-tags-description',
                                })}
                              >
                                <DescriptionIcon height="14" width="14" />
                              </ToolTipContainer>
                            </Body>
                          </StyledLabelContainer>
                          <InputContainer>
                            <StandardInput
                              size={InputSizeEnum.large}
                              placeholderText={intl.formatMessage({
                                id: 'project-tag',
                              })}
                              state={InputStateEnum.default}
                              value={newProject.projectTag}
                              onChange={value =>
                                setNewProject(prev => ({
                                  ...prev,
                                  projectTag: value,
                                }))
                              }
                            />
                          </InputContainer>
                        </StyledFieldContainer>
                      </div>
                    </FormContainerStyle>
                  </ModalFormContainerStyle>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <IssuanceRepeater
                    qualificationsState={newQualifications}
                    newQualificationsState={setNewQualifications}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <LabelsRepeater
                    vintageState={newVintage}
                    newVintageState={setNewVintage}
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
                    projectLocationsState={newProjectLocations}
                    setProjectLocationsState={setNewProjectLocations}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <RelatedProjectsRepeater
                    relatedProjectsState={newRelatedProjects}
                    setRelatedProjectsState={setNewRelatedProjects}
                  />
                </TabPanel>
              </div>
            </StyledFormContainer>
          }
        />
      </>
    );
  },
);

export { CreateProjectForm };
