import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';

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
} from '..';
import { LabelContainer } from '../../utils/compUtils';
import { labelSchema } from './LabelsValidation';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateLabelsForm = ({ value, onChange, setLabelValid, labelRef }) => {
  const intl = useIntl();

  const formik = useFormik({
    initialValues: value,
    validationSchema: labelSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });

  console.log(formik.errors);

  useEffect(() => {
    labelRef.current = formik.handleSubmit;
  }, []);

  useEffect(() => {
    const labelResult = async () => {
      const isLabelValid = await labelSchema.isValid(formik.values);
      if (isLabelValid) {
        setLabelValid(true);
      } else {
        setLabelValid(false);
      }
    };
    labelResult();
    onChange(formik.values);
  }, [formik.values]);

  const errorInputAlert = name => {
    if (formik.touched[name]) {
      if (formik.errors[name]) {
        return InputVariantEnum.error;
      } else {
        return InputVariantEnum.success;
      }
    }
    return InputVariantEnum.default;
  };

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="label" />
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
                name="label"
                onInputBlur={formik.handleBlur}
                variant={errorInputAlert('label')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label',
                })}
                state={InputStateEnum.default}
                value={formik.values.label}
                onChange={formik.handleChange}
              />
            </InputContainer>
            {formik.errors.label && formik.touched.label && (
              <Body size="Small" color="red">
                {formik.errors.label}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="label-type" />
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
              <StandardInput
                name="labelType"
                variant={errorInputAlert('labelType')}
                onInputBlur={formik.handleBlur}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label-type',
                })}
                state={InputStateEnum.default}
                value={value.labelType}
                onChange={formik.handleChange}
              />
            </InputContainer>
            {formik.errors.labelType && formik.touched.labelType && (
              <Body size="Small" color="red">
                {formik.errors.labelType}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="crediting-period-start-date" />
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
                size="large"
                dateValue={formik.values.creditingPeriodStartDate}
                setDateValue={value =>
                  formik.setFieldValue('creditingPeriodStartDate', value)
                }
              />
            </InputContainer>
            {formik.errors.creditingPeriodStartDate && (
              <Body size="Small" color="red">
                {formik.errors.creditingPeriodStartDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="crediting-period-end-date" />
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
                name="creditingPeriodEndDate"
                onBlur={formik.handleBlur}
                size="large"
                dateValue={formik.values.creditingPeriodEndDate}
                setDateValue={value =>
                  formik.setFieldValue('creditingPeriodEndDate', value)
                }
              />
            </InputContainer>
            {formik.errors.creditingPeriodEndDate &&
              formik.touched.creditingPeriodEndDate && (
                <Body size="Small" color="red">
                  {formik.errors.creditingPeriodEndDate}
                </Body>
              )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="validity-period-start-date" />
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
                name="validityPeriodStartDate"
                onBlur={formik.handleBlur}
                size="large"
                dateValue={formik.values.validityPeriodStartDate}
                setDateValue={value =>
                  formik.setFieldValue('validityPeriodStartDate', value)
                }
              />
            </InputContainer>
            {formik.errors.validityPeriodStartDate &&
              formik.touched.validityPeriodStartDate && (
                <Body size="Small" color="red">
                  {formik.errors.validityPeriodStartDate}
                </Body>
              )}
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="validity-period-end-date" />
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
                size="large"
                dateValue={formik.values.validityPeriodEndDate}
                setDateValue={value =>
                  formik.setFieldValue('validityPeriodEndDate', value)
                }
              />
            </InputContainer>
            {formik.errors.validityPeriodEndDate &&
              formik.touched.validityPeriodEndDate && (
                <Body size="Small" color="red">
                  {formik.errors.validityPeriodEndDate}
                </Body>
              )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="unit-quantity" />
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
                name="unitQuantity"
                type="number"
                onInputBlur={formik.handleBlur}
                variant={errorInputAlert('unitQuantity')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-quantity',
                })}
                state={InputStateEnum.default}
                value={formik.values.unitQuantity}
                onChange={formik.handleChange}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="label-link" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-label-link-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                name="labelLink"
                onInputBlur={formik.handleBlur}
                variant={errorInputAlert('labelLink')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label-link',
                })}
                state={InputStateEnum.default}
                value={formik.values.labelLink}
                onChange={formik.handleChange}
              />
            </InputContainer>
            {formik.errors.labelLink && formik.touched.labelLink && (
              <Body size="Small" color="red">
                {formik.errors.labelLink}
              </Body>
            )}
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateLabelsForm };
