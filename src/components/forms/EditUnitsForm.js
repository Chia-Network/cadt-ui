import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
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
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  cadValues,
  casValues,
  unitStatusValues,
  unitTypeValues,
} from '../../utils/pick-values';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;
const InputContainer = styled('div')`
  width: 20rem;
`;

const EditUnitsForm = ({ data, onClose }) => {
  const [qualifications, setQualificationsRepeaterValues] = useState([]);
  const [vintage, setVintage] = useState([]);
  const [editedUnits, setEditUnits] = useState([]);
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

  useEffect(() => {
    setEditUnits({
      warehouseUnitId: data.warehouseUnitId,
      countryJuridictionOfOwner: data.countryJuridictionOfOwner,
      inCountryJuridictionOfOwner: data.inCountryJuridictionOfOwner,
      serialNumberBlock: data.serialNumberBlock,
      unitIdentifier: data.unitIdentifier,
      intendedBuyerOrgUid: data.intendedBuyerOrgUid,
      marketplace: data.marketplace,
      tags: data.tags,
      unitTransactionType: data.unitTransactionType,
      unitStatusReason: data.unitStatusReason,
      tokenIssuanceHash: data.tokenIssuanceHash,
      marketplaceIdentifier: data.marketplaceIdentifier,
      unitsIssuanceLocation: data.unitsIssuanceLocation,
      unitRegistryLink: data.unitRegistryLink,
      unitMarketplaceLink: data.unitMarketplaceLink,
    });
    setVintage(_.get(data, 'vintage', {}));
    setQualificationsRepeaterValues(_.get(data, 'qualifications', []));
  }, [data]);

  const handleEditUnits = () => {
    for (let key of Object.keys(editedUnits)) {
      if (editedUnits[key] === null || editedUnits[key] === '') {
        delete editedUnits[key];
      }
    }
    const dataToSend = _.cloneDeep(editedUnits);

    if (!_.isEmpty(vintage)) {
      for (let key of Object.keys(vintage[0])) {
        if (vintage[0][key] === '') {
          delete vintage[0][key];
        }
      }
      dataToSend.vintage = _.head(vintage);
    }

    if (!_.isEmpty(qualifications)) {
      for (let i = 0; i < qualifications.length; i++) {
        for (let key of Object.keys(qualifications[i])) {
          if (qualifications[i][key] === '') {
            delete qualifications[i][key];
          }
        }
      }
      dataToSend.qualifications = qualifications;
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
    if (!_.isEmpty(selectedCorrespondingAdjustmentStatus)) {
      dataToSend.correspondingAdjustmentStatus =
        selectedCorrespondingAdjustmentStatus[0].value;
    }

    dispatch(updateUnitsRecord(dataToSend));
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
                          <Body style={{ color: '#262626' }}>
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
                            value={editedUnits.countryJuridictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                countryJuridictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                            value={editedUnits.inCountryJuridictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                inCountryJuridictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                            value={editedUnits.serialNumberBlock}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.unitIdentifier}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitIdentifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            *<FormattedMessage id="unit-type" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={unitTypeValues}
                            onChange={value => setUnitType(value)}
                            selected={[
                              { label: data.unitType, value: data.unitType },
                            ]}
                            placeholder="Unit Type"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                            value={editedUnits.intendedBuyerOrgUid}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                intendedBuyerOrgUid: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
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
                            value={editedUnits.tags}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            options={unitStatusValues}
                            onChange={value => setUnitStatus(value)}
                            selected={[
                              {
                                label: data.unitStatus,
                                value: data.unitStatus,
                              },
                            ]}
                            placeholder="Unit Type"
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
                            value={editedUnits.unitTransactionType}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.tokenIssuanceHash}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.unitsIssuanceLocation}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.unitRegistryLink}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            value={editedUnits.unitMarketplaceLink}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            options={cadValues}
                            onChange={value =>
                              setSelectedCorrespondingAdjustmentDeclaration(
                                value,
                              )
                            }
                            selected={[
                              {
                                label: data.correspondingAdjustmentDeclaration,
                                value: data.correspondingAdjustmentDeclaration,
                              },
                            ]}
                            placeholder="Unit Type"
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
                            options={casValues}
                            onChange={value =>
                              setSelectedCorrespondingAdjustmentStatus(value)
                            }
                            selected={[
                              {
                                label: data.correspondingAdjustmentStatus,
                                value: data.correspondingAdjustmentStatus,
                              },
                            ]}
                            placeholder="Unit Type"
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
                  </FormContainerStyle>
                </ModalFormContainerStyle>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <QualificationsRepeater
                  qualificationsState={qualifications}
                  newQualificationsState={setQualificationsRepeaterValues}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <VintageRepeater
                  max={1}
                  vintageState={vintage}
                  newVintageState={setVintage}
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
