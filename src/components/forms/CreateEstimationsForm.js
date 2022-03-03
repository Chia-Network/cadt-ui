import u from 'updeep';
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputVariantEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DescriptionIcon,
  ToolTipContainer,
  DateSelect,
  LabelContainer,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  DateVariantEnum,
} from '..';

import { estimationSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

const CreateEstimationsForm = ({ value, onChange }) => {
  const intl = useIntl();
  const [errorEstimationMessage, setErrorEstimationMessage] = useState({});

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    setValidationErrors(estimationSchema, value, setErrorEstimationMessage);
  }, [value]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="crediting-period-start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'estimation-period-start-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errorEstimationMessage?.creditingPeriodStart &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodStart}
                setDateValue={changeValue =>
                  onInputChange('creditingPeriodStart', changeValue)
                }
              />
            </InputContainer>
            {errorEstimationMessage?.creditingPeriodStart && (
              <Body size="Small" color="red">
                {errorEstimationMessage.creditingPeriodStart}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="crediting-period-end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'estimation-period-end-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errorEstimationMessage?.creditingPeriodEnd &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodEnd}
                setDateValue={changeValue =>
                  onInputChange('creditingPeriodEnd', changeValue)
                }
              />
            </InputContainer>
            {errorEstimationMessage?.creditingPeriodEnd && (
              <Body size="Small" color="red">
                {errorEstimationMessage.creditingPeriodEnd}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="unit-count" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'estimation-unit-count-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorEstimationMessage?.unitCount
                    ? InputVariantEnum.error
                    : undefined
                }
                type="number"
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-count',
                })}
                state={InputStateEnum.default}
                value={value.unitCount}
                onChange={changeValue =>
                  onInputChange('unitCount', changeValue)
                }
              />
            </InputContainer>
            {errorEstimationMessage?.unitCount && (
              <Body size="Small" color="red">
                {errorEstimationMessage.unitCount}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateEstimationsForm };
