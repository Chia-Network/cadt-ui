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
  DescriptionIcon,
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

const CreateProjectForm = withRouter(({ onClose }) => {
  const [newLabels, setNewLabels] = useState([]);
  const [newRelatedProjects, setNewRelatedProjects] = useState([]);
  const [newIssuance, setNewIssuance] = useState([]);
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
    projectId: '',
    registryOfOrigin: '',
    program: '',
    projectName: '',
    projectLink: '',
    projectDeveloper: '',
    sector: '',
    projectType: '',
    projectTags: '',
    coveredByNDC: '',
    ndcInformation: '',
    projectStatus: '',
    projectStatusDate: '',
    unitMetric: '',
    methodology: '',
    validationBody: '',
    validationDate: '',
  });
  const handleSubmit = () => {
    const dataToSend = _.cloneDeep(newProject);

    if (!_.isEmpty(newIssuance)) {
      dataToSend.issuances = newIssuance;
    }

    if (!_.isEmpty(newCoBenefits)) {
      dataToSend.coBenefits = newCoBenefits;
    }

    if (!_.isEmpty(newLabels)) {
      dataToSend.labels = newLabels;
    }

    if (!_.isEmpty(date)) {
      dataToSend.projectStatusDate = date;
    }

    if (!_.isEmpty(validationDate)) {
      dataToSend.validationDate = validationDate;
    }

    if (!_.isEmpty(newProjectLocations)) {
      dataToSend.projectLocations = newProjectLocations;
    }

    if (!_.isEmpty(newRelatedProjects)) {
      dataToSend.relatedProjects = newRelatedProjects;
    }
    console.log(dataToSend);
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
                  id: 'labels',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'issuances',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'co-benefits',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'locations',
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
                            <LabelContainer>
                              <FormattedMessage id="project-id" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-id-description',
                              })}>
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
                              <FormattedMessage id="registry-of-origin" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-registry-of-origin-description',
                              })}>
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
                              <FormattedMessage id="program" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-program-description',
                              })}>
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
                              <FormattedMessage id="project-name" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-name-description',
                              })}>
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
                              })}>
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
                              })}>
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
                              })}>
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
                              })}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="project-tags" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-project-tags-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-tags',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.projectTags}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                projectTags: value,
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
                              <FormattedMessage id="covered-by-ndc" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-covered-by-ndc-description',
                              })}>
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

                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            <LabelContainer>
                              <FormattedMessage id="ndc-information" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-ndc-information-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'ndc-information',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.ndcInformation}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                ndcInformation: value,
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
                              })}>
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
                              })}>
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
                              })}>
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
                              })}>
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
                              <FormattedMessage id="validation-body" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-validation-body-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'validation-body',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.validationBody}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                validationBody: value,
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
                              })}>
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
                    </div>
                  </FormContainerStyle>
                </ModalFormContainerStyle>
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
            </div>
          </div>
        }
      />
    </>
  );
});

export { CreateProjectForm };
