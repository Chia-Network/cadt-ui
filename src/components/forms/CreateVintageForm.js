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

const CreateVintageForm = () => {
  const [vintage, setVintage] = useState({
    vintage_StartDate: '',
    vintage_EndDate: '',
    verificationApproach: '',
    verificationDate: '',
    verificationBody: '',
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
              <Body color={'#262626'}>Vintage Start Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Vintage Start Date"
                state={InputStateEnum.default}
                value={vintage.vintage_StartDate}
                onChange={value =>
                  setVintage(prev => ({ ...prev, vintage_StartDate: value }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Vintage End Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Vintage End Date"
                state={InputStateEnum.default}
                value={vintage.vintage_EndDate}
                onChange={value =>
                  setVintage(prev => ({
                    ...prev,
                    vintage_EndDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Verification Approach</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Verification Approach"
                state={InputStateEnum.default}
                value={vintage.verificationApproach}
                onChange={value =>
                  setVintage(prev => ({ ...prev, verificationApproach: value }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Verification Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Verification Date"
                state={InputStateEnum.default}
                value={vintage.verificationDate}
                onChange={value =>
                  setVintage(prev => ({
                    ...prev,
                    verificationDate: value,
                  }))
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Verification Body</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="verification Body"
                state={InputStateEnum.default}
                value={vintage.verificationBody}
                onChange={value =>
                  setVintage(prev => ({
                    ...prev,
                    verificationBody: value,
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

export { CreateVintageForm };
