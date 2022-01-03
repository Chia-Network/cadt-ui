import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Modal,
  Tabs,
  Tab,
  TabPanel,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';

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
  const dispatch = useDispatch();
  const intl = useIntl();

  const [qualification, setQualificationsRepeaterValues] = useState([]);

  const [vintage, setVintage] = useState([]);

  const [editedUnits, setEditUnits] = useState({});

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setEditUnits({
      unitsBuyer: data.buyer,
      registry: data.registry,
      unitBlockIdentifier: data.blockIdentifier,
      unitIdentifier: data.identifier,
      qualificationID: data.id,
      unitType: data.unitType,
      unitCount: data.unitCount,
      unitStatus: data.unitStatus,
      unitStatusDate: data.unitStatusDate,
      transactionType: data.transactionType,
      unitIssuanceLocation: data.unitIssuanceLocation,
      unitLink: data.unitLink,
      correspondingAdjustment: data.correspondingAdjustment,
      unitTag: data.unitTag,
      createdAt: data.createdAt,
      orgUid: data.orgUid,
      updatedAt: data.updatedAt,
    });
    setVintage([_.get(data, 'vintage', {})]);
    setQualificationsRepeaterValues(_.get(data, 'qualification', []));
  }, [data]);

  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(editedUnits);
    dataToSend.vintage = _.head(vintage);
    dataToSend.qualification = qualification;
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
        title="Edit Units"
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Units" />
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
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'units-buyer' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'units-buyer',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitsBuyer}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitsBuyer: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'registry' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'registry',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.registry}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                registry: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({
                              id: 'unit-block-identifier',
                            })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-block-identifier',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitBlockIdentifier}
                            onChange={value =>
                              setEditUnits(prev => ({
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
                            {intl.formatMessage({ id: 'unit-identifier' })}
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
                            {intl.formatMessage({ id: 'qualification-id' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'qualification-id',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.qualificationID}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                qualificationsID: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-type' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-type',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitType}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitType: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-count' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-count',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitCount}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitCount: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-status' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-status',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitStatus}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitStatus: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-status-date' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-status-date',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitStatusDate}
                            onChange={value => {
                              setEditUnits(prev => ({
                                ...prev,
                                unitStatusDate: value,
                              }));
                            }}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </BodyContainer>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'transaction-type' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'transaction-type',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.transactionType}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                transactionType: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({
                              id: 'unit-issuance-location',
                            })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-issuance-location',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitIssuanceLocation}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitIssuanceLocation: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-link' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-link',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitLink}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({
                              id: 'corresponding-adjustment',
                            })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'corresponding-adjustment',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.correspondingAdjustment}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                correspondingAdjustment: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'unit-tag' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-tag',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitTag}
                            onChange={value => {
                              setEditUnits(prev => ({
                                ...prev,
                                unitTag: value,
                              }));
                            }}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'created-at' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'created-at',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.createdAt}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                createdAt: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'org-uid' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'org-uid',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.orgUid}
                            onChange={value =>
                              setEditUnits(prev => ({ ...prev, orgUid: value }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            {intl.formatMessage({ id: 'updated-at' })}
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'updated-at',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.updatedAt}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                updatedAt: value,
                              }))
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
                  qualificationsState={qualification}
                  newQualificationsState={setQualificationsRepeaterValues}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <VintageRepeater
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
