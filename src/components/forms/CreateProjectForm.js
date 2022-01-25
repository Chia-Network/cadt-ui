import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Tabs,
  Tab,
  TabPanel,
  Modal,
  Body,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  DateSelect,
  Message,
  ToolTipContainer,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import ProjectLocationsRepeater from './ProjectLocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateProjectForm = withRouter(({ onClose }) => {
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
  };

  const projectWasSuccessfullyCreated =
    notification && notification.id === 'project-successfully-created';
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
        onOk={handleSubmit}
        onClose={onClose}
        basic
        form
        showButtons
        title={intl.formatMessage({
          id: 'create-project',
        })}
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={intl.formatMessage({
                  id: 'project',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'qualifications',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'vintages',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'co-benefits',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'project-locations',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'related-projects',
                })}
              />
            </Tabs>
            <div>
              <TabPanel
                style={{ paddingTop: '1.25rem' }}
                value={tabValue}
                index={0}>
                <ModalFormContainerStyle>
                  <FormContainerStyle>
                    <BodyContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-registry-of-origin-description',
                              })}>
                              <FormattedMessage id="registry-of-origin" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-origin-project-id-description',
                              })}>
                              <FormattedMessage id="origin-project-id" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-program-description',
                              })}>
                              <FormattedMessage id="program" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-id-description',
                              })}>
                              <FormattedMessage id="project-id" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-name-description',
                              })}>
                              <FormattedMessage id="project-name" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-link-description',
                              })}>
                              <FormattedMessage id="project-link" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-developer-description',
                              })}>
                              <FormattedMessage id="project-developer" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-sector-description',
                              })}>
                              <FormattedMessage id="sector" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-type-description',
                              })}>
                              <FormattedMessage id="project-type" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-covered-by-ndc-description',
                              })}>
                              <FormattedMessage id="covered-by-ndc" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-ndc-linkage-description',
                              })}>
                              <FormattedMessage id="ndc-linkage" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-status-description',
                              })}>
                              <FormattedMessage id="project-status" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-status-date-description',
                              })}>
                              <FormattedMessage id="project-status-date" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-unit-metric-description',
                              })}>
                              <FormattedMessage id="unit-metric" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-methodology-description',
                              })}>
                              <FormattedMessage id="methodology" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-methodology-version-description',
                              })}>
                              <FormattedMessage id="methodology-version" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-validation-approach-description',
                              })}>
                              <FormattedMessage id="validation-approach" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-validation-date-description',
                              })}>
                              <FormattedMessage id="validation-date" />
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
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-estimated-annual-average-emission-reduction-description',
                              })}>
                              <FormattedMessage id="estimated-annual-average-emission-reduction" />
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
                                estimatedAnnualAverageEmissionReduction: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-tags-description',
                              })}>
                              <FormattedMessage id="project-tag" />
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
                <QualificationsRepeater
                  qualificationsState={newQualifications}
                  newQualificationsState={setNewQualifications}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <VintageRepeater
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
                <ProjectLocationsRepeater
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
          </div>
        }
      />
    </>
  );
});

export { CreateProjectForm };
