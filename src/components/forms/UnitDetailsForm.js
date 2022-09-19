import _ from 'lodash';
import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

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
  YearSelectVariantEnum,
  RequiredContainer,
  SpanTwoColumnsContainer,
  HrSpanTwoColumnsContainer,
  SimpleSelectVariantEnum,
  FormikError,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
  SelectVariantEnum,
  SelectCreatable,
  SimpleSelectStateEnum,
} from '..';

const UnitDetailsForm = () => {
  const intl = useIntl();
  const { pickLists, myProjects, issuances } = useSelector(
    store => store.climateWarehouse,
  );

  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext();

  const hasUserInteractedWithForm = useMemo(
    () => !_.isEmpty(touched),
    [touched],
  );

  const [selectedWarehouseProjectOption, setSelectedWarehouseProjectOption] =
    useState(null);

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
      values?.issuance &&
      issuances?.length > 0 &&
      selectedWarehouseProjectOption === null &&
      projectsSelectOptions
    ) {
      const currentUnitIssuanceId = values.issuance.id;

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
  }, [values, issuances, projectsSelectOptions]);

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
          issuanceItem => issuanceItem?.id === values?.issuance?.id,
        );
      if (!isCurrentSavedIssuanceOnTheSelectedProject) {
        setFieldValue('projectLocationId', '');
        setFieldValue('issuance', null);
      }
    },
    [
      selectedWarehouseProjectOption,
      setSelectedWarehouseProjectOption,
      setFieldValue,
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
          {/* the input below is not connected to formik */}
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
                    })}>
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
                    ((hasUserInteractedWithForm &&
                      !selectedWarehouseProjectOption) ||
                      (selectedWarehouseProjectOption &&
                        selectedWarehouseProjectOption?.value?.issuances
                          ?.length === 0)) &&
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
              {/* display error if form validation is on and user didn't select any project */}
              {hasUserInteractedWithForm && !selectedWarehouseProjectOption && (
                <Body size="Small" color="red">
                  <FormattedMessage id="select-existing-project" />
                </Body>
              )}
              {/* display error if user selected a project with no issuances */}
              {selectedWarehouseProjectOption &&
                selectedWarehouseProjectOption?.value?.issuances?.length ===
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SelectCreatable
                variant={
                  (errors?.projectLocationId &&
                    touched?.projectLocationId &&
                    SimpleSelectVariantEnum.error) ||
                  (projectLocationIdOptions.length === 0
                    ? SimpleSelectStateEnum.disabled
                    : SimpleSelectStateEnum.default)
                }
                options={projectLocationIdOptions}
                selected={values.projectLocationId}
                onChange={val => setFieldValue('projectLocationId', val)}
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="projectLocationId" />
            {selectedWarehouseProjectOption &&
              projectLocationIdOptions.length === 0 && (
                <Body size="Small">
                  <FormattedMessage id="project-has-no-locations" />
                </Body>
              )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="unit-owner" />
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
                  errors.unitOwner && touched.unitOwner
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-owner',
                })}
                state={InputStateEnum.default}
                value={values.unitOwner}
                onChange={value => setFieldValue('unitOwner', value)}
                onBlur={handleBlur}
                name="unitOwner"
              />
            </InputContainer>
            <FormikError name="unitOwner" />
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors.unitBlockStart && touched.unitBlockStart
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-block-start',
                })}
                state={InputStateEnum.default}
                value={values.unitBlockStart}
                onChange={value => setFieldValue('unitBlockStart', value)}
                onBlur={handleBlur}
                name="unitBlockStart"
              />
            </InputContainer>
            <FormikError name="unitBlockStart" />
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors.unitBlockEnd && touched.unitBlockEnd
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-block-end',
                })}
                state={InputStateEnum.default}
                value={values.unitBlockEnd}
                onChange={value => setFieldValue('unitBlockEnd', value)}
                onBlur={handleBlur}
                name="unitBlockEnd"
              />
            </InputContainer>
            <FormikError name="unitBlockEnd" />
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors.unitCount && touched.unitCount
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-count',
                })}
                state={InputStateEnum.default}
                value={values.unitCount}
                onChange={value => setFieldValue('unitCount', value)}
                onBlur={handleBlur}
                name="unitCount"
              />
            </InputContainer>
            <FormikError name="unitCount" />
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
                  errors.inCountryJurisdictionOfOwner &&
                  touched.inCountryJurisdictionOfOwner
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'in-country-jurisdiction-of-owner',
                })}
                state={InputStateEnum.default}
                value={values.inCountryJurisdictionOfOwner}
                onChange={value =>
                  setFieldValue('inCountryJurisdictionOfOwner', value)
                }
                onBlur={handleBlur}
                name="inCountryJurisdictionOfOwner"
              />
            </InputContainer>
            <FormikError name="inCountryJurisdictionOfOwner" />
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
              <SelectCreatable
                variant={
                  errors.countryJurisdictionOfOwner &&
                  touched.countryJurisdictionOfOwner &&
                  SimpleSelectVariantEnum.error
                }
                options={pickLists.countries}
                selected={values.countryJurisdictionOfOwner}
                onChange={val =>
                  setFieldValue('countryJurisdictionOfOwner', val)
                }
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="countryJurisdictionOfOwner" />
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
              <SelectCreatable
                variant={
                  errors.unitType &&
                  touched.unitType &&
                  SimpleSelectVariantEnum.error
                }
                options={pickLists.unitType}
                selected={values.unitType}
                onChange={val => setFieldValue('unitType', val)}
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="unitType" />
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
              <SelectCreatable
                variant={
                  errors.unitStatus &&
                  touched.unitStatus &&
                  SimpleSelectVariantEnum.error
                }
                options={pickLists.unitStatus}
                selected={values.unitStatus}
                onChange={val => setFieldValue('unitStatus', val)}
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="unitStatus" />
          </StyledFieldContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  <LabelContainer>
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
                  errors.unitStatusReason && touched.unitStatusReason
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-status-reason',
                })}
                state={InputStateEnum.default}
                value={values.unitStatusReason}
                onChange={value => setFieldValue('unitStatusReason', value)}
                onBlur={handleBlur}
                name="unitStatusReason"
              />
              <FormikError name="unitStatusReason" />
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
                  errors.unitRegistryLink && touched.unitRegistryLink
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-registry-link',
                })}
                state={InputStateEnum.default}
                value={values.unitRegistryLink}
                onChange={value => setFieldValue('unitRegistryLink', value)}
                onBlur={handleBlur}
                name="unitRegistryLink"
              />
              <FormikError name="unitRegistryLink" />
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
                  errors.vintageYear && touched.vintageYear
                    ? YearSelectVariantEnum.error
                    : undefined
                }
                size="large"
                yearValue={values.vintageYear}
                onChange={value => setFieldValue('vintageYear', value)}
                name="vintageYear"
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="vintageYear" />
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
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors.marketplace && touched.marketplace
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace',
                })}
                state={InputStateEnum.default}
                value={values.marketplace}
                onChange={value => setFieldValue('marketplace', value)}
                onBlur={handleBlur}
                name="marketplace"
              />
            </InputContainer>
            <FormikError name="marketplace" />
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
                  errors.marketplaceIdentifier && touched.marketplaceIdentifier
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace-identifier',
                })}
                state={InputStateEnum.default}
                value={values.marketplaceIdentifier}
                onChange={value =>
                  setFieldValue('marketplaceIdentifier', value)
                }
                onBlur={handleBlur}
                name="marketplaceIdentifier"
              />
            </InputContainer>
            <FormikError name="marketplaceIdentifier" />
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
                  errors.marketplaceLink && touched.marketplaceLink
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'marketplace-link',
                })}
                state={InputStateEnum.default}
                value={values.marketplaceLink}
                onChange={value => setFieldValue('marketplaceLink', value)}
                onBlur={handleBlur}
                name="marketplaceLink"
              />
              <FormikError name="marketplaceLink" />
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
              <SelectCreatable
                variant={
                  errors.correspondingAdjustmentDeclaration &&
                  touched.correspondingAdjustmentDeclaration &&
                  SimpleSelectVariantEnum.error
                }
                options={pickLists.correspondingAdjustmentDeclaration}
                selected={values.correspondingAdjustmentDeclaration}
                onChange={val =>
                  setFieldValue('correspondingAdjustmentDeclaration', val)
                }
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="correspondingAdjustmentDeclaration" />
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
              <SelectCreatable
                variant={
                  errors.correspondingAdjustmentStatus &&
                  touched.correspondingAdjustmentStatus &&
                  SimpleSelectVariantEnum.error
                }
                options={pickLists.correspondingAdjustmentStatus}
                selected={values.correspondingAdjustmentStatus}
                onChange={val =>
                  setFieldValue('correspondingAdjustmentStatus', val)
                }
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name="correspondingAdjustmentStatus" />
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
              <SelectCreatable
                isMulti
                options={pickLists?.unitTags}
                variant={
                  errors?.unitTags && touched?.unitTags
                    ? SimpleSelectVariantEnum.error
                    : undefined
                }
                selected={values?.unitTags ? [...values?.unitTags] : []}
                onChange={value => setFieldValue('unitTags', value)}
                onBlur={handleBlur}
              />
              <FormikError name="unitTags" />
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
        </BodyContainer>
      </FormContainerStyle>
    </ModalFormContainerStyle>
  );
};

export { UnitDetailsForm };
