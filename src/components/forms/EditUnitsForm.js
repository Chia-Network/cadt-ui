import React, { useState } from 'react';
import styled from 'styled-components';
import { editUnits } from '../../store/actions/climateWarehouseActions';
//import { CreateQualificationsForm } from '.';
//import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Modal,
  FormWrapper,
  //PrimaryButton,
} from '..';
import { Body } from '../typography';
//import { editUnits } from '../../store/actions/climateWarehouseActions';

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

  const [repeaterQualificationsValues, setQualificationsRepeaterValues] =
    useState([
      ...data.qualification,
      {
        label: data.qualification.label,
        creditingPeriodStartDate: data.qualification.creditingPeriodStartDate,
        creditingPeriodEndDate: data.qualification.creditingPeriodEndDate,
        validityStartDate: data.qualification.validityStartDate,
        validityEndDate: data.qualification.validityEndDate,
        unityQuantity: data.qualification.unityQuantity,
        qualificationLink: data.qualification.qualificationLink,
      },
    ]);

  const [vintage, setVintage] = useState([
    {
      vintageStartDate: data.vintage.startDate,
      vintageEndDate: data.vintage.endDate,
      verificationApproach: data.vintage.verificationApproach,
      verificationDate: data.vintage.verificationDate,
      verificationBody: data.vintage.verificationBody,
    },
  ]);

  const [editedUnits, setEditUnits] = useState({
    blockIdentifier: data.blockIdentifier,
    buyer: data.buyer,
    correspondingAdjustment: data.correspondingAdjustment,
    createdAt: data.createdAt,
    id: data.id,
    identifier: data.identifier,
    orgUid: data.orgUid,
    qualification: repeaterQualificationsValues,
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
    vintage: vintage,
  });

  return (
    <>
      {console.log(repeaterQualificationsValues)}
      <Modal
        onOk={() => editUnits(editedUnits)}
        onClose={onClose}
        basic
        form
        showButtons
        title="Edit Unit"
        body={
          <FormWrapper
            tabLabel="Edit Units"
            qualificationData={repeaterQualificationsValues}
            setQualificationsData={setQualificationsRepeaterValues}
            vintageData={vintage}
            setVintageData={setVintage}>
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
                      <Body color={'#262626'}>Corresponding Adjustment</Body>
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
                          setEditUnits(prev => ({ ...prev, updatedAt: value }))
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
                          setEditUnits(prev => ({ ...prev, registry: value }))
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
                          setEditUnits(prev => ({ ...prev, unitLink: value }))
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
                          setEditUnits(prev => ({ ...prev, unitTag: value }));
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
          </FormWrapper>
        }
      />
    </>
  );
};

export { EditUnitsForm };
