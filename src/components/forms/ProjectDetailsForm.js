import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { setValidationErrors } from '../../utils/validationUtils';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DateSelect,
  DateVariantEnum,
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  FieldRequired,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  SimpleSelectVariantEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  SimpleSelect,
  SpanTwoColumnsContainer,
  HrSpanTwoColumnsContainer,
  RequiredContainer,
} from '..';

import { projectSchema } from '../../store/validations';

const ProjectDetailsForm = ({ projectDetails, setProjectDetails }) => {
  const [errorProjectMessage, setErrorProjectMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    setValidationErrors(projectSchema, projectDetails, setErrorProjectMessage);
  }, [projectDetails]);

  return (
    <ModalFormContainerStyle>
      <RequiredContainer>
        <FieldRequired />
      </RequiredContainer>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-name" />
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
                variant={
                  errorProjectMessage?.projectName
                    ? InputVariantEnum.error
                    : undefined
                }
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
            {errorProjectMessage?.projectName && (
              <Body size="Small" color="red">
                {errorProjectMessage.projectName}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <StandardInput
              variant={
                errorProjectMessage?.projectId
                  ? InputVariantEnum.error
                  : undefined
              }
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
            {errorProjectMessage?.projectId && (
              <Body size="Small" color="red">
                {errorProjectMessage.projectId}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorProjectMessage?.projectDeveloper
                    ? InputVariantEnum.error
                    : undefined
                }
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
            {errorProjectMessage?.projectDeveloper && (
              <Body size="Small" color="red">
                {errorProjectMessage.projectDeveloper}
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
                value={projectDetails.program}
                onChange={value =>
                  setProjectDetails(prev => ({
                    ...prev,
                    program: value,
                  }))
                }
              />
            </InputContainer>
            {errorProjectMessage?.program && (
              <Body size="Small" color="red">
                {errorProjectMessage.program}
              </Body>
            )}
          </StyledFieldContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="project-link" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'projects-project-link-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                variant={
                  errorProjectMessage?.projectLink
                    ? InputVariantEnum.error
                    : undefined
                }
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
              {errorProjectMessage?.projectLink && (
                <Body size="Small" color="red">
                  {errorProjectMessage.projectLink}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="sector" />
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
              <SimpleSelect
                variant={
                  errorProjectMessage?.sector && SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.projectSector}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.sector ? [projectDetails.sector] : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    sector: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorProjectMessage?.sector && (
              <Body size="Small" color="red">
                {errorProjectMessage.sector}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <SimpleSelect
              variant={
                errorProjectMessage?.projectType &&
                SimpleSelectVariantEnum.error
              }
              size={SimpleSelectSizeEnum.large}
              type={SimpleSelectTypeEnum.basic}
              options={pickLists.projectType}
              state={SimpleSelectStateEnum.default}
              selected={
                projectDetails.projectType
                  ? [projectDetails.projectType]
                  : undefined
              }
              onChange={selectedOptions =>
                setProjectDetails(prev => ({
                  ...prev,
                  projectType: selectedOptions[0],
                }))
              }
            />
            {errorProjectMessage?.projectType && (
              <Body size="Small" color="red">
                {errorProjectMessage.projectType}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-status" />
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
              <SimpleSelect
                variant={
                  errorProjectMessage?.projectStatus &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.projectStatusValues}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.projectStatus
                    ? [projectDetails.projectStatus]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectStatus: selectedOptions[0],
                  }))
                }
              />
              {errorProjectMessage?.projectStatus && (
                <Body size="Small" color="red">
                  {errorProjectMessage.projectStatus}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="project-status-date" />
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
                variant={
                  errorProjectMessage?.projectStatusDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={projectDetails.projectStatusDate}
                setDateValue={date =>
                  setProjectDetails(prev => ({
                    ...prev,
                    projectStatusDate: date,
                  }))
                }
              />
              {errorProjectMessage?.projectStatusDate && (
                <Body size="Small" color="red">
                  {errorProjectMessage.projectStatusDate}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <HrSpanTwoColumnsContainer>
            <hr />
          </HrSpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="covered-by-ndc" />
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
              <SimpleSelect
                variant={
                  errorProjectMessage?.coveredByNDC &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.coveredByNDC}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.coveredByNDC
                    ? [projectDetails.coveredByNDC]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    coveredByNDC: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorProjectMessage?.coveredByNDC && (
              <Body size="Small" color="red">
                {errorProjectMessage.coveredByNDC}
              </Body>
            )}
          </StyledFieldContainer>
          <div></div>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    {projectDetails.coveredByNDC === 'Inside NDC' && '*'}
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

              <StandardInput
                variant={
                  errorProjectMessage?.ndcInformation
                    ? InputVariantEnum.error
                    : undefined
                }
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
              {errorProjectMessage?.ndcInformation && (
                <Body size="Small" color="red">
                  {errorProjectMessage.ndcInformation}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="current-registry" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'projects-current-registry-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorProjectMessage?.currentRegistry &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.registries}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.currentRegistry
                    ? [projectDetails.currentRegistry]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    currentRegistry: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorProjectMessage?.currentRegistry && (
              <Body size="Small" color="red">
                {errorProjectMessage.currentRegistry}
              </Body>
            )}
          </StyledFieldContainer>
          <div></div>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="registry-of-origin" />
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
              <SimpleSelect
                variant={
                  errorProjectMessage?.registryOfOrigin &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.registries}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.registryOfOrigin
                    ? [projectDetails.registryOfOrigin]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    registryOfOrigin: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorProjectMessage?.registryOfOrigin && (
              <Body size="Small" color="red">
                {errorProjectMessage.registryOfOrigin}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorProjectMessage?.originProjectId
                    ? InputVariantEnum.error
                    : undefined
                }
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
            {errorProjectMessage?.originProjectId && (
              <Body size="Small" color="red">
                {errorProjectMessage.originProjectId}
              </Body>
            )}
          </StyledFieldContainer>
          <HrSpanTwoColumnsContainer>
            <hr />
          </HrSpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-metric" />
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
              <SimpleSelect
                variant={
                  errorProjectMessage?.unitMetric &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.unitMetric}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.unitMetric
                    ? [projectDetails.unitMetric]
                    : [pickLists.unitMetric[0]]
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    unitMetric: selectedOptions[0],
                  }))
                }
              />
              {errorProjectMessage?.unitMetric && (
                <Body size="Small" color="red">
                  {errorProjectMessage.unitMetric}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorProjectMessage?.methodology &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.methodology}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.methodology
                    ? [projectDetails.methodology]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    methodology: selectedOptions[0],
                  }))
                }
              />
              {errorProjectMessage?.methodology && (
                <Body size="Small" color="red">
                  {errorProjectMessage.methodology}
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.validationBody}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.validationBody
                    ? [projectDetails.validationBody]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    validationBody: selectedOptions[0],
                  }))
                }
              />
              {errorProjectMessage?.validationBody && (
                <Body size="Small" color="red">
                  {errorProjectMessage.validationBody}
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
                  })}>
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
              {errorProjectMessage?.validationDate && (
                <Body size="Small" color="red">
                  {errorProjectMessage.validationDate}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
          <HrSpanTwoColumnsContainer>
            <hr />
          </HrSpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
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
              {errorProjectMessage?.projectTags && (
                <Body size="Small" color="red">
                  {errorProjectMessage.projectTags}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
        </BodyContainer>
      </FormContainerStyle>
    </ModalFormContainerStyle>
  );
};

export { ProjectDetailsForm };
