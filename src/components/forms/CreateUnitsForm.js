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
    unitsOwner: '',
    unitsBuyer: '',
    registry: '',
    unitBlockIdentifier: '',
    unitIdentifier: '',
    qualificationID: '',
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
    dataToSend.vintage = newVintage;
    dataToSend.qualifications = newQualifications;
    dispatch(postNewUnits(dataToSend));
  };
  return (
    <>
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        basic
        form
        showButtons
        title="Create Units"
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Create Units" />
              <Tab label="Qualifications" />
              <Tab label="Vintage" />
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
                            value={newUnits.unitsOwner}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitsOwner: value,
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
                            value={newUnits.unitsBuyer}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitsBuyer: value,
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
                            value={newUnits.unitBlockIdentifier}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                unitBlockIdentifier: value,
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
                            <FormattedMessage id="qualification-id" />
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'qualification-id',
                            })}
                            state={InputStateEnum.default}
                            value={newUnits.qualificationID}
                            onChange={value =>
                              setNewUnits(prev => ({
                                ...prev,
                                qualificationID: value,
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
                  vintageState={newVintage}
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
