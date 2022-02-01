import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  SelectSizeEnum,
  SelectTypeEnum,
  Tabs,
  Tab,
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

const CreateUnitsForm = withRouter(({ onClose }) => {
  const { notification } = useSelector(state => state.app);
  const [newLabels, setNewLabels] = useState([]);
  const [newIssuance, setNewIssuance] = useState([]);
  const [year, setYear] = useState();
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
  });

  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(newUnits);
    for (let key in dataToSend) {
      if (dataToSend[key] === '') {
        delete dataToSend[key];
      }
    }
    if (!_.isEmpty(newIssuance)) {
      for (let key of Object.keys(newIssuance[0])) {
        if (newIssuance[0][key] === '') {
          delete newIssuance[0][key];
        }
      }
      dataToSend.issuance = _.head(newIssuance);
    }

    if (!_.isEmpty(newLabels)) {
      for (let i = 0; i < newLabels.length; i++) {
        for (let key of Object.keys(newLabels[i])) {
          if (newLabels[i][key] === '') {
            delete newLabels[i][key];
          }
        }
      }
      dataToSend.labels = newLabels;
    }

    if (!_.isEmpty(unitType)) {
      dataToSend.unitType = unitType[0].value;
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

    unitsSchema
      .validate(dataToSend, { abortEarly: false })
      .then(result => console.log(result))
      .catch(error => setErrorMessage(error.errors));
    dispatch(postNewUnits(dataToSend));
  };

  const unitWasSuccessfullyCreated =
    notification && notification.id === 'unit-successfully-created';
  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  const errorMessageAlert = name => {
    return errorMessage?.map(err => {
      if (_.includes(err, name)) {
        return (
          <Body size="Small" color="red">
            {err}
          </Body>
        );
      }
    });
  };

  const errorInputVariant = name => {
    if (newUnits[name] !== '') {
      return InputVariantEnum.success;
    } else if (errorMessageAlert(name)) {
      return InputVariantEnum.error;
    }
    return InputVariantEnum.default;
  };

  return (
    <>
      {notification && !unitWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        basic
        form
        showButtons
        title={intl.formatMessage({
          id: 'create-unit',
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
                  id: 'issuance',
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
                            variant={errorInputVariant('projectLocationId')}
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
                          {errorMessageAlert('projectLocationId')}
                        </InputContainer>
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
                            variant={errorInputVariant('unitOwner')}
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
                        {errorMessageAlert('unitOwner')}
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
                            variant={errorInputVariant(
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
                        {errorMessageAlert('countryJurisdictionOfOwner')}
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
                            variant={errorInputVariant(
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
                        {errorMessageAlert('inCountryJurisdictionOfOwner')}
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
                            variant={errorInputVariant('serialNumberBlock')}
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
                        {errorMessageAlert('serialNumberBlock')}
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
                            variant={errorInputVariant('serialNumberPattern')}
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
                        {errorMessageAlert('serialNumberPattern')}
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                            yearValue={year}
                            setYearValue={setYear}
                          />
                        </InputContainer>
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
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={unitTypeValues}
                            onChange={value => setUnitType(value)}
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                          />
                          {errorMessageAlert('unitType')}
                        </InputContainer>
                      </StyledFieldContainer>
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={unitStatusValues}
                            onChange={value => setUnitStatus(value)}
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                          />
                        </InputContainer>
                        {errorMessageAlert('unitStatus')}
                      </StyledFieldContainer>
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
                            variant={errorInputVariant('unitRegistryLink')}
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
                          {errorMessageAlert('unitRegistryLink')}
                        </InputContainer>
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
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={correspondingAdjustmentDeclarationValues}
                            onChange={value =>
                              setSelectedCorrespondingAdjustmentDeclaration(
                                value,
                              )
                            }
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                          />
                        </InputContainer>
                        {errorMessageAlert(
                          'correspondingAdjustmentDeclaration',
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
                          {errorMessageAlert('correspondingAdjustmentStatus')}
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
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
            </div>
          </div>
        }
      />
    </>
  );
});

export { CreateUnitsForm };
