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
  DescriptionIcon,
  LabelContainer,
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
            <Body>
              <LabelContainer>
                <FormattedMessage id="co-benefit" />
              </LabelContainer>
              <ToolTipContainer
                tooltip={intl.formatMessage({
                  id: 'cobenefits-cobenefit-description',
                })}
              >
                <DescriptionIcon height="14" width="14" />
              </ToolTipContainer>
            </Body>
          </StyledLabelContainer>
          <InputContainer>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={intl.formatMessage({ id: 'co-benefit' })}
              state={InputStateEnum.default}
              value={value.cobenefit}
              onChange={changeValue => onInputChange('cobenefit', changeValue)}
            />
          </InputContainer>
        </StyledFieldContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateCoBenefitsForm };
