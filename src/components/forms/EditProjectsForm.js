import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Modal,
  Body,
  Tabs,
  Tab,
  TabPanel,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import ProjectLocationsRepeater from './ProjectLocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;
const InputContainer = styled('div')`
  width: 20rem;
`;

const EditProjectsForm = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const [qualification, setQualificationsRepeaterValues] = useState([]);
  const [vintage, setVintage] = useState([]);
  const [projectLocations, setProjectLocations] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [coBenefits, setCoBenefits] = useState([]);
  const [editedProjects, setEditProjects] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setEditProjects({
      currentRegistry: data.currentRegistry,
      registryOfOrigin: data.registryOfOrigin,
      originProjectId: data.originProjectId,
      program: data.program,
      projectID: data.projectID,
      projectName: data.projectName,
      projectLink: data.projectLink,
      projectDeveloper: data.projectDeveloper,
      sector: data.sector,
      projectType: data.projectType,
      coveredByNDC: data.coveredByNDC,
      NDCLinkage: data.NDCLinkage,
      projectStatus: data.projectStatus,
      projectStatusDate: data.projectStatusDate,
      unitMetric: data.unitMetric,
      methodology: data.methodology,
      methodologyVersion: data.methodologyVersion,
      validationApproach: data.validationApproach,
      validationDate: data.validationDate,
      estimatedAnnualAverageEmissionReduction:
        data.estimatedAnnualAverageEmissionReduction,
      projectTag: data.projectTag,
    });
    setVintage(_.get(data, 'vintages', []));
    setProjectLocations(_.get(data, 'projectLocations', []));
    setCoBenefits(_.get(data, 'coBenefits', []));
    setQualificationsRepeaterValues(_.get(data, 'qualifications', []));
    setRelatedProjects(_.get(data, 'relatedProjects', []));
  }, [data]);

  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(editedProjects);
    dataToSend.vintage = _.head(vintage);
    dataToSend.qualification = qualification;
    dataToSend.coBenefits = coBenefits;
    dataToSend.projectLocations = projectLocations;
    dataToSend.relatedProjects = relatedProjects;
    dispatch(updateUnitsRecord(dataToSend));
  };
  return (
    <>
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        basic
        form
        showButtons
        title="Edit Projects"
        body={
          <div>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Tab Options">
              <Tab label="Project" />
              <Tab label="Qualifications" />
              <Tab label="Vintages" />
              <Tab label="Co-Benefits" />
              <Tab label="Project Locations" />
              <Tab label="Related Projects" />
            </Tabs>
            <div>
              <TabPanel value={tabValue} index={0}>
                <ModalFormContainerStyle>
                  <FormContainerStyle>
                    <BodyContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Current Registry</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Current Registry"
                            state={InputStateEnum.default}
                            value={editedProjects.currentRegistry}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.registryOfOrigin}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.originProjectId}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.program}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                          value={editedProjects.projectID}
                          onChange={value =>
                            setEditProjects(prev => ({
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
                            value={editedProjects.projectName}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.projectLink}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.projectDeveloper}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.sector}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                          value={editedProjects.projectType}
                          onChange={value =>
                            setEditProjects(prev => ({
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
                            value={editedProjects.coveredByNDC}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                          <Body color={'#262626'}>NDC Linkage</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="NDC Linkage"
                            state={InputStateEnum.default}
                            value={editedProjects.NDCLinkage}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.projectStatus}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.projectStatusDate}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.unitMetric}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.methodology}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.methodologyVersion}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.validationApproach}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.validationDate}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                              editedProjects.estimatedAnnualAverageEmissionReduction
                            }
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.projectTag}
                            onChange={value =>
                              setEditProjects(prev => ({
                                ...prev,
                                projectTag: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
                  </FormContainerStyle>
                  {/* <div onClick={handleSubmit}>
        <PrimaryButton label="Submit" size="large" />
      </div> */}
                </ModalFormContainerStyle>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <QualificationsRepeater
                  qualificationsState={qualification}
                  newQualificationsState={setQualificationsRepeaterValues}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <VintageRepeater
                  vintageState={vintage}
                  newVintageState={setVintage}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <CoBenefitsRepeater
                  coBenefitsState={coBenefits}
                  setNewCoBenefitsState={setCoBenefits}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <ProjectLocationsRepeater
                  projectLocationsState={projectLocations}
                  setProjectLocationsState={setProjectLocations}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <RelatedProjectsRepeater
                  relatedProjectsState={relatedProjects}
                  setRelatedProjectsState={setRelatedProjects}
                />
              </TabPanel>
            </div>
          </div>
        }
      />
    </>
  );
};

export { EditProjectsForm };
