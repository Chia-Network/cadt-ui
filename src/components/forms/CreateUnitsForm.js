import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import { useFormik } from 'formik';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  SelectSizeEnum,
  SelectTypeEnum,
  TabPanel,
  Modal,
  Body,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Select,
  Message,
  ToolTipContainer,
  DescriptionIcon,
  YearSelect,
  unitsSchema,
  modalTypeEnum,
  StyledFieldRequired,
  FieldRequired,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  correspondingAdjustmentDeclarationValues,
  correspondingAdjustmentStatusValues,
  unitStatusValues,
  unitTypeValues,
} from '../../utils/pick-values';
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

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const CreateUnitsForm = withRouter(({ onClose, left, top, width, height }) => {
  const { notification } = useSelector(state => state.app);
  const [newLabels, setNewLabels] = useState([]);
  const [newIssuance, setNewIssuance] = useState([]);
  const [labelValid, setLabelValid] = useState();
  const [issuanceValid, setIssuanceValid] = useState();
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const labelRef = useRef(null);
  const issuanceRef = useRef(null);

  const handleEditUnits = async () => {
    const dataToSend = _.cloneDeep(formik.values);
    const isUnitValid = await unitsSchema.isValid(dataToSend);

    if (tabValue === 0 && isUnitValid) {
      return setTabValue(prev => prev + 1);
    } else if (tabValue === 0 && !isUnitValid) {
      formik.handleSubmit();
      return null;
    }

    if (!_.isEmpty(newLabels) && tabValue === 1) {
      labelRef.current();
      if (labelValid) {
        setTabValue(prev => prev + 1);
      } else {
        return null;
      }
    } else if (_.isEmpty(newLabels) && tabValue === 1) {
      return setTabValue(prev => prev + 1);
    }

    if (tabValue === 2 && !_.isEmpty(newIssuance)) {
      issuanceRef.current();
    }
console.log(newLabels)
    if (tabValue === 2) {
      if (isUnitValid) {
        if (labelValid) {
          dataToSend.labels = newLabels;
        }
        if (issuanceValid) {
          dataToSend.issuance = newIssuance[0];
          return dispatch(postNewUnits(dataToSend));
        }
        for (let key in dataToSend) {
          if (dataToSend[key] === '') {
            delete dataToSend[key];
          }
        }
        if (_.isEmpty(newIssuance)) {
          return dispatch(postNewUnits(dataToSend));
        }
      } else {
        return null;
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      projectLocationId: '',
      unitOwner: '',
      countryJurisdictionOfOwner: '',
      inCountryJurisdictionOfOwner: '',
      serialNumberBlock: '',
      serialNumberPattern: '',
      marketplace: '',
      marketplaceLink: '',
      marketplaceIdentifier: '',
      unitTags: '',
      unitStatusReason: '',
      unitRegistryLink: '',
      unitType: '',
      vintageYear: '',
      unitStatus: '',
      correspondingAdjustmentDeclaration: '',
      correspondingAdjustmentStatus: '',
    },
    validationSchema: unitsSchema,
    validateOnChange: true,
    onSubmit: handleEditUnits,
  });

  const unitWasSuccessfullyCreated =
    notification?.id === 'unit-successfully-created';

  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  const errorInputAlert = name => {
    if (formik.touched[name]) {
      if (formik.errors[name]) {
        return InputVariantEnum.error;
      } else {
        return InputVariantEnum.success;
      }
    }
    return InputVariantEnum.default;
  };

  return (
    <>
      {notification && !unitWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        left={left}
        top={top}
        width={width}
        height={height}
        onOk={handleEditUnits}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'create-unit',
        })}
        label={intl.formatMessage({
          id: tabValue !== 2 ? 'next' : 'create',
        })}
        extraButtonLabel={
          tabValue > 0
            ? intl.formatMessage({
                id: 'back',
              })
            : undefined
        }
        extraButtonOnClick={() =>
          setTabValue(prev => (prev > 0 ? prev - 1 : prev))
        }
        body={
          <StyledFormContainer onSubmit={formik.handleSubmit}>
            <Stepper activeStep={tabValue} alternativeLabel>
              <Step onClick={() => setTabValue(0)} sx={{ cursor: 'pointer' }}>
                <StepLabel>
                  {intl.formatMessage({
                    id: 'unit',
                  })}
                </StepLabel>
              </Step>
              <Step onClick={() => setTabValue(1)} sx={{ cursor: 'pointer' }}>
                <StepLabel>
                  {intl.formatMessage({
                    id: 'labels',
                  })}
                </StepLabel>
              </Step>
              <Step onClick={() => setTabValue(2)} sx={{ cursor: 'pointer' }}>
                <StepLabel>
                  {intl.formatMessage({
                    id: 'issuances',
                  })}
                </StepLabel>
              </Step>
            </Stepper>
            <TabPanel
              style={{ paddingTop: '1.25rem' }}
              value={tabValue}
              index={0}>
              <ModalFormContainerStyle>
                <FormContainerStyle>
                  <BodyContainer>
                    <FieldRequired />
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                        <StandardInput
                          name="projectLocationId"
                          variant={
                            formik.touched.projectLocationId &&
                            errorInputAlert('projectLocationId')
                          }
                          onInputBlur={formik.handleBlur}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'project-location-id',
                          })}
                          state={InputStateEnum.default}
                          onChange={formik.handleChange}
                          value={formik.values.projectLocationId}
                        />
                      </InputContainer>
                      {formik.errors.projectLocationId &&
                        formik.touched.projectLocationId && (
                          <Body size="Small" color="red">
                            {formik.errors.projectLocationId}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                          name="unitOwner"
                          variant={
                            formik.touched.unitOwner &&
                            errorInputAlert('unitOwner')
                          }
                          onInputBlur={formik.handleBlur}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-owner',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.unitOwner}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.unitOwner && formik.touched.unitOwner && (
                        <Body size="Small" color="red">
                          {formik.errors.unitOwner}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="country-jurisdiction-of-owner" />
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
                        <StandardInput
                          name="countryJurisdictionOfOwner"
                          variant={
                            formik.touched.countryJurisdictionOfOwner &&
                            errorInputAlert('countryJurisdictionOfOwner')
                          }
                          onInputBlur={formik.handleBlur}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'country-jurisdiction-of-owner',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.countryJurisdictionOfOwner}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.countryJurisdictionOfOwner &&
                        formik.touched.countryJurisdictionOfOwner && (
                          <Body size="Small" color="red">
                            {formik.errors.countryJurisdictionOfOwner}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                          name="inCountryJurisdictionOfOwner"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.inCountryJurisdictionOfOwner &&
                            errorInputAlert('inCountryJurisdictionOfOwner')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'in-country-jurisdiction-of-owner',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.inCountryJurisdictionOfOwner}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.inCountryJurisdictionOfOwner &&
                        formik.touched.inCountryJurisdictionOfOwner && (
                          <Body size="Small" color="red">
                            {formik.errors.inCountryJurisdictionOfOwner}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="serial-number-block" />
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
                          name="serialNumberBlock"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.serialNumberBlock &&
                            errorInputAlert('serialNumberBlock')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'serial-number-block',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.serialNumberBlock}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.serialNumberBlock &&
                        formik.touched.serialNumberBlock && (
                          <Body size="Small" color="red">
                            {formik.errors.serialNumberBlock}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="serial-number-pattern" />
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
                          name="serialNumberPattern"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.serialNumberPattern &&
                            errorInputAlert('serialNumberPattern')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'serial-number-pattern',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.serialNumberPattern}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.serialNumberPattern &&
                        formik.touched.serialNumberPattern && (
                          <Body size="Small" color="red">
                            {formik.errors.serialNumberPattern}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body style={{ color: '#262626' }}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="vintage-year" />
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
                          size="large"
                          yearValue={formik.values.vintageYear}
                          onChange={value =>
                            formik.setFieldValue('vintageYear', value.$y)
                          }
                        />
                      </InputContainer>
                      {formik.errors.vintageYear && formik.touched.vintageYear && (
                        <Body size="Small" color="red">
                          {formik.errors.vintageYear}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-type" />
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
                          value={formik.values.unitType}
                          onChange={value =>
                            formik.setFieldValue('unitType', value[0].value)
                          }
                          onBlur={formik.handleBlur}
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={unitTypeValues}
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {formik.errors.unitType && formik.touched.unitType && (
                        <Body size="Small" color="red">
                          {formik.errors.unitType}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                          name="marketplace"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.marketplace &&
                            errorInputAlert('marketplace')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.marketplace}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.marketplace && formik.touched.marketplace && (
                        <Body size="Small" color="red">
                          {formik.errors.marketplace}
                        </Body>
                      )}
                    </StyledFieldContainer>
                  </BodyContainer>
                  <BodyContainer>
                    <StyledFieldRequired />
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                      <InputContainer>
                        <StandardInput
                          name="marketplaceLink"
                          onInputBlur={formik.handleBlur}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace-link',
                          })}
                          variant={
                            formik.touched.marketplaceLink &&
                            errorInputAlert('marketplaceLink')
                          }
                          state={InputStateEnum.default}
                          value={formik.values.marketplaceLink}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.marketplaceLink &&
                        formik.touched.marketplaceLink && (
                          <Body size="Small" color="red">
                            {formik.errors.marketplaceLink}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                          name="marketplaceIdentifier"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.marketplaceIdentifier &&
                            errorInputAlert('marketplaceIdentifier')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace-identifier',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.marketplaceIdentifier}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.marketplaceIdentifier &&
                        formik.touched.marketplaceIdentifier && (
                          <Body size="Small" color="red">
                            {formik.errors.marketplaceIdentifier}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
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
                      <InputContainer>
                        <StandardInput
                          name="unitTags"
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-tags',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.unitTags}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-status" />
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
                          onBlur={formik.handleBlur}
                          onChange={value =>
                            formik.setFieldValue('unitStatus', value[0].value)
                          }
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={unitStatusValues}
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {formik.errors.unitStatus && formik.touched.unitStatus && (
                        <Body size="Small" color="red">
                          {formik.errors.unitStatus}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
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
                      <InputContainer>
                        <StandardInput
                          name="unitStatusReason"
                          onInputBlur={formik.handleBlur}
                          variant={
                            formik.touched.unitStatusReason &&
                            errorInputAlert('unitStatusReason')
                          }
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-status-reason',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.unitStatusReason}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.unitStatusReason &&
                        formik.touched.unitStatusReason && (
                          <Body size="Small" color="red">
                            {formik.errors.unitStatusReason}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-registry-link" />
                          </LabelContainer>
                          <ToolTipContainer
                            tooltip={intl.formatMessage({
                              id: 'units-unit-registry-link-description',
                            })}>
                            <DescriptionIcon height="14" width="14" />
                          </ToolTipContainer>
                        </Body>
                      </StyledLabelContainer>
                      <InputContainer>
                        <StandardInput
                          name="unitRegistryLink"
                          variant={
                            formik.touched.unitRegistryLink &&
                            errorInputAlert('unitRegistryLink')
                          }
                          onInputBlur={formik.handleBlur}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-registry-link',
                          })}
                          state={InputStateEnum.default}
                          value={formik.values.unitRegistryLink}
                          onChange={formik.handleChange}
                        />
                      </InputContainer>
                      {formik.errors.unitRegistryLink &&
                        formik.touched.unitRegistryLink && (
                          <Body size="Small" color="red">
                            {formik.errors.unitRegistryLink}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
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
                          onChange={value =>
                            formik.setFieldValue(
                              'correspondingAdjustmentDeclaration',
                              value[0].value,
                            )
                          }
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={correspondingAdjustmentDeclarationValues}
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {formik.errors.correspondingAdjustmentDeclaration &&
                        formik.touched.correspondingAdjustmentDeclaration && (
                          <Body size="Small" color="red">
                            {formik.errors.correspondingAdjustmentDeclaration}
                          </Body>
                        )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body color={'#262626'}>
                          *
                          <LabelContainer>
                            <FormattedMessage id="corresponding-adjustment-status" />
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
                          onChange={value =>
                            formik.setFieldValue(
                              'correspondingAdjustmentStatus',
                              value[0].value,
                            )
                          }
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={correspondingAdjustmentStatusValues}
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {formik.errors.correspondingAdjustmentStatus &&
                        formik.touched.correspondingAdjustmentStatus && (
                          <Body size="Small" color="red">
                            {formik.errors.correspondingAdjustmentStatus}
                          </Body>
                        )}
                    </StyledFieldContainer>
                  </BodyContainer>
                </FormContainerStyle>
              </ModalFormContainerStyle>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <LabelsRepeater
                labelsState={newLabels}
                newLabelsState={setNewLabels}
                labelRef={labelRef}
                setLabelValid={setLabelValid}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <IssuanceRepeater
                max={1}
                issuanceState={
                  Array.isArray(newIssuance) ? newIssuance : [newIssuance]
                }
                newIssuanceState={setNewIssuance}
                issuanceRef={issuanceRef}
                setIssuanceValid={setIssuanceValid}
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateUnitsForm };
