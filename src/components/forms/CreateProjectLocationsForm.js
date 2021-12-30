import u from 'updeep';
import React from 'react';
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

const ModalFormContainerStyle = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FormContainerStyle = styled('div')`
  display: flex;
  justify-content: flex-start;
  width: 90%;
`;

const BodyContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding-right: 4.125rem;
`;

const CreateProjectLocationsForm = ({ value, onChange }) => {
  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>In-Country-Region</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="In-Country-Region"
                state={InputStateEnum.default}
                value={value.countryRegion}
                onChange={changeValue =>
                  onInputChange('countryRegion', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Host Country</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Host Country"
                state={InputStateEnum.default}
                value={value.country}
                onChange={changeValue =>
                  onInputChange('country', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateProjectLocationsForm };
