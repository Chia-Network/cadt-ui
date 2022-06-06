import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  FieldRequired,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  InputVariantEnum,
  YearSelect,
  DateVariantEnum,
  RequiredContainer,
  SpanTwoColumnsContainer,
  HrSpanTwoColumnsContainer,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  SimpleSelectVariantEnum,
  SimpleSelect,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
  SelectVariantEnum,
} from '..';

import { unitsSchema } from '../../store/validations';

const UnitDetailsForm = ({ unitDetails, setUnitDetails }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const { validateForm, formType } = useSelector(state => state.app);
  const intl = useIntl();
  const { pickLists, myProjects, issuances } = useSelector(
    store => store.climateWarehouse,
  );
  const [selectedWarehouseProjectOption, setSelectedWarehouseProjectOption] =
    useState(null);

  useEffect(() => {
    if (validateForm && formType === 'unit') {
      setValidationErrors(unitsSchema, unitDetails, setErrorMessage);
    }
  }, [unitDetails, validateForm, formType]);

  const projectsSelectOptions = useMemo(() => {
    if (myProjects) {
      return myProjects.map(projectItem => ({
        value: projectItem,
        label: projectItem.projectName,
      }));
    }
    return [];
  }, [myProjects]);

  const projectLocationIdOptions = useMemo(() => {
    if (selectedWarehouseProjectOption?.value?.projectLocations?.length > 0) {
      return selectedWarehouseProjectOption?.value?.projectLocations?.map(
        item => item.country,
      );
    }
    return [];
  }, [selectedWarehouseProjectOption]);

  useEffect(() => {
    if (
      unitDetails?.issuance &&
      issuances?.length > 0 &&
      selectedWarehouseProjectOption === null &&
      projectsSelectOptions
    ) {
      const currentUnitIssuanceId = unitDetails.issuance.id;

      const inferredProjectIdOfTheCurrentUnit = issuances.filter(
        issuanceItem => issuanceItem?.id === currentUnitIssuanceId,
      )[0]?.warehouseProjectId;

      const inferredProjectOption = inferredProjectIdOfTheCurrentUnit
        ? projectsSelectOptions.filter(
            item =>
              item.value.warehouseProjectId ===
              inferredProjectIdOfTheCurrentUnit,
          )[0]
        : null;

      if (inferredProjectOption) {
        setSelectedWarehouseProjectOption(inferredProjectOption);
        localStorage.setItem(
          'unitSelectedWarehouseProjectId',
          inferredProjectOption.value.warehouseProjectId,
        );
      }
    }
  }, [unitDetails, issuances, projectsSelectOptions]);

  const changeSelectedProjectOption = useCallback(
    selectedProjectOption => {
      setSelectedWarehouseProjectOption(selectedProjectOption);

      localStorage.removeItem('unitSelectedWarehouseProjectId');
      const selectedProjectHasIssuances =
        selectedProjectOption.value?.issuances?.length > 0;
      if (selectedProjectHasIssuances) {
        localStorage.setItem(
          'unitSelectedWarehouseProjectId',
          selectedProjectOption.value.warehouseProjectId,
        );
      }

      const isCurrentSavedIssuanceOnTheSelectedProject =
        selectedProjectOption?.value?.issuances.some(
          issuanceItem => issuanceItem?.id === unitDetails?.issuance?.id,
        );
      if (!isCurrentSavedIssuanceOnTheSelectedProject) {
        setUnitDetails(prev => ({
          ...prev,
          projectLocationId: '',
          issuance: '',
        }));
      }
    },
    [
      selectedWarehouseProjectOption,
      setSelectedWarehouseProjectOption,
      setUnitDetails,
    ],
  );

  if (!pickLists) {
    return null;
  }

  return (
    <ModalFormContainerStyle>
      <RequiredContainer>
        <FieldRequired />
      </RequiredContainer>
      <FormContainerStyle>
        <BodyContainer>
          {projectsSelectOptions && (
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="select-existing-project" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'select-existing-project',
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
                  options={projectsSelectOptions}
                  state={SelectStateEnum.default}
                  variant={
                    ((!selectedWarehouseProjectOption && validateForm) ||
                      selectedWarehouseProjectOption?.value?.issuances
                        ?.length === 0) &&
                    SelectVariantEnum.error
                  }
                  selected={
                    selectedWarehouseProjectOption
                      ? [selectedWarehouseProjectOption]
                      : undefined
                  }
                  onChange={selectedOptions =>
                    changeSelectedProjectOption(selectedOptions[0])
                  }
                />
              </InputContainer>
              {!selectedWarehouseProjectOption && validateForm && (
                <Body size="Small" color="red">
                  <FormattedMessage id="select-existing-project" />
                </Body>
              )}
              {selectedWarehouseProjectOption?.value?.issuances?.length ===
                0 && (
                <Body size="Small" color="red">
                  {intl.formatMessage({
                    id: 'select-another-project',
                  })}
                </Body>
              )}
            </StyledFieldContainer>
          )}
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="project-location-id" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-project-location-id-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                key={
                  selectedWarehouseProjectOption?.value?.warehouseProjectId ||
                  'location-select'
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={projectLocationIdOptions}
                state={
                  selectedWarehouseProjectOption
                    ? SimpleSelectStateEnum.default
                    : SimpleSelectStateEnum.disabled
                }
                selected={
                  unitDetails.projectLocationId
                    ? [unitDetails.projectLocationId]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    projectLocationId: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {selectedWarehouseProjectOption &&
              projectLocationIdOptions.length === 0 && (
                <Body size="Small">
                  <FormattedMessage id="project-has-no-locations" />
                </Body>
              )}
            {errorMessage?.projectLocationId && (
              <Body size="Small" color="red">
                {errorMessage.projectLocationId}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-owner" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-owner-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.unitOwner ? InputVariantEnum.error : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-owner',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitOwner}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitOwner: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitOwner && (
              <Body size="Small" color="red">
                {errorMessage.unitOwner}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-block-start" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-block-start-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.unitBlockStart
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-block-start',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitBlockStart}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitBlockStart: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitBlockStart && (
              <Body size="Small" color="red">
                {errorMessage.unitBlockStart}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-block-end" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-block-end-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.unitBlockEnd
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-block-end',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitBlockEnd}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitBlockEnd: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitBlockEnd && (
              <Body size="Small" color="red">
                {errorMessage.unitBlockEnd}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-count" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-count-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.unitCount ? InputVariantEnum.error : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-count',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitCount}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitCount: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitCount && (
              <Body size="Small" color="red">
                {errorMessage.unitCount}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="in-country-jurisdiction-of-owner" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-in-country-jurisdiction-of-owner-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.inCountryJurisdictionOfOwner
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'in-country-jurisdiction-of-owner',
                })}
                state={InputStateEnum.default}
                value={unitDetails.inCountryJurisdictionOfOwner}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    inCountryJurisdictionOfOwner: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.inCountryJurisdictionOfOwner && (
              <Body size="Small" color="red">
                {errorMessage.inCountryJurisdictionOfOwner}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="country-jurisdiction-of-owner" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-country-jurisdiction-of-owner-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorMessage?.countryJurisdictionOfOwner &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.countries}
                state={SimpleSelectStateEnum.default}
                selected={
                  unitDetails.countryJurisdictionOfOwner
                    ? [unitDetails.countryJurisdictionOfOwner]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    countryJurisdictionOfOwner: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.countryJurisdictionOfOwner && (
              <Body size="Small" color="red">
                {errorMessage.countryJurisdictionOfOwner}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-type" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-type-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorMessage?.unitType && SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.unitType}
                state={SimpleSelectStateEnum.default}
                selected={
                  unitDetails.unitType ? [unitDetails.unitType] : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitType: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitType && (
              <Body size="Small" color="red">
                {errorMessage.unitType}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-status" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-unit-status-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorMessage?.unitStatus && SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.unitStatus}
                state={SimpleSelectStateEnum.default}
                selected={
                  unitDetails.unitStatus ? [unitDetails.unitStatus] : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitStatus: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.unitStatus && (
              <Body size="Small" color="red">
                {errorMessage.unitStatus}
              </Body>
            )}
          </StyledFieldContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  <LabelContainer>
                    {['cancelled', 'retired'].includes(
                      unitDetails?.unitStatus?.toLowerCase(),
                    ) && '*'}
                    <FormattedMessage id="unit-status-reason" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'units-unit-status-reason-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                variant={
                  errorMessage?.unitStatusReason
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-status-reason',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitStatusReason}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitStatusReason: value,
                  }))
                }
              />
              {errorMessage?.unitStatusReason && (
                <Body size="Small" color="red">
                  {errorMessage.unitStatusReason}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="unit-registry-link" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'units-unit-registry-link-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                variant={
                  errorMessage?.unitRegistryLink
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-registry-link',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitRegistryLink}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitRegistryLink: value,
                  }))
                }
              />
              {errorMessage.unitRegistryLink && (
                <Body size="Small" color="red">
                  {errorMessage.unitRegistryLink}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  *<FormattedMessage id="vintage-year" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-vintage-year-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <YearSelect
                variant={
                  errorMessage?.vintageYear ? DateVariantEnum.error : undefined
                }
                size="large"
                yearValue={unitDetails.vintageYear}
                onChange={value => {
                  if (value) {
                    setUnitDetails(prev => ({
                      ...prev,
                      vintageYear: value.$y,
                    }));
                  }
                }}
              />
            </InputContainer>
            {errorMessage?.vintageYear && (
              <Body size="Small" color="red">
                {errorMessage.vintageYear}
              </Body>
            )}
          </StyledFieldContainer>
          <HrSpanTwoColumnsContainer>
            <hr />
          </HrSpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>
                <LabelContainer>
                  <FormattedMessage id="marketplace" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-marketplace-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.marketplace ? InputVariantEnum.error : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace',
                })}
                state={InputStateEnum.default}
                value={unitDetails.marketplace}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    marketplace: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.marketplace && (
              <Body size="Small" color="red">
                {errorMessage.marketplace}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>
                <LabelContainer>
                  <FormattedMessage id="marketplace-identifier" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-marketplace-identifier-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.marketplaceIdentifier
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace-identifier',
                })}
                state={InputStateEnum.default}
                value={unitDetails.marketplaceIdentifier}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    marketplaceIdentifier: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.marketplaceIdentifier && (
              <Body size="Small" color="red">
                {errorMessage.marketplaceIdentifier}
              </Body>
            )}
          </StyledFieldContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  <LabelContainer>
                    <FormattedMessage id="marketplace-link" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'units-marketplace-link-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                variant={
                  errorMessage?.marketplaceLink
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace-link',
                })}
                state={InputStateEnum.default}
                value={unitDetails.marketplaceLink}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    marketplaceLink: value,
                  }))
                }
              />
              {errorMessage?.marketplaceLink && (
                <Body size="Small" color="red">
                  {errorMessage.marketplaceLink}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *
                  <FormattedMessage id="corresponding-adjustment-declaration" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-corresponding-adjustment-declaration-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorMessage?.correspondingAdjustmentDeclaration &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.correspondingAdjustmentDeclaration}
                state={SimpleSelectStateEnum.default}
                selected={
                  unitDetails.correspondingAdjustmentDeclaration
                    ? [unitDetails.correspondingAdjustmentDeclaration]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    correspondingAdjustmentDeclaration: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.correspondingAdjustmentDeclaration && (
              <Body size="Small" color="red">
                {errorMessage.correspondingAdjustmentDeclaration}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="corresponding-adjustment-status" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-corresponding-adjustment-status-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorMessage?.correspondingAdjustmentStatus &&
                  SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.correspondingAdjustmentStatus}
                state={SimpleSelectStateEnum.default}
                selected={
                  unitDetails.correspondingAdjustmentStatus
                    ? [unitDetails.correspondingAdjustmentStatus]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    correspondingAdjustmentStatus: selectedOptions[0],
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.correspondingAdjustmentStatus && (
              <Body size="Small" color="red">
                {errorMessage.correspondingAdjustmentStatus}
              </Body>
            )}
          </StyledFieldContainer>
          <HrSpanTwoColumnsContainer>
            <hr />
          </HrSpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    <FormattedMessage id="unit-tags" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'units-unit-tags-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-tags',
                })}
                state={InputStateEnum.default}
                value={unitDetails.unitTags}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitTags: value,
                  }))
                }
              />
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
        </BodyContainer>
      </FormContainerStyle>
    </ModalFormContainerStyle>
  );
};

export { UnitDetailsForm };
