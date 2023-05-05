import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DescriptionIcon,
  ToolTipContainer,
  DateSelect,
  LabelContainer,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  DateSelectVariantEnum,
  SpanTwoColumnsContainer,
  HrSpanTwoColumnsContainer,
  SimpleSelectVariantEnum,
  SelectCreatable,
  FormikError,
  SimpleSelectStateEnum,
} from '..';

// eslint-disable-next-line react/display-name
const ProjectLabelForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const { pickLists } = useSelector(store => store.climateWarehouse);
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [name, index],
    );
    const areFieldsDisabled = Boolean(value.id);

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <BodyContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="label" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-label-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.label && touched?.label && InputVariantEnum.error
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'label',
                  })}
                  state={
                    areFieldsDisabled
                      ? InputStateEnum.disabled
                      : InputStateEnum.default
                  }
                  value={value.label}
                  onChange={value =>
                    setFieldValue(getFieldName('label'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('label')}
                />
              </InputContainer>
              <FormikError name={getFieldName('label')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="label-type" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-label-type-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <SelectCreatable
                  variant={
                    (errors?.labelType &&
                      touched?.labelType &&
                      SimpleSelectVariantEnum.error) ||
                    (areFieldsDisabled
                      ? SimpleSelectStateEnum.disabled
                      : SimpleSelectStateEnum.default)
                  }
                  options={pickLists.labelType}
                  selected={value.labelType}
                  onChange={val =>
                    setFieldValue(getFieldName('labelType'), val)
                  }
                  onBlur={handleBlur}
                />
              </InputContainer>
              <FormikError name={getFieldName('labelType')} />
            </StyledFieldContainer>
            <SpanTwoColumnsContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="label-link" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'labels-label-link-description',
                      })}>
                      <DescriptionIcon height="14" width="14" />
                    </ToolTipContainer>
                  </Body>
                </StyledLabelContainer>
                <StandardInput
                  variant={
                    errors?.labelLink &&
                    touched?.labelLink &&
                    InputVariantEnum.error
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'label-link',
                  })}
                  state={
                    areFieldsDisabled
                      ? InputStateEnum.disabled
                      : InputStateEnum.default
                  }
                  value={value.labelLink}
                  onChange={value =>
                    setFieldValue(getFieldName('labelLink'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('labelLink')}
                />
                <FormikError name={getFieldName('labelLink')} />
              </StyledFieldContainer>
            </SpanTwoColumnsContainer>
            <HrSpanTwoColumnsContainer>
              <hr />
            </HrSpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="validity-period-start-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-validity-period-start-date-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.validityPeriodStartDate &&
                    touched?.validityPeriodStartDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.validityPeriodStartDate}
                  setDateValue={value =>
                    setFieldValue(
                      getFieldName('validityPeriodStartDate'),
                      value,
                    )
                  }
                  name={getFieldName('validityPeriodStartDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('validityPeriodStartDate')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="validity-period-end-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-validity-period-end-date-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.validityPeriodEndDate &&
                    touched?.validityPeriodEndDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.validityPeriodEndDate}
                  setDateValue={value =>
                    setFieldValue(getFieldName('validityPeriodEndDate'), value)
                  }
                  name={getFieldName('validityPeriodEndDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('validityPeriodEndDate')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="crediting-period-start-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-crediting-period-start-date-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.creditingPeriodStartDate &&
                    touched?.creditingPeriodStartDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.creditingPeriodStartDate}
                  setDateValue={value =>
                    setFieldValue(
                      getFieldName('creditingPeriodStartDate'),
                      value,
                    )
                  }
                  name={getFieldName('creditingPeriodStartDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('creditingPeriodStartDate')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="crediting-period-end-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-crediting-period-end-date-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.creditingPeriodEndDate &&
                    touched?.creditingPeriodEndDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.creditingPeriodEndDate}
                  setDateValue={value =>
                    setFieldValue(getFieldName('creditingPeriodEndDate'), value)
                  }
                  name={getFieldName('creditingPeriodEndDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('creditingPeriodEndDate')} />
            </StyledFieldContainer>
            <HrSpanTwoColumnsContainer>
              <hr />
            </HrSpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="unit-quantity" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'labels-unit-quantity-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.unitQuantity &&
                    touched?.unitQuantity &&
                    InputVariantEnum.error
                  }
                  type="number"
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'unit-quantity',
                  })}
                  state={
                    areFieldsDisabled
                      ? InputStateEnum.disabled
                      : InputStateEnum.default
                  }
                  value={value.unitQuantity}
                  onChange={value =>
                    setFieldValue(getFieldName('unitQuantity'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('unitQuantity')}
                />
              </InputContainer>
              <FormikError name={getFieldName('unitQuantity')} />
            </StyledFieldContainer>
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectLabelForm };
