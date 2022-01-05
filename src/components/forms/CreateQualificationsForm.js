import React from 'react';
import styled from 'styled-components';

import { StandardInput, InputSizeEnum, InputStateEnum, Divider, ModalFormContainerStyle, FormContainerStyle, BodyContainer } from '..';
import { Body } from '../typography';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateQualificationsForm = ({ value, onChange }) => {
  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Label</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Label"
                state={InputStateEnum.default}
                value={value.label}
                onChange={event => {onChange(({...value, label: event}))}}
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
                value={value.creditingPeriodStartDate}
                onChange={event => {onChange(({...value, creditingPeriodStartDate: event}))}}
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
                value={value.creditingPeriodEndDate}
                onChange={event => {onChange(({...value, creditingPeriodEndDate: event}))}}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Validity Start Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Validity Start Date"
                state={InputStateEnum.default}
                value={value.validityStartDate}
                onChange={event => {onChange(({...value, validityStartDate: event}))}}
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body color={'#262626'}>Validity End Date</Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText="Validity End Date"
                state={InputStateEnum.default}
                value={value.validityEndDate}
                onChange={event => {onChange(({...value, validityEndDate: event}))}}
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
                value={value.unitQuantity}
                onChange={event => {onChange(({...value, unitQuantity: event}))}}
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
                value={value.qualificationLink}
                onChange={event => {onChange(({...value, qualificationLink: event}))}}
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateQualificationsForm };
