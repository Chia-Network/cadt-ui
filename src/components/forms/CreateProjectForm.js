import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Tabs,
  Tab,
  TabPanel,
  Modal,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import ProjectLocationsRepeater from './ProjectLocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';

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
  const [newProjectLocations, setNewProjectLocations] = useState([]);
  const [newCoBenefits, setNewCoBenefits] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useDispatch();
  const intl = useIntl();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [newProject, setNewProject] = useState({
    currentRegistry: '',
    registryOfOrigin: '',
    originProjectId: '',
    program: '',
    projectID: '',
    projectName: '',
    projectLink: '',
    projectDeveloper: '',
    sector: '',
    projectType: '',
    coveredByNDC: 0,
    NDCLinkage: '',
    projectStatus: '',
    projectStatusDate: '',
    unitMetric: '',
    methodology: '',
    methodologyVersion: 0,
    validationApproach: '',
    validationDate: '',
    estimatedAnnualAverageEmissionReduction: 60,
    projectTag: '',
  });
  const handleSubmit = () => {
    const dataToSend = _.cloneDeep(newProject);
    dataToSend.vintage = newVintage;
    dataToSend.coBenefits = newCoBenefits;
    dataToSend.qualification = newQualifications;
    dataToSend.projectLocations = newProjectLocations;
    dataToSend.relatedProjects = newRelatedProjects;
    dispatch(postNewProject(newProject));
  };

  return (
    <>
      <Modal
        onOk={handleSubmit}
        onClose={onClose}
        basic
        form
        showButtons
        title="Create Projects"
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Project" />
              <Tab label="Qualifications" />
              <Tab label="Vintages" />
              <Tab label="Co-Benefits" />
              <Tab label="Project Locations" />
              <Tab label="Related Projects" />
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
                            {intl.formatMessage({ id: 'current-registry' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'current-registry',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.currentRegistry}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                currentRegistry: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'registry-of-origin' })}
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
                            {intl.formatMessage({ id: 'origin-project-id' })}
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
                            {intl.formatMessage({ id: 'program' })}
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
                            {intl.formatMessage({ id: 'project-id' })}
                          </Body>
                        </StyledLabelContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'project-id',
                          })}
                          state={InputStateEnum.default}
                          value={newProject.projectID}
                          onChange={value =>
                            setNewProject(prev => ({
                              ...prev,
                              projectID: value,
                            }))
                          }
                        />
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'project-name' })}
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
                            {intl.formatMessage({ id: 'project-link' })}
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
                            {intl.formatMessage({ id: 'project-developer' })}
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
                            {intl.formatMessage({ id: 'sector' })}
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
                            {intl.formatMessage({ id: 'project-type' })}
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
                            {intl.formatMessage({ id: 'covered-by-ndc' })}
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
                            {intl.formatMessage({ id: 'ndc-linkage' })}
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
                            {intl.formatMessage({ id: 'project-status' })}
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
                            {intl.formatMessage({ id: 'project-status-date' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-status-date',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.projectStatusDate}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                projectStatusDate: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-metric' })}
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
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'methodology' })}
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
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'methodology-version' })}
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
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'validation-approach' })}
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
                            {intl.formatMessage({ id: 'validation-date' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'validation-date',
                            })}
                            state={InputStateEnum.default}
                            value={newProject.validationDate}
                            onChange={value =>
                              setNewProject(prev => ({
                                ...prev,
                                validationDate: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({
                              id: 'estimated-annual-average-emission-reduction',
                            })}
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
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'project-tag' })}
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
