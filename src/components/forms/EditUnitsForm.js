import _ from 'lodash';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  SelectTypeEnum,
  SelectSizeEnum,
  Select,
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
  Message,
  YearSelect,
  unitsSchema,
  modalTypeEnum,
  FieldRequired,
  StyledFieldRequired,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  LabelContainer,
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';

const EditUnitsForm = ({ onClose }) => {
  const { notification } = useSelector(state => state.app);
  const [labels, setLabelsRepeaterValues] = useState([]);
  const [year, setYear] = useState('');
  const [issuance, setIssuance] = useState([{}]);
  const [editedUnits, setEditUnits] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
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

  const climatewarehouseUnits = useSelector(
    state => state.climateWarehouse.units[0],
  );
  const { pickLists } = useSelector(store => store.climateWarehouse);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const errorMessageAlert = useCallback(
    name => {
      return errorMessage?.map(err => {
        if (_.includes(err, name)) {
          return (
            <Body size="Small" color="red">
              {err}
            </Body>
          );
        } else {
          return null;
        }
      });
    },
    [errorMessage],
  );

  useEffect(() => {
    setEditUnits({
      warehouseUnitId: climatewarehouseUnits.warehouseUnitId,
      projectLocationId: climatewarehouseUnits.projectLocationId,
      unitOwner: climatewarehouseUnits.unitOwner,
      countryJurisdictionOfOwner:
        climatewarehouseUnits.countryJurisdictionOfOwner,
      inCountryJurisdictionOfOwner:
        climatewarehouseUnits.inCountryJurisdictionOfOwner,
      serialNumberBlock: climatewarehouseUnits.serialNumberBlock,
      serialNumberPattern: climatewarehouseUnits.serialNumberBlock,
      marketplace: climatewarehouseUnits.marketplace,
      marketplaceLink: climatewarehouseUnits.marketplaceLink,
      marketplaceIdentifier: climatewarehouseUnits.marketplaceIdentifier,
      unitTags: climatewarehouseUnits.unitTags,
      unitStatusReason: climatewarehouseUnits.unitStatusReason,
      unitRegistryLink: climatewarehouseUnits.unitRegistryLink,
    });
    setIssuance([
      _.pick(
        climatewarehouseUnits.issuance,
        'startDate',
        'endDate',
        'verificationApproach',
        'verificationReportDate',
        'verificationBody',
      ),
    ]);
    setYear(_.get(climatewarehouseUnits, 'vintageYear', ''));
    setLabelsRepeaterValues(
      climatewarehouseUnits.labels.map(label =>
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
  }, [climatewarehouseUnits]);

  const handleEditUnits = async () => {
    const dataToSend = _.cloneDeep(editedUnits);
    for (let key in dataToSend) {
      if (dataToSend[key] === null || dataToSend[key] === '') {
        delete dataToSend[key];
      }
    }

    if (!_.isEmpty(issuance)) {
      for (let key of Object.keys(issuance)) {
        if (issuance[key] === '') {
          delete issuance[key];
        }
      }
      dataToSend.issuance = _.head(issuance);
    }

    if (!_.isEmpty(labels)) {
      for (let i = 0; i < labels.length; i++) {
        for (let key of Object.keys(labels[i])) {
          if (labels[i][key] === '') {
            delete labels[i][key];
          }
        }
      }
      dataToSend.labels = labels;
    }
    if (!_.isEmpty(unitType)) {
      dataToSend.unitType = unitType;
    }
    if (!_.isEmpty(unitStatus)) {
      dataToSend.unitStatus = unitStatus;
    }
    if (!_.isEmpty(year)) {
      dataToSend.vintageYear = year;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentDeclaration)) {
      dataToSend.correspondingAdjustmentDeclaration =
        selectedCorrespondingAdjustmentDeclaration;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentStatus)) {
      dataToSend.correspondingAdjustmentStatus =
        selectedCorrespondingAdjustmentStatus;
    }
    unitsSchema
      .validate(dataToSend, { abortEarly: false })
      .catch(error => setErrorMessage(error.errors));
    const isUnitValid = await unitsSchema.isValid(dataToSend);
    if (isUnitValid) {
      setErrorMessage(null);
      dispatch(updateUnitsRecord(dataToSend));
    }
  };

  const unitWasSuccessfullyEdited =
    notification?.id === 'unit-successfully-edited';
  useEffect(() => {
    if (unitWasSuccessfullyEdited) {
      onClose();
    }
  }, [notification]);

  const errorInputVariant = name => {
    const validSerialNumber = new RegExp(editedUnits['serialNumberPattern']);
    if (editedUnits[name] !== '') {
      if (name === 'serialNumberBlock') {
        if (validSerialNumber.test(editedUnits[name])) {
          return InputVariantEnum.success;
        } else {
          return InputVariantEnum.error;
        }
      } else {
        return InputVariantEnum.success;
      }
    } else if (errorMessageAlert(name)) {
      return InputVariantEnum.error;
    }
    return InputVariantEnum.default;
  };

  return (
    <>
      {notification && !unitWasSuccessfullyEdited && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'edit-unit',
        })}
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={intl.formatMessage({
                  id: 'unit',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'labels',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'issuances',
                })}
              />
            </Tabs>
            <div>
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
                                id: 'units-project-location-id-description',
                              })}
                            >
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            variant={errorInputVariant('projectLocationId')}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-location-id',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.projectLocationId}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                projectLocationId: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('projectLocationId')}
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
                            variant={errorInputVariant('unitOwner')}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-owner',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('unitOwner')}
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
                            variant={errorInputVariant(
                              'countryJurisdictionOfOwner',
                            )}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'country-jurisdiction-of-owner',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.countryJurisdictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                countryJurisdictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('countryJurisdictionOfOwner')}
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
                            variant={errorInputVariant(
                              'inCountryJurisdictionOfOwner',
                            )}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'in-country-jurisdiction-of-owner',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.inCountryJurisdictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                inCountryJurisdictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('inCountryJurisdictionOfOwner')}
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
                            variant={errorInputVariant('serialNumberBlock')}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'serial-number-block',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.serialNumberBlock}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                serialNumberBlock: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('serialNumberBlock')}
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
                            variant={errorInputVariant('serialNumberPattern')}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'serial-number-pattern',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.serialNumberPattern}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                serialNumberPattern: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('serialNumberPattern')}
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
                            onChange={selectedOptions =>
                              setUnitType(selectedOptions[0].value)
                            }
                            placeholder={intl.formatMessage({
                              id: 'select',
                            })}
                            selected={[
                              {
                                label: climatewarehouseUnits.unitType,
                                value: climatewarehouseUnits.unitType,
                              },
                            ]}
                          />
                        </InputContainer>
                        {errorMessageAlert('unitType')}
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
                            value={editedUnits.marketplace}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.marketplaceLink}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.marketplaceIdentifier}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.unitTags}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            options={selectUnitStatusOptions}
                            onChange={selectedOptions =>
                              setUnitStatus(selectedOptions[0].value)
                            }
                            placeholder={intl.formatMessage({
                              id: 'unit-status',
                            })}
                            selected={
                              climatewarehouseUnits.unitStatus
                                ? [
                                    {
                                      label: climatewarehouseUnits.unitStatus,
                                      value: climatewarehouseUnits.unitStatus,
                                    },
                                  ]
                                : undefined
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('unitStatus')}
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
                            value={editedUnits.unitStatusReason}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            variant={errorInputVariant('unitRegistryLink')}
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-registry-link',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitRegistryLink}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitRegistryLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('unitRegistryLink')}
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
                            options={
                              selectCorrespondingAdjustmentDeclarationOptions
                            }
                            onChange={selectedOptions =>
                              setSelectedCorrespondingAdjustmentDeclaration(
                                selectedOptions[0].value,
                              )
                            }
                            placeholder={intl.formatMessage({
                              id: 'corresponding-adjustment-declaration',
                            })}
                            selected={
                              climatewarehouseUnits.correspondingAdjustmentDeclaration
                                ? [
                                    {
                                      label:
                                        climatewarehouseUnits.correspondingAdjustmentDeclaration,
                                      value:
                                        climatewarehouseUnits.correspondingAdjustmentDeclaration,
                                    },
                                  ]
                                : undefined
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert(
                          'correspondingAdjustmentDeclaration',
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
                            options={selectCorrespondingAdjustmentStatusOptions}
                            onChange={selectedOptions =>
                              setSelectedCorrespondingAdjustmentStatus(
                                selectedOptions[0].value,
                              )
                            }
                            placeholder={intl.formatMessage({
                              id: 'corresponding-adjustment-status',
                            })}
                            selected={
                              climatewarehouseUnits.correspondingAdjustmentStatus
                                ? [
                                    {
                                      label:
                                        climatewarehouseUnits.correspondingAdjustmentStatus,
                                      value:
                                        climatewarehouseUnits.correspondingAdjustmentStatus,
                                    },
                                  ]
                                : undefined
                            }
                          />
                        </InputContainer>
                        {errorMessageAlert('correspondingAdjustmentStatus')}
                      </StyledFieldContainer>
                    </BodyContainer>
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
                  max={1}
                  issuanceState={issuance}
                  newIssuanceState={setIssuance}
                />
              </TabPanel>
            </div>
          </div>
        }
      />
    </>
  );
};

export { EditUnitsForm };
