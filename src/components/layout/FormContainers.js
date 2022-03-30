import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Body } from '../../components';

export const ModalFormContainerStyle = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const FormContainerStyle = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BodyContainer = styled('div')`
  display: grid;
  grid-template-columns: 320px 320px;
  column-gap: 30px;
`;

export const SpanTwoColumnsContainer = styled('div')`
  grid-column: 1 / span 2;
`;

export const SpanTwoDetailColumnsContainer = styled('div')`
  width: 50%;
  grid-column: 1 / span 2;
`;

export const HrSpanTwoColumnsContainer = styled('div')`
  grid-column: 1 / span 2;
  margin: 10px 0;
`;

export const RequiredContainer = styled('div')`
  width: 42.5rem;
`;

export const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
  body {
    color: #262626;
  }
`;

export const LabelContainer = styled('div')`
  display: inline;
  margin-right: 7px;
`;

export const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

export const InputContainer = styled('div')`
  width: 20rem;
`;

export const StyledFieldRequired = styled('div')`
  height: 35px;
`;

export const FieldRequired = () => {
  return (
    <StyledFieldRequired>
      <Body size="Small" color="red">
        *<FormattedMessage id="required-field" />
      </Body>
    </StyledFieldRequired>
  );
};

export const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;
