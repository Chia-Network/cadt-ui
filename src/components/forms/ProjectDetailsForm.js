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
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  FieldRequired,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  StyledFieldRequired,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  SimpleSelect,
} from '..';

import { projectSchema } from '../../store/validations';

const ProjectDetailsForm = ({ projectDetails, setProjectDetails }) => {
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    setValidationErrors(projectSchema, projectDetails, setErrorIssuanceMessage);
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.originProjectId
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <StandardInput
              variant={
                errorIssuanceMessage?.projectId
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.projectName
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.projectLink
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.projectDeveloper
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <SimpleSelect
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
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
            {errorIssuanceMessage?.coveredByNDC && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.coveredByNDC}
              </Body>
            )}
          </StyledFieldContainer>
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
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.ndcInformation
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
              {errorIssuanceMessage?.ndcInformation && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.ndcInformation}
                </Body>
              )}
            </InputContainer>
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.unitMetric}
                state={SimpleSelectStateEnum.default}
                selected={
                  projectDetails.unitMetric
                    ? [projectDetails.unitMetric]
                    : undefined
                }
                onChange={selectedOptions =>
                  setProjectDetails(prev => ({
                    ...prev,
                    unitMetric: selectedOptions[0],
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
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
