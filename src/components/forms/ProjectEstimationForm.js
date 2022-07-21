import React, { useCallback } from 'react';
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
  DateSelectVariantEnum,
  FormikError,
} from '..';

const ProjectEstimationForm = ({
  index,
  name,
  errors,
  touched,
  value,
  setFieldValue,
  handleBlur,
}) => {
  const intl = useIntl();
  const getFieldName = useCallback(
    fieldName => `${name}[${index}].${fieldName}`,
    [name, index],
  );

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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errors?.creditingPeriodStart &&
                  touched?.creditingPeriodStart &&
                  DateSelectVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodStart}
                setDateValue={value =>
                  setFieldValue(getFieldName('creditingPeriodStart'), value)
                }
                name={getFieldName('creditingPeriodStart')}
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name={getFieldName('creditingPeriodStart')} />
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errors?.creditingPeriodEnd &&
                  touched?.creditingPeriodEnd &&
                  DateSelectVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodEnd}
                setDateValue={value =>
                  setFieldValue(getFieldName('creditingPeriodEnd'), value)
                }
                name={getFieldName('creditingPeriodEnd')}
                onBlur={handleBlur}
              />
            </InputContainer>
            <FormikError name={getFieldName('creditingPeriodEnd')} />
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errors?.unitCount && touched?.unitCount
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
                onChange={value =>
                  setFieldValue(getFieldName('unitCount'), value)
                }
                onBlur={handleBlur}
                name={getFieldName('unitCount')}
              />
            </InputContainer>
            <FormikError name={getFieldName('unitCount')} />
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { ProjectEstimationForm };
