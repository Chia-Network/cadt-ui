import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  DateSelect,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import CoBenefitsRepeater from './CoBenefitsRepeater';
import LocationsRepeater from './LocationsRepeater';
import RelatedProjectsRepeater from './RelatedProjectsRepeater';
import { updateProjectRecord } from '../../store/actions/climateWarehouseActions';
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

const EditProjectsForm = ({ onClose }) => {
  const climatewarehouseProjects = useSelector(
    state => state.climateWarehouse.projects[0],
  );
  const [validationDate, setValidationDate] = useState();
  const [date, setDate] = useState();
  const [labels, setLabelsRepeaterValues] = useState([]);
  const [issuance, setIssuance] = useState([]);
  const [locations, setLocations] = useState([]);
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
    setDate(climatewarehouseProjects.projectStatusDate);
    setValidationDate(climatewarehouseProjects.validationDate);
  }, [validationDate, date]);

  useEffect(() => {
    setEditProjects({
      warehouseProjectId: climatewarehouseProjects.warehouseProjectId,
      projectId: climatewarehouseProjects.projectId,
      registryOfOrigin: climatewarehouseProjects.registryOfOrigin,
      program: climatewarehouseProjects.program,
      projectName: climatewarehouseProjects.projectName,
      projectLink: climatewarehouseProjects.projectLink,
      projectDeveloper: climatewarehouseProjects.projectDeveloper,
      sector: climatewarehouseProjects.sector,
      projectType: climatewarehouseProjects.projectType,
      projectTags: climatewarehouseProjects.projectTags,
      coveredByNDC: climatewarehouseProjects.coveredByNDC,
      ndcInformation: climatewarehouseProjects.ndcInformation,
      projectStatus: climatewarehouseProjects.projectStatus,
      projectStatusDate: climatewarehouseProjects.projectStatusDate,
      unitMetric: climatewarehouseProjects.unitMetric,
      methodology: climatewarehouseProjects.methodology,
      validationBody: climatewarehouseProjects.validationBody,
      validationDate: climatewarehouseProjects.validationDate,
    });
    setIssuance(
      climatewarehouseProjects.issuances.map(issuanceKey =>
        _.pick(
          issuanceKey,
          'startDate',
          'endDate',
          'verificationApproach',
          'verificationReportDate',
          'verificationBody',
        ),
      ),
    );
    setLocations(
      climatewarehouseProjects.projectLocations.map(projectLoc =>
        _.pick(
          projectLoc,
          'country',
          'inCountryRegion',
          'geographicIdentifier',
        ),
      ),
    );
    setCoBenefits(
      climatewarehouseProjects.coBenefits.map(cobenefit =>
        _.pick(cobenefit, 'cobenefit'),
      ),
    );
    setLabelsRepeaterValues(
      climatewarehouseProjects.labels.map(label =>
        _.pick(
          label,
          'label',
          'labelType',
          'creditingPeriodStartDate',
          'creditingPeriodEndDate',
          'validityPeriodStartDate',
          'validityPeriodEndDate',
          'unitQuantity',
          'labelLink',
        ),
      ),
    );
    setRelatedProjects(
      climatewarehouseProjects.relatedProjects.map(relatedProject =>
        _.pick(relatedProject, 'relationshipType', 'registry'),
      ),
    );
  }, [climatewarehouseProjects]);

  const handleEditProjects = () => {
    const dataToSend = _.cloneDeep(editedProjects);

    if (!_.isEmpty(issuance)) {
      dataToSend.issuances = issuance;
    }

    if (!_.isEmpty(labels)) {
      dataToSend.labels = labels;
    }

    if (!_.isEmpty(coBenefits)) {
      dataToSend.coBenefits = coBenefits;
    }

    if (!_.isEmpty(date)) {
      dataToSend.projectStatusDate = date;
    }

    if (!_.isEmpty(validationDate)) {
      dataToSend.validationDate = validationDate;
    }

    if (!_.isEmpty(locations)) {
      dataToSend.projectLocations = locations;
    }

    if (!_.isEmpty(relatedProjects)) {
      dataToSend.relatedProjects = relatedProjects;
    }
    
    dispatch(updateProjectRecord(dataToSend));
  };
  return (
    <>
      <Modal
        onOk={handleEditProjects}
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
                  id: 'labels',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'issuance',
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
                            value={editedProjects.projectTags}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.ndcInformation}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                            value={editedProjects.validationBody}
                            onChange={value =>
                              setEditProjects(prev => ({
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
                  labelsState={labels}
                  newLabelsState={setLabelsRepeaterValues}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <IssuanceRepeater
                  issuanceState={issuance}
                  newIssuanceState={setIssuance}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <CoBenefitsRepeater
                  coBenefitsState={coBenefits}
                  setNewCoBenefitsState={setCoBenefits}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <LocationsRepeater
                  locationsState={locations}
                  setLocationsState={setLocations}
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
