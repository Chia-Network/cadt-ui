import u from 'updeep';
import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { coBenefitSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

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
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
} from '..';

const CreateCoBenefitsForm = ({ value, onChange }) => {
  const [errorCoBenefitsMessage, setErrorCoBenefitsMessage] = useState({});
  const intl = useIntl();

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    setValidationErrors(coBenefitSchema, value, setErrorCoBenefitsMessage);
  }, [value]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <StyledFieldContainer>
          <StyledLabelContainer>
            <Body>
              <LabelContainer>
                *<FormattedMessage id="co-benefit" />
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
            {errorCoBenefitsMessage?.cobenefit && (
              <Body size="Small" color="red">
                {errorCoBenefitsMessage.cobenefit}
              </Body>
            )}
          </InputContainer>
        </StyledFieldContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateCoBenefitsForm };
