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
  ToolTipContainer,
  DescriptionIcon,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import ProjectLocationsRepeater from './ProjectLocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';
import { useIntl, FormattedMessage } from 'react-intl';
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

const EditProjectsForm = ({ data, onClose }) => {
  const [qualifications, setQualificationsRepeaterValues] = useState([]);
  const [vintage, setVintage] = useState([]);
  const [projectLocations, setProjectLocations] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [coBenefits, setCoBenefits] = useState([]);
  const [editedProjects, setEditProjects] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setEditProjects({
      registryOfOrigin: data.registryOfOrigin,
      originProjectId: data.originProjectId,
      program: data.program,
      projectId: data.projectId,
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

    if (!_.isEmpty(vintage)) {
      dataToSend.vintages = vintage;
    }

    if (!_.isEmpty(qualifications)) {
      dataToSend.qualifications = qualifications;
    }

    if (!_.isEmpty(coBenefits)) {
      dataToSend.coBenefits = coBenefits;
    }

    if (!_.isEmpty(projectLocations)) {
      dataToSend.projectLocations = projectLocations;
    }

    if (!_.isEmpty(relatedProjects)) {
      dataToSend.relatedProjects = relatedProjects;
    }
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
        title={intl.formatMessage({
          id: 'edit-project',
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="origin-project-id" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-origin-project-id-description',
                              })}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          value={editedProjects.projectId}
                          onChange={value =>
                            setEditProjects(prev => ({
                              ...prev,
                              projectId: value,
                            }))
                          }
                        />
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="ndc-linkage" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-ndc-linkage-description',
                              })}>
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
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
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-status-date',
                            })}
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
                          <Body color={'#262626'}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="methodology-version" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-methodology-version-description',
                              })}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="validation-approach" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-validation-approach-description',
                              })}>
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
                          <Body color={'#262626'}>
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
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'validation-date',
                            })}
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
                            <LabelContainer>
                              <FormattedMessage id="estimated-annual-average-emission-reduction" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'projects-estimated-annual-average-emission-reduction-description',
                              })}>
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
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="project-tag" />
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
                              id: 'project-tag',
                            })}
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
                </ModalFormContainerStyle>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <QualificationsRepeater
                  qualificationsState={qualifications}
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
