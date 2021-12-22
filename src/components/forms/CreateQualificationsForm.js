import React, { useState } from 'react';
import styled from 'styled-components';

import { StandardInput, InputSizeEnum, InputStateEnum, Divider } from '..';
import { Body } from '../typography';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 20px;
`;

const InputContainer = styled('div')`
  width: 320px;
`;

const CreateQualificationsForm = () => {
  const [qualifications, setQualifications] = useState({
    projectID: '',
    qualificationType: '',
    label: '',
    creditingPeriod_StartDate: '',
    creditingPeriod_EndDate: '',
    validity_StartDate: '',
    validity_EndDate: '',
    unityQuantity: 0,
    qualification_Link: '',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
              <Body color={'#262626'}>Project ID</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Project ID"
                state={InputStateEnum.default}
                value={qualifications.unitsOwner}
                onChange={value =>
                  setQualifications(prev => ({ ...prev, unitsOwner: value }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Qualification Type</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Qualification Type"
                state={InputStateEnum.default}
                value={qualifications.qualificationType}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    qualificationType: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Label</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Label"
                state={InputStateEnum.default}
                value={qualifications.label}
                onChange={value =>
                  setQualifications(prev => ({ ...prev, label: value }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Crediting Period Start Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Crediting Period Start Date"
                state={InputStateEnum.default}
                value={qualifications.creditingPeriod_StartDate}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    creditingPeriod_StartDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Crediting Period End Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Crediting Period End Date"
                state={InputStateEnum.default}
                value={qualifications.creditingPeriod_EndDate}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    creditingPeriod_EndDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Validity Start Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Validity Start Date"
                state={InputStateEnum.default}
                value={qualifications.validity_StartDate}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    validity_StartDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Validity End Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Validity End Date"
                state={InputStateEnum.default}
                value={qualifications.validity_EndDate}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    validity_EndDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Unit Quantity</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Unit Quantity"
                state={InputStateEnum.default}
                value={qualifications.unityQuantity}
                onChange={value =>
                  setQualifications(prev => ({ ...prev, unityQuantity: value }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Qualifications Link</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Qualifications Link"
                state={InputStateEnum.default}
                value={qualifications.qualification_Link}
                onChange={value =>
                  setQualifications(prev => ({
                    ...prev,
                    qualification_Link: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export { CreateQualificationsForm };
