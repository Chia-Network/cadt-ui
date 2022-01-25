import u from 'updeep';
import React from 'react';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  Body,
  ToolTipContainer,
} from '..';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateCoBenefitsForm = ({ value, onChange }) => {
  const intl = useIntl();
  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <StyledFieldContainer>
          <StyledLabelContainer>
            <Body style={{ color: '#262626' }}>
              <ToolTipContainer
                tooltip={intl.formatMessage({
                  id: 'cobenefits-cobenefit-description',
                })}>
                <FormattedMessage id="co-benefit" />
              </ToolTipContainer>
            </Body>
          </StyledLabelContainer>
          <InputContainer>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={intl.formatMessage({ id: 'co-benefit' })}
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
