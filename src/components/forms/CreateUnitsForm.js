import _ from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';

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
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  LabelContainer,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  correspondingAdjustmentDeclarationValues,
  correspondingAdjustmentStatusValues,
  unitStatusValues,
} from '../../utils/pick-values';

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
  const [year, setYear] = useState();
  const [errorMessage, setErrorMessage] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [unitType, setUnitType] = useState(null);
  const [unitStatus, setUnitStatus] = useState(null);
  const [
    selectedCorrespondingAdjustmentDeclaration,
    setSelectedCorrespondingAdjustmentDeclaration,
  ] = useState(null);
  const [
    selectedCorrespondingAdjustmentStatus,
    setSelectedCorrespondingAdjustmentStatus,
  ] = useState(null);
  const [newUnits, setNewUnits] = useState({
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
    unitStatus: '',
    correspondingAdjustmentDeclaration: '',
    correspondingAdjustmentStatus: '',
  });
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const selectUnitTypeOptions = useMemo(
    () =>
      pickLists.unitType.map(country => ({
        value: country,
        label: country,
      })),
    [pickLists],
  );

  const handleEditUnits = async () => {
    setErrorMessage({});
    const dataToSend = _.cloneDeep(newUnits);

    if (!_.isEmpty(newLabels) && tabValue === 1) {
      for (let i = 0; i < newLabels.length; i++) {
        for (let key of Object.keys(newLabels[i])) {
          if (newLabels[i][key] === '') {
            delete newLabels[i][key];
          }
        }
      }
      dataToSend.labels = newLabels;
    } else if (_.isEmpty(newLabels) && tabValue === 1) {
      setTabValue(prev => prev + 1);
    }

    if (!_.isEmpty(newIssuance)) {
      for (let key of Object.keys(newIssuance[0])) {
        if (newIssuance[0][key] === '') {
          delete newIssuance[0][key];
        }
      }

      dataToSend.issuance = _.head(newIssuance);
    }

    if (!_.isEmpty(unitType)) {
      dataToSend.unitType = unitType;
    }
    if (!_.isEmpty(unitStatus)) {
      dataToSend.unitStatus = unitStatus[0].value;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentDeclaration)) {
      dataToSend.correspondingAdjustmentDeclaration =
        selectedCorrespondingAdjustmentDeclaration[0].value;
    }
    if (!_.isEmpty(year)) {
      dataToSend.vintageYear = year;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentStatus)) {
      dataToSend.correspondingAdjustmentStatus =
        selectedCorrespondingAdjustmentStatus[0].value;
    }
    await unitsSchema
      .validate(dataToSend, { abortEarly: false })
      .catch(({ errors }) => {
        for (let key in dataToSend) {
          for (let err of errors) {
            if (err.includes(key)) {
              setErrorMessage(prev => ({ ...prev, [key]: err }));
            }
          }
        }
      });

    const isUnitValid = await unitsSchema.isValid(dataToSend);
    if (tabValue === 0 && isUnitValid) {
      setTabValue(prev => prev + 1);
    }

    if (tabValue === 2) {
      for (let key in dataToSend) {
        if (dataToSend[key] === '') {
          delete dataToSend[key];
        }
      }
      dispatch(postNewUnits(dataToSend));
    }
  };

  const unitWasSuccessfullyCreated =
    notification?.id === 'unit-successfully-created';

  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  const errorInputAlert = name => {
    for (let key in errorMessage) {
      if (key === name) {
        return InputVariantEnum.error;
      } else if (!errorMessage[name]) {
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
          <StyledFormContainer>
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
              index={0}
            >
              <ModalFormContainerStyle>
                <FormContainerStyle>
                  <BodyContainer>
                    <FieldRequired />
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          *
                          <LabelContainer>
                            <FormattedMessage id="project-location-id" />
                          </LabelContainer>
                          <ToolTipContainer
                            tooltip={intl.formatMessage({
                              id: 'project-location-id',
                            })}
                          >
                            <DescriptionIcon height="14" width="14" />
                          </ToolTipContainer>
                        </Body>
                      </StyledLabelContainer>
                      <InputContainer>
                        <StandardInput
                          variant={errorInputAlert('projectLocationId')}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'project-location-id',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.projectLocationId}
                          onChange={value =>
                            setNewUnits(prev => ({
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
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-owner" />
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
                          variant={errorInputAlert('unitOwner')}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-owner',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.unitOwner}
                          onChange={value =>
                            setNewUnits(prev => ({
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
                          *
                          <LabelContainer>
                            <FormattedMessage id="country-jurisdiction-of-owner" />
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
                        <StandardInput
                          variant={errorInputAlert(
                            'countryJurisdictionOfOwner',
                          )}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'country-jurisdiction-of-owner',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.countryJurisdictionOfOwner}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              countryJurisdictionOfOwner: value,
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
                          *
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
                          variant={errorInputAlert(
                            'inCountryJurisdictionOfOwner',
                          )}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'in-country-jurisdiction-of-owner',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.inCountryJurisdictionOfOwner}
                          onChange={value =>
                            setNewUnits(prev => ({
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
                          *
                          <LabelContainer>
                            <FormattedMessage id="serial-number-block" />
                          </LabelContainer>
                          <ToolTipContainer
                            tooltip={intl.formatMessage({
                              id: 'units-serial-number-block-description',
                            })}
                          >
                            <DescriptionIcon height="14" width="14" />
                          </ToolTipContainer>
                        </Body>
                      </StyledLabelContainer>
                      <InputContainer>
                        <StandardInput
                          variant={errorInputAlert('serialNumberBlock')}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'serial-number-block',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.serialNumberBlock}
                          onChange={value =>
                            setNewUnits(prev => ({
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
                          *
                          <LabelContainer>
                            <FormattedMessage id="serial-number-pattern" />
                          </LabelContainer>
                          <ToolTipContainer
                            tooltip={intl.formatMessage({
                              id: 'units-serial-number-pattern-description',
                            })}
                          >
                            <DescriptionIcon height="14" width="14" />
                          </ToolTipContainer>
                        </Body>
                      </StyledLabelContainer>
                      <InputContainer>
                        <StandardInput
                          variant={errorInputAlert('serialNumberPattern')}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'serial-number-pattern',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.serialNumberPattern}
                          onChange={value =>
                            setNewUnits(prev => ({
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
                            <FormattedMessage id="vintage-year" />
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
                          size="large"
                          yearValue={year}
                          setYearValue={setYear}
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-type" />
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
                        <Select
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={selectUnitTypeOptions}
                          selected={
                            unitType
                              ? [{ value: unitType, label: unitType }]
                              : undefined
                          }
                          onChange={selectedOptions =>
                            setUnitType(selectedOptions[0].value)
                          }
                          placeholder={intl.formatMessage({
                            id: 'unit-type',
                          })}
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
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.marketplace}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              marketplace: value,
                            }))
                          }
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                  </BodyContainer>
                  <BodyContainer>
                    <StyledFieldRequired />
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
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
                      <InputContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace-link',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.marketplaceLink}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              marketplaceLink: value,
                            }))
                          }
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
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
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'marketplace-identifier',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.marketplaceIdentifier}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              marketplaceIdentifier: value,
                            }))
                          }
                        />
                      </InputContainer>
                    </StyledFieldContainer>
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
                      <InputContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-tags',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.unitTags}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              unitTags: value,
                            }))
                          }
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-status" />
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
                        <Select
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={unitStatusValues}
                          onChange={value => setUnitStatus(value)}
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {errorMessage?.unitStatus && (
                        <Body size="Small" color="red">
                          {errorMessage.unitStatus}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          <LabelContainer>
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
                      <InputContainer>
                        <StandardInput
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-status-reason',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.unitStatusReason}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              unitStatusReason: value,
                            }))
                          }
                        />
                      </InputContainer>
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          *
                          <LabelContainer>
                            <FormattedMessage id="unit-registry-link" />
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
                      <InputContainer>
                        <StandardInput
                          variant={errorInputAlert('unitRegistryLink')}
                          size={InputSizeEnum.large}
                          placeholderText={intl.formatMessage({
                            id: 'unit-registry-link',
                          })}
                          state={InputStateEnum.default}
                          value={newUnits.unitRegistryLink}
                          onChange={value =>
                            setNewUnits(prev => ({
                              ...prev,
                              unitRegistryLink: value,
                            }))
                          }
                        />
                      </InputContainer>
                      {errorMessage.unitRegistryLink && (
                        <Body size="Small" color="red">
                          {errorMessage.unitRegistryLink}
                        </Body>
                      )}
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabelContainer>
                        <Body>
                          *
                          <LabelContainer>
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
                        <Select
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={correspondingAdjustmentDeclarationValues}
                          onChange={value =>
                            setSelectedCorrespondingAdjustmentDeclaration(value)
                          }
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
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
                          *
                          <LabelContainer>
                            <FormattedMessage id="corresponding-adjustment-status" />
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
                        <Select
                          size={SelectSizeEnum.large}
                          type={SelectTypeEnum.basic}
                          options={correspondingAdjustmentStatusValues}
                          onChange={value =>
                            setSelectedCorrespondingAdjustmentStatus(value)
                          }
                          placeholder={`-- ${intl.formatMessage({
                            id: 'select',
                          })} --`}
                        />
                      </InputContainer>
                      {errorMessage?.correspondingAdjustmentStatus && (
                        <Body size="Small" color="red">
                          {errorMessage.correspondingAdjustmentStatus}
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
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <IssuanceRepeater
                max={1}
                issuanceState={
                  Array.isArray(newIssuance) ? newIssuance : [newIssuance]
                }
                newIssuanceState={setNewIssuance}
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateUnitsForm };
