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
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  FieldRequired,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectVariantEnum,
  Select,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  InputVariantEnum,
  YearSelect,
  DateVariantEnum,
  RequiredContainer,
  SpanTwoColumnsContainer,
  HrSpanTwoColumnsContainer,
} from '..';

import { unitsSchema } from '../../store/validations';

const UnitDetailsForm = ({ unitDetails, setUnitDetails }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const { validateForm } = useSelector(state => state.app);
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    if(validateForm){
    setValidationErrors(unitsSchema, unitDetails, setErrorMessage);
    }
  }, [unitDetails, validateForm]);

  const selectUnitStatusOptions = useMemo(
    () =>
      pickLists.unitStatus.map(unitStatusItem => ({
        value: unitStatusItem,
        label: unitStatusItem,
      })),
    [pickLists],
  );

  const selectUnitTypeOptions = useMemo(
    () =>
      pickLists.unitType.map(unitTypeItem => ({
        value: unitTypeItem,
        label: unitTypeItem,
      })),
    [pickLists],
  );

  const selectCorrespondingAdjustmentStatusOptions = useMemo(
    () =>
      pickLists.correspondingAdjustmentStatus.map(adjustmentStatusItem => ({
        value: adjustmentStatusItem,
        label: adjustmentStatusItem,
      })),
    [pickLists],
  );

  const selectCorrespondingAdjustmentDeclarationOptions = useMemo(
    () =>
      pickLists.correspondingAdjustmentDeclaration.map(
        adjustmentDeclarationItem => ({
          value: adjustmentDeclarationItem,
          label: adjustmentDeclarationItem,
        }),
      ),
    [pickLists],
  );

  const selectCountriesOptions = useMemo(
    () =>
      pickLists.countries.map(country => ({
        value: country,
        label: country,
      })),
    [pickLists],
  );

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
                  *<FormattedMessage id="project-location-id" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-project-location-id-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.projectLocationId
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'project-location-id',
                })}
                state={InputStateEnum.default}
                value={unitDetails.projectLocationId}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    projectLocationId: value,
                  }))
                }
              />
            </InputContainer>
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
                  })}>
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
                  *<FormattedMessage id="serial-number-pattern" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-serial-number-pattern-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.serialNumberPattern
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'serial-number-pattern',
                })}
                state={InputStateEnum.default}
                value={unitDetails.serialNumberPattern}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    serialNumberPattern: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.serialNumberPattern && (
              <Body size="Small" color="red">
                {errorMessage.serialNumberPattern}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="serial-number-block" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'units-serial-number-block-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorMessage?.serialNumberBlock
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'serial-number-block',
                })}
                state={InputStateEnum.default}
                value={unitDetails.serialNumberBlock}
                onChange={value =>
                  setUnitDetails(prev => ({
                    ...prev,
                    serialNumberBlock: value,
                  }))
                }
              />
            </InputContainer>
            {errorMessage?.serialNumberBlock && (
              <Body size="Small" color="red">
                {errorMessage.serialNumberBlock}
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
                  })}>
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorMessage?.countryJurisdictionOfOwner
                    ? SelectVariantEnum.error
                    : undefined
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectCountriesOptions}
                selected={
                  unitDetails.countryJurisdictionOfOwner
                    ? [
                        {
                          label: unitDetails.countryJurisdictionOfOwner,
                          value: unitDetails.countryJurisdictionOfOwner,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    countryJurisdictionOfOwner: selectedOptions[0].value,
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorMessage?.unitType ? SelectVariantEnum.error : undefined
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectUnitTypeOptions}
                selected={
                  unitDetails.unitType
                    ? [
                        {
                          value: unitDetails.unitType,
                          label: unitDetails.unitType,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitType: selectedOptions[0].value,
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorMessage?.unitStatus ? SelectVariantEnum.error : undefined
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectUnitStatusOptions}
                selected={
                  unitDetails.unitStatus
                    ? [
                        {
                          label: unitDetails.unitStatus,
                          value: unitDetails.unitStatus,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    unitStatus: selectedOptions[0].value,
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
                    })}>
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
                    })}>
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
                  })}>
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
          <div></div>
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
                  })}>
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
                  })}>
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
                    })}>
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorMessage?.correspondingAdjustmentDeclaration
                    ? SelectVariantEnum.error
                    : undefined
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectCorrespondingAdjustmentDeclarationOptions}
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    correspondingAdjustmentDeclaration:
                      selectedOptions[0].value,
                  }))
                }
                selected={
                  unitDetails.correspondingAdjustmentDeclaration
                    ? [
                        {
                          value: unitDetails.correspondingAdjustmentDeclaration,
                          label: unitDetails.correspondingAdjustmentDeclaration,
                        },
                      ]
                    : undefined
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorMessage?.correspondingAdjustmentStatus
                    ? SelectVariantEnum.error
                    : undefined
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectCorrespondingAdjustmentStatusOptions}
                onChange={selectedOptions =>
                  setUnitDetails(prev => ({
                    ...prev,
                    correspondingAdjustmentStatus: selectedOptions[0].value,
                  }))
                }
                selected={
                  unitDetails.correspondingAdjustmentStatus
                    ? [
                        {
                          label: unitDetails.correspondingAdjustmentStatus,
                          value: unitDetails.correspondingAdjustmentStatus,
                        },
                      ]
                    : undefined
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
                    })}>
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
