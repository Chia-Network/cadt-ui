import React, { useState, useEffect, useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { setValidationErrors } from '../../utils/validationUtils';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DateSelect,
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  FieldRequired,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  StyledFieldRequired,
  Select,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
} from '..';

import { projectDetailsSchema } from '../../store/validations';

const ProjectDetailsForm = ({ projectDetails, setProjectDetails }) => {
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const selectCoveredByNDCOptions = useMemo(
    () =>
      pickLists.coveredByNDC.map(coveredByNDCItem => ({
        value: coveredByNDCItem,
        label: coveredByNDCItem,
      })),
    [pickLists],
  );

  const selectUnitMetricOptions = useMemo(
    () =>
      pickLists.unitMetric.map(unitMetricItem => ({
        value: unitMetricItem,
        label: unitMetricItem,
      })),
    [pickLists],
  );

  const selectProjectTypeOptions = useMemo(
    () =>
      pickLists.projectType.map(projectTypeItem => ({
        value: projectTypeItem,
        label: projectTypeItem,
      })),
    [pickLists],
  );

  const selectMethodologyOptions = useMemo(
    () =>
      pickLists.methodology.map(methodologyItem => ({
        value: methodologyItem,
        label: methodologyItem,
      })),
    [pickLists],
  );

  const selectProjectSectorOptions = useMemo(
    () =>
      pickLists.projectSector.map(projectSectorItem => ({
        value: projectSectorItem,
        label: projectSectorItem,
      })),
    [pickLists],
  );

  const selectProjectStatusValuesOptions = useMemo(
    () =>
      pickLists.projectStatusValues.map(projectStatusValuesItem => ({
        value: projectStatusValuesItem,
        label: projectStatusValuesItem,
      })),
    [pickLists],
  );

  const selectRegistriesOptions = useMemo(
    () =>
      pickLists.registries.map(registriesItem => ({
        value: registriesItem,
        label: registriesItem,
      })),
    [pickLists],
  );

  const selectValidationBodyOptions = useMemo(
    () =>
      pickLists.validationBody.map(validationBodyItem => ({
        value: validationBodyItem,
        label: validationBodyItem,
      })),
    [pickLists],
  );

  useEffect(() => {
    setValidationErrors(
      projectDetailsSchema,
      projectDetails,
      setErrorIssuanceMessage,
    );
  }, [projectDetails]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <FieldRequired />
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="registry-of-origin" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectRegistriesOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.registryOfOrigin
                    ? [
                        {
                          label: projectDetails.registryOfOrigin,
                          value: projectDetails.registryOfOrigin,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    registryOfOrigin: selectedOptions[0].value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.registryOfOrigin && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.registryOfOrigin}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="origin-project-id" />
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
                value={projectDetails.originProjectId}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    originProjectId: value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.originProjectId && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.originProjectId}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
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
                value={projectDetails.program}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    program: value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.program && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.program}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-id" />
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
              value={projectDetails.projectId}
              onChange={value =>
                setProjectDetails(prev => ({
                  ...prev,
                  projectId: value,
                }))
              }
            />
            {errorIssuanceMessage?.projectId && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.projectId}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-name" />
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
                value={projectDetails.projectName}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectName: value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.projectName && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.projectName}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-link" />
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
                value={projectDetails.projectLink}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectLink: value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.projectLink && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.projectLink}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-developer" />
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
                value={projectDetails.projectDeveloper}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectDeveloper: value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.projectDeveloper && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.projectDeveloper}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="sector" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectProjectSectorOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.sector
                    ? [
                        {
                          label: projectDetails.sector,
                          value: projectDetails.sector,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    sector: selectedOptions[0].value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.sector && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.sector}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-type" />
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
            <Select
              size={SelectSizeEnum.large}
              type={SelectTypeEnum.basic}
              options={selectProjectTypeOptions}
              state={SelectStateEnum.default}
              selected={
                projectDetails.projectType
                  ? [
                      {
                        label: projectDetails.projectType,
                        value: projectDetails.projectType,
                      },
                    ]
                  : undefined
              }
              onChange={selectedOptions =>
                setProjectDetails(prev => ({
                  ...prev,
                  projectType: selectedOptions[0].value,
                }))
              }
            />
            {errorIssuanceMessage?.projectType && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.projectType}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
        <BodyContainer>
          <StyledFieldRequired />
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="covered-by-ndc" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectCoveredByNDCOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.coveredByNDC
                    ? [
                        {
                          label: projectDetails.coveredByNDC,
                          value: projectDetails.coveredByNDC,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    coveredByNDC: selectedOptions[0].value,
                  }))
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.coveredByNDC && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.coveredByNDC}
              </Body>
            )}
          </StyledFieldContainer>
          {projectDetails.coveredByNDC === 'Inside NDC' && (
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="ndc-information" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'ndc-information-description',
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
                    id: 'ndc-information',
                  })}
                  state={InputStateEnum.default}
                  value={projectDetails.ndcInformation}
                  onChange={value =>
                    setProjectDetails(prev => ({
                      ...prev,
                      ndcInformation: value,
                    }))
                  }
                />
                {errorIssuanceMessage?.ndcInformation && (
                  <Body size="Small" color="red">
                    {errorIssuanceMessage.ndcInformation}
                  </Body>
                )}
              </InputContainer>
            </StyledFieldContainer>
          )}
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-status" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectProjectStatusValuesOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.projectStatus
                    ? [
                        {
                          label: projectDetails.projectStatus,
                          value: projectDetails.projectStatus,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectStatus: selectedOptions[0].value,
                  }))
                }
              />
              {errorIssuanceMessage?.projectStatus && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.projectStatus}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
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
                dateValue={projectDetails.projectStatusDate}
                setDateValue={date =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectStatusDate: date,
                  }))
                }
              />
              {errorIssuanceMessage?.projectStatusDate && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.projectStatusDate}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-metric" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectUnitMetricOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.unitMetric
                    ? [
                        {
                          label: projectDetails.unitMetric,
                          value: projectDetails.unitMetric,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    unitMetric: selectedOptions[0].value,
                  }))
                }
              />
              {errorIssuanceMessage?.unitMetric && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.unitMetric}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="methodology" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectMethodologyOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.methodology
                    ? [
                        {
                          label: projectDetails.methodology,
                          value: projectDetails.methodology,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    methodology: selectedOptions[0].value,
                  }))
                }
              />
              {errorIssuanceMessage?.methodology && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.methodology}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
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
                dateValue={projectDetails.validationDate}
                setDateValue={date =>
                  setProjectDetails(prev => ({
                    ...prev,
                    validationDate: date,
                  }))
                }
              />
              {errorIssuanceMessage?.validationDate && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.validationDate}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="validation-body" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'projects-validation-body-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectValidationBodyOptions}
                state={SelectStateEnum.default}
                selected={
                  projectDetails.validationBody
                    ? [
                        {
                          label: projectDetails.validationBody,
                          value: projectDetails.validationBody,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    validationBody: selectedOptions[0].value,
                  }))
                }
              />
              {errorIssuanceMessage?.validationBody && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.validationBody}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="project-tags" />
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
                  id: 'project-tags',
                })}
                state={InputStateEnum.default}
                value={projectDetails.projectTags}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectTags: value,
                  }))
                }
              />
              {errorIssuanceMessage?.projectTags && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.projectTags}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
    </ModalFormContainerStyle>
  );
};

export { ProjectDetailsForm };
