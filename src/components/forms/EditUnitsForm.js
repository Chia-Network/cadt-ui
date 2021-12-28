import _ from 'lodash';
import React, { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  CreateQualificationsForm,
  ComponentRepeater,
  AddIcon,
  CloseIcon,
  CreateVintageForm,
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Modal,
  Body,
  Tabs,
  Tab,
  TabPanel
} from '..';
//import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';


const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;
const InputContainer = styled('div')`
  width: 320px;
`;

const EditUnitsForm = ({ data, onClose }) => {
  //const dispatch = useDispatch();

  const [qualification, setQualificationsRepeaterValues] = useState([]);

  const [vintage, setVintage] = useState([]);

  const [editedUnits, setEditUnits] = useState({});

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setEditUnits({
      blockIdentifier: data.blockIdentifier,
      buyer: data.buyer,
      correspondingAdjustment: data.correspondingAdjustment,
      createdAt: data.createdAt,
      id: data.id,
      identifier: data.identifier,
      orgUid: data.orgUid,
      registry: data.registry,
      transactionType: data.transactionType,
      unitCount: data.unitCount,
      unitIssuanceLocation: data.unitIssuanceLocation,
      unitLink: data.unitLink,
      unitStatus: data.unitStatus,
      unitStatusDate: data.unitStatusDate,
      unitTag: data.unitTag,
      unitType: data.unitType,
      updatedAt: data.updatedAt,
    });
    setVintage([_.get(data, 'vintage', {})]);
    setQualificationsRepeaterValues(_.get(data, 'qualification', []));
  }, [data]);

  const handleEditUnits = () => {
    const dataToSend = _.cloneDeep(editedUnits);
    dataToSend.vintage = _.head(vintage);
    dataToSend.qualification = qualification;
    //dispatch(updateUnitsRecord(dataToSend));
    alert('Not yet Implemented');
  };
  console.log({ data });
  console.log({ vintage, qualification });

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
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Tab Options">
              <Tab label="Edit Units" />
              <Tab label="Qualifications" />
              <Tab label="Vintage" />
            </Tabs>
            <div>
              <TabPanel value={tabValue} index={0}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      width: '90%',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingRight: '66px',
                      }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Block Identifier</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Block Identifier"
                            state={InputStateEnum.default}
                            value={editedUnits.blockIdentifier}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                blockIdentifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Buyer</Body>
                        </StyledLabelContainer>

                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Buyer"
                            state={InputStateEnum.default}
                            value={editedUnits.buyer}
                            onChange={value =>
                              setEditUnits(prev => ({ ...prev, buyer: value }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            Corresponding Adjustment
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Corresponding Adjustment"
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
                          <Body color={'#262626'}>Created At</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Created At"
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
                          <Body color={'#262626'}>ID</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="ID"
                            state={InputStateEnum.default}
                            value={editedUnits.id}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                id: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Identifier</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Identifier"
                            state={InputStateEnum.default}
                            value={editedUnits.identifier}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                identifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Org UID</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Org UID"
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
                          <Body color={'#262626'}>Updated At</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Updated At"
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Registry</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Registry"
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
                          <Body color={'#262626'}>Transaction Type</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Transaction Type"
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
                          <Body color={'#262626'}>Unit Count</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Count"
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
                          <Body color={'#262626'}>Unit Issuance Location</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Issuance Location"
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
                          <Body color={'#262626'}>Unit Link</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Link"
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
                          <Body color={'#262626'}>Unit Status</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Status"
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
                          <Body color={'#262626'}>Unit Status Date</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Status Date"
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
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Unit Tag</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Tag"
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
                    </div>
                  </div>

                  {/* <div
        style={{
          width: '100%',
          display: 'flex',
          height: '100px',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        onClick={() => dispatch(editUnits(editedUnits))}>
        <PrimaryButton label="Cancel" size="large" />
        <div style={{padding: '0px 20px'}}>
          <PrimaryButton label="Confirm" size="large" />
        </div>
      </div> */}
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <div style={{ padding: '20px 30px' }}>
                  <ComponentRepeater
                    values={qualification}
                    updateValues={setQualificationsRepeaterValues}
                    initialValue={{
                      label: '',
                      creditingPeriodStartDate: '',
                      creditingPeriodEndDate: '',
                      validityStartDate: '',
                      validityEndDate: '',
                      unityQuantity: '',
                      qualificationLink: '',
                    }}
                    component={<CreateQualificationsForm />}
                    addIcon={
                      <AddIcon height={14} width={14} fill={'#1890FF'} />
                    }
                    removeIcon={
                      <CloseIcon height={12} width={12} fill={'#1890FF'} />
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <div style={{ padding: '20px 30px' }}>
                  <ComponentRepeater
                    values={vintage}
                    updateValues={setVintage}
                    initialValue={{
                      vintageStartDate: '',
                      vintageEndDate: '',
                      verificationApproach: '',
                      verificationDate: '',
                      verificationBody: '',
                    }}
                    component={<CreateVintageForm />}
                    addIcon={
                      <AddIcon height={14} width={14} fill={'#1890FF'} />
                    }
                    removeIcon={
                      <CloseIcon height={12} width={12} fill={'#1890FF'} />
                    }
                  />
                </div>
              </TabPanel>
            </div>
          </div>
        }
      />
    </>
  );
};

export { EditUnitsForm };
