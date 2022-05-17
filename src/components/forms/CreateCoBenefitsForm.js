import _ from 'lodash';
import u from 'updeep';
import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { coBenefitSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

import {
  InputVariantEnum,
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
  SimpleSelect,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  StandardInput,
  InputStateEnum,
  InputSizeEnum,
} from '..';

const CreateCoBenefitsForm = ({ value, onChange }) => {
  const [errorCoBenefitsMessage, setErrorCoBenefitsMessage] = useState({});
  const { validateForm, formType } = useSelector(state => state.app);
  const { pickLists } = useSelector(state => state.climateWarehouse);
  const intl = useIntl();

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    if (validateForm && formType === 'co-benefits') {
      setValidationErrors(coBenefitSchema, value, setErrorCoBenefitsMessage);
    }
  }, [value, validateForm, formType]);

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
                })}>
                <DescriptionIcon height="14" width="14" />
              </ToolTipContainer>
            </Body>
          </StyledLabelContainer>
          <InputContainer>
            {!_.isEmpty(pickLists?.coBenefits) ? (
              <SimpleSelect
                width="100%"
                addInput={intl.formatMessage({ id: 'co-benefit' })}
                variant={
                  errorCoBenefitsMessage?.cobenefit
                    ? InputVariantEnum.error
                    : undefined
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists?.coBenefits}
                state={SimpleSelectStateEnum.default}
                selected={value.cobenefit ? [value.cobenefit] : undefined}
                onChange={changeValue =>
                  onInputChange('cobenefit', changeValue)
                }
              />
            ) : (
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({ id: 'co-benefit' })}
                state={InputStateEnum.default}
                value={value.cobenefit}
                onChange={changeValue =>
                  onInputChange('cobenefit', changeValue)
                }
              />
            )}
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
