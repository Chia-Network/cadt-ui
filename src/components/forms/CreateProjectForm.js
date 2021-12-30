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
  Body,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import ProjectLocationsRepeater from './ProjectLocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { postNewProject } from '../../store/actions/climateWarehouseActions';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;

const InputContainer = styled('div')`
  width: 320px;
`;

const CreateProjectForm = withRouter(({ onClose }) => {
  const [newQualifications, setNewQualifications] = useState([]);
  const [newRelatedProjects, setNewRelatedProjects] = useState([]);
  const [newVintage, setNewVintage] = useState([]);
  const [newProjectLocations, setNewProjectLocations] = useState([]);
  const [newCoBenefits, setNewCoBenefits] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();

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
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Tab Options">
              <Tab label="Project" />
              <Tab label="Qualifications" />
              <Tab label="Vintage" />
              <Tab label="Co-Benefits" />
              <Tab label="Project Locations" />
              <Tab label="Related Projects" />
            </Tabs>
            <div>
              <TabPanel value={tabValue} index={0}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 0',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      width: '90%',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingRight: '66px',
                      }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Current Registry</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Current Registry"
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
                          <Body color={'#262626'}>Registry of Origin</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Registry of Origin"
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
                          <Body color={'#262626'}>Origin Project Id</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Origin Project Id"
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
                          <Body color={'#262626'}>Program</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Program"
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
                          <Body color={'#262626'}>Project ID</Body>
                        </StyledLabelContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText="Project ID"
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
                          <Body color={'#262626'}>Project Name</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Name"
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
                          <Body color={'#262626'}>Project Link</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Link"
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
                          <Body color={'#262626'}>Project Developer</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Developer"
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
                          <Body color={'#262626'}>Sector</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Sector"
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
                          <Body color={'#262626'}>Project Type</Body>
                        </StyledLabelContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText="Project Type"
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
                          <Body color={'#262626'}>Covered by NDC</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Covered by NDC"
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
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>NDC Linkage</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="NDC Linkage"
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
                          <Body color={'#262626'}>Project Status</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Status"
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
                          <Body color={'#262626'}>Project Status Date</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Status Date"
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
                          <Body color={'#262626'}>Unit Metric</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Metric"
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
                          <Body color={'#262626'}>Methodology</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Methodology"
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
                          <Body color={'#262626'}>Methodology Version</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Methodology Version"
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
                          <Body color={'#262626'}>Validation Approach</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Validation Approach"
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
                          <Body color={'#262626'}>Validation Date</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Validation Date"
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
                          <Body color={'#262626'}>
                            Estimated Annual Average Emission Reduction
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Estimated Annual Average Emission Reduction"
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
                          <Body color={'#262626'}>Project Tag</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Project Tag"
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
                  </div>
                  {/* <div onClick={handleSubmit}>
        <PrimaryButton label="Submit" size="large" />
      </div> */}
                </div>
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
