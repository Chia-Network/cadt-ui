import React, { useState } from 'react';
import styled from 'styled-components';
//import { CreateQualificationsForm } from '.';
//import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
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

const EditUnitsForm = ({data}) => {
  //const dispatch = useDispatch();

  const [editedUnits, setEditUnits] = useState({
    unitsOwner: data?.unitsOwner,
    unitsBuyer: data?.unitsBuyer,
    registry: data?.registry,
    unitBlockIdentifier: data?.unitBlockIdentifier,
    unitIdentifier: data?.unitIdentifier,
    qualificationID: data?.qualificationID,
    unitType: data?.unitType,
    unitCount: data?.unitCount,
    unitStatus: data?.unitStatus,
    unitStatusDate: data?.unitStatusDate,
    transactionType: data?.transactionType,
    unitIssuanceLocation: data?.unitIssuanceLocation,
    unitLink: data?.unitLink,
    correspondingAdjustment: data?.correspondingAdjustment,
    unitTag: data?.unitTag,
  });

  const InputContainer = styled('div')`
    width: 320px;
  `;

  return (
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
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '66px' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Units Owner</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Units Owner"
                state={InputStateEnum.default}
                value={editedUnits.unitsOwner}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitsOwner: value }))
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
                value={editedUnits.unitsBuyer}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitsBuyer: value }))
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
                value={editedUnits.registry}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, registry: value }))
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
              <Body color={'#262626'}>Unit Identifier</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Unit Identifier"
                state={InputStateEnum.default}
                value={editedUnits.unitIdentifier}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitIdentifier: value }))
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
                value={editedUnits.qualificationID}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, qualificationID: value }))
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
                value={editedUnits.unitType}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitType: value }))
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
                  setEditUnits(prev => ({ ...prev, unitCount: value }))
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
                value={editedUnits.unitStatus}
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitStatus: value }))
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
                onChange={value =>
                  setEditUnits(prev => ({ ...prev, unitStatusDate: value }))
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
                  setEditUnits(prev => ({ ...prev, transactionType: value }))
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
              <Body color={'#262626'}>Unit Tag</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Unit Tag"
                state={InputStateEnum.default}
                value={editedUnits.unitTag}
                onChange={value => {
                  setEditUnits(prev => ({ ...prev, unitTag: value }))
                }
                }
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
  );
};

export { EditUnitsForm };
