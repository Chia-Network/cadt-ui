import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Tabs,
  Tab,
  TabPanel,
  Modal,
  Body,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [newUnits, setNewUnits] = useState({
    orgUid: '',
    buyer: '',
    registry: '',
    blockIdentifier: '',
    identifier: '',
    unitType: '',
    unitCount: '',
    unitStatus: '',
    unitStatusDate: '',
    transactionType: '',
    unitIssuanceLocation: '',
    unitLink: '',
    correspondingAdjustment: '',
    unitTag: '',
  });
  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(newUnits);

    if (!_.isEmpty(newVintage)) {
      dataToSend.vintage = _.head(newVintage);
    }

    if (!_.isEmpty(newQualifications)) {
      dataToSend.qualifications = newQualifications;
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
                            <FormattedMessage id="units-owner" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'units-owner',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.orgUid}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                orgUid: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="units-buyer" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'units-buyer',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.buyer}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                buyer: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="registry" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'registry',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.registry}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                registry: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-block-identifier" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-block-identifier',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.blockIdentifier}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                blockIdentifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            <FormattedMessage id="unit-identifier" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-identifier',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.identifier}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                identifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-type" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-type',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitType}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitType: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-count" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-count',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitCount}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitCount: value,
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
                            <FormattedMessage id="unit-status" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-status',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitStatus}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitStatus: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-status-date" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-status-date',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitStatusDate}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitStatusDate: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="transaction-type" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'transaction-type',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.transactionType}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                transactionType: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-issuance-location" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-issuance-location',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitIssuanceLocation}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitIssuanceLocation: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-link" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-link',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitLink}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="corresponding-adjustment" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'corresponding-adjustment',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.correspondingAdjustment}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                correspondingAdjustment: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <FormattedMessage id="unit-tag" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-tag',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.unitTag}
                            onChange={value =>
                              setNewUnits(prev => ({ ...prev, unitTag: value }))
                            }
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
