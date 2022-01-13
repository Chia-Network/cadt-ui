import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
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
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';
import { cadValues, casValues, unitStatusValues, unitTypeValues } from '../../utils/helper';

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
  const [newQualifications, setNewQualifications] = useState([]);
  const [newVintage, setNewVintage] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [getUnitType, setUnitType] = useState(unitTypeValues);
  const [getUnitStatus, setUnitStatus] = useState(unitStatusValues);
  const [getCAD, setCAD] = useState(cadValues);
  const [getCAS, setCAS] = useState(casValues);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [newUnits, setNewUnits] = useState({
    countryJuridictionOfOwner: '',
    inCountryJuridictionOfOwner: '',
    serialNumberBlock: '',
    unitIdentifier: '',
    intendedBuyerOrgUid: '',
    marketplace: '',
    tags: '',
    unitTransactionType: '',
    unitStatusReason: '',
    tokenIssuanceHash: '',
    marketplaceIdentifier: '',
    unitsIssuanceLocation: '',
    unitRegistryLink: '',
    unitMarketplaceLink: '',
  });

  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(newUnits);
    for (let key in dataToSend) {
      if (dataToSend[key] === '') {
        delete dataToSend[key];
      }
    }
    if (!_.isEmpty(newVintage)) {
      for (let key of Object.keys(newVintage[0])) {
        if (newVintage[0][key] === '') {
          delete newVintage[0][key];
        }
      }
      dataToSend.vintage = _.head(newVintage);
    }

    if (!_.isEmpty(newQualifications)) {
      for (let i = 0; i < newQualifications.length; i++) {
        for (let key of Object.keys(newQualifications[i])) {
          if (newQualifications[i][key] === '') {
            delete newQualifications[i][key];
          }
        }
      }
      dataToSend.qualifications = newQualifications;
    }

    if (!_.isEmpty(getUnitType)) {
      dataToSend.unitType = getUnitType[0].value;
    }
    if (!_.isEmpty(getUnitStatus)) {
      dataToSend.unitStatus = getUnitStatus[0].value;
    }
    if (!_.isEmpty(getCAD)) {
      dataToSend.correspondingAdjustmentDeclaration = getCAD[0].value;
    }
    if (!_.isEmpty(getCAS)) {
      dataToSend.correspondingAdjustmentStatus = getCAS[0].value;
    }

    dispatch(postNewUnits(dataToSend));
    onClose();
  };
  return (
    <>
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
                  id: 'qualifications',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'vintages',
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
                            <FormattedMessage id="country-juridiction-of-owner" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'country-juridiction-of-owner',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.countryJuridictionOfOwner}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                countryJuridictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="in-country-juridiction-of-owner" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'in-country-juridiction-of-owner',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.inCountryJuridictionOfOwner}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                inCountryJuridictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *<FormattedMessage id="serial-number-block" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
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
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            *<FormattedMessage id="unit-identifier" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-identifier',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitIdentifier}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitIdentifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *<FormattedMessage id="unit-type" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={getUnitType}
                            onChange={value => setUnitType(value)}
                            placeholder="Unit Type"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="intended-buyer-org-uid" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'intended-buyer-org-uid',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.intendedBuyerOrgUid}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                intendedBuyerOrgUid: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="marketplace" />
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
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="tags" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'tags',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.tags}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                tags: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *<FormattedMessage id="unit-status" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={getUnitStatus}
                            onChange={value => setUnitStatus(value)}
                            placeholder="Unit Status"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </BodyContainer>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-transaction-type" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-transaction-type',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitTransactionType}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitTransactionType: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-status-reason" />
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
                            <FormattedMessage id="token-issuance-hash" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'token-issuance-hash',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.tokenIssuanceHash}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                tokenIssuanceHash: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="marketplace-identifier" />
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
                            *<FormattedMessage id="units-issuance-location" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'units-issuance-location',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitsIssuanceLocation}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitsIssuanceLocation: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *<FormattedMessage id="unit-registry-link" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
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
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-marketplace-link" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-marketplace-link',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitMarketplaceLink}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitMarketplaceLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <FormattedMessage id="corresponding-adjustment-declaration" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={getCAD}
                            onChange={value => setCAD(value)}
                            placeholder="CAD"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <FormattedMessage id="corresponding-adjustment-status" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={getCAS}
                            onChange={value => setCAS(value)}
                            placeholder="CAS"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
                  </FormContainerStyle>
                </ModalFormContainerStyle>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <QualificationsRepeater
                  qualificationsState={newQualifications}
                  newQualificationsState={setNewQualifications}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <VintageRepeater
                  max={1}
                  vintageState={
                    Array.isArray(newVintage) ? newVintage : [newVintage]
                  }
                  newVintageState={setNewVintage}
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
