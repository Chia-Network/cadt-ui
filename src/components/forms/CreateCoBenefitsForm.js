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

const CreateCoBenefitsForm = ({ value, onChange }) => {
  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };


  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <StyledFieldContainer>
          <StyledLabelContainer>
            <Body color={'#262626'}>Co-Benefit</Body>
          </StyledLabelContainer>
          <InputContainer>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText="Benefit"
              state={InputStateEnum.default}
              value={value.benefit}
              onChange={changeValue => onInputChange('benefit', changeValue)}
            />
          </InputContainer>
        </StyledFieldContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateCoBenefitsForm };
