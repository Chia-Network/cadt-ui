import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  PrimaryButton,
} from '..';
import { Body, H3 } from '../typography';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;

const CreateUnitsForm = () => {
  const dispatch = useDispatch();
  const [newUnits, setNewUnits] = useState({
    unitsOwner: '',
    unitsBuyer: '',
    registry: '',
    unitBlockIdentifier: '',
    unitIdentifier: '',
    qualificationID: '',
    unitType: '',
    unitCount: 0,
    unitStatus: '',
    unitStatusDate: '',
    transactionType: '',
    unitIssuanceLocation: '',
    unitLink: '',
    correspondingAdjustment: '',
    unitTag: '',
  });

  return (
    <div style={{ width: '320px' }}>
      <H3>Add New Unit</H3>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Units Owner</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Units Owner"
          state={InputStateEnum.default}
          value={newUnits.unitsOwner}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitsOwner: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Units Buyer</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Units Buyer"
          state={InputStateEnum.default}
          value={newUnits.unitsBuyer}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitsBuyer: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Registry</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Registry"
          state={InputStateEnum.default}
          value={newUnits.registry}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, registry: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Block Identifier</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Block Identifier"
          state={InputStateEnum.default}
          value={newUnits.unitBlockIdentifier}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitBlockIdentifier: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Identifier</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Identifier"
          state={InputStateEnum.default}
          value={newUnits.unitIdentifier}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitIdentifier: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Qualification ID</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Qualification ID"
          state={InputStateEnum.default}
          value={newUnits.qualificationID}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, qualificationID: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Type</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Type"
          state={InputStateEnum.default}
          value={newUnits.unitType}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitType: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Count</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Count"
          state={InputStateEnum.default}
          value={newUnits.unitCount}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitCount: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Status</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Status"
          state={InputStateEnum.default}
          value={newUnits.unitStatus}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitStatus: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Status Date</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Status Date"
          state={InputStateEnum.default}
          value={newUnits.unitStatusDate}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitStatusDate: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Transaction Type</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Transaction Type"
          state={InputStateEnum.default}
          value={newUnits.transactionType}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, transactionType: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Issuance Location</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Issuance Location"
          state={InputStateEnum.default}
          value={newUnits.unitIssuanceLocation}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitIssuanceLocation: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Link</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Link"
          state={InputStateEnum.default}
          value={newUnits.unitLink}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitLink: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Corresponding Adjustment</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Corresponding Adjustment"
          state={InputStateEnum.default}
          value={newUnits.correspondingAdjustment}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, correspondingAdjustment: value }))
          }
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body color={'#262626'}>Unit Tag</Body>
        </StyledLabelContainer>
        <StandardInput
          size={InputSizeEnum.large}
          placeholderText="Unit Tag"
          state={InputStateEnum.default}
          value={newUnits.unitTag}
          onChange={value =>
            setNewUnits(prev => ({ ...prev, unitTag: value }))
          }
        />
        
      </StyledFieldContainer>
      <div onClick={() => dispatch(postNewUnits(newUnits))}>
        <PrimaryButton label="Submit" size="large" />
      </div>
    </div>
  );
};

export { CreateUnitsForm };
