import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
//import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Tabs,
  Tab,
  TabPanel,
  Modal,
  Body,
} from '..';
import QualificationsRepeater from './QualificationsRepeater';
import VintageRepeater from './VintageRepeater';
//import { postNewUnits } from '../../store/actions/climateWarehouseActions';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;

const InputContainer = styled('div')`
  width: 320px;
`;

const CreateUnitsForm = withRouter(({ onClose }) => {
  //const dispatch = useDispatch();
  const [newQualifications, setNewQualifications] = useState([]);
  const [newVintage, setNewVintage] = useState([]);
  const [tabValue, setTabValue] = useState(0);
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
    dataToSend.qualification = newQualifications;
    //dispatch(postNewUnits(dataToSend));
    alert('Not yet Implemented');
  };
  return (
    <>
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        basic
        form
        label="Submit"
        showButtons
        title="Create Units"
        body={
          <div>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Tab Options">
              <Tab label="Create Units" />
              <Tab label="Qualifications" />
              <Tab label="Vintage" />
            </Tabs>
            <div>
              <TabPanel value={tabValue} index={0}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 0',
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
                          <Body color={'#262626'}>Units Owner</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Units Owner"
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
                          <Body color={'#262626'}>Units Buyer</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Units Buyer"
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
                          <Body color={'#262626'}>Registry</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Registry"
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
                          <Body color={'#262626'}>Unit Block Identifier</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Block Identifier"
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
                          <Body color={'#262626'}>Unit Identifier</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Identifier"
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
                          <Body color={'#262626'}>Qualification ID</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Qualification ID"
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
                          <Body color={'#262626'}>Unit Type</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Type"
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
                          <Body color={'#262626'}>Unit Count</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Count"
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
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>Unit Status</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Status"
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
                          <Body color={'#262626'}>Unit Status Date</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Status Date"
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
                          <Body color={'#262626'}>Transaction Type</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Transaction Type"
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
                          <Body color={'#262626'}>Unit Issuance Location</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Issuance Location"
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
                          <Body color={'#262626'}>Unit Link</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Link"
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
                            Corresponding Adjustment
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Corresponding Adjustment"
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
                          <Body color={'#262626'}>Unit Tag</Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText="Unit Tag"
                            state={InputStateEnum.default}
                            value={newUnits.unitTag}
                            onChange={value =>
                              setNewUnits(prev => ({ ...prev, unitTag: value }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
                  </div>
                  {/* <div onClick={() => dispatch(postNewUnits(newUnits))}>
       <PrimaryButton label="Submit" size="large" />
       </div> */}
                </div>
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
