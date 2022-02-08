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
  DateSelect,
  DescriptionIcon,
  ToolTipContainer,
} from '..';
import { LabelContainer } from '../../utils/compUtils';
import { issuanceSchema } from './IssuanceValidation';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateIssuanceForm = ({ value, onChange, issuanceRef, setIssuanceValid }) => {
  const intl = useIntl();

  const formik = useFormik({
    initialValues: value,
    validationSchema: issuanceSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });

  console.log(formik.errors);

  useEffect(() => {
    issuanceRef.current = formik.handleSubmit;
  }, []);

  useEffect(() => {
    const issuanceResult = async () => {
      const isIssuanceValid = await issuanceSchema.isValid(formik.values);
      if (isIssuanceValid) {
        setIssuanceValid(true);
      } else {
        setIssuanceValid(false);
      }
    };
    issuanceResult();
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
                  <FormattedMessage id="start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-start-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                name="startDate"
                onBlur={formik.handleBlur}
                size="large"
                dateValue={formik.values.startDate}
                setDateValue={changeValue =>
                  formik.setFieldValue('startDate', changeValue)
                }
              />
            </InputContainer>
            {formik.errors.startDate && (
              <Body size="Small" color="red">
                {formik.errors.startDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-end-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                name="endDate"
                onBlur={formik.handleBlur}
                size="large"
                dateValue={formik.values.endDate}
                setDateValue={changeValue =>
                  formik.setFieldValue('endDate', changeValue)
                }
              />
            </InputContainer>
            {formik.errors.endDate && (
              <Body size="Small" color="red">
                {formik.errors.endDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="verification-approach" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                name="verificationApproach"
                onInputBlur={formik.handleBlur}
                variant={errorInputAlert('verificationApproach')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-approach',
                })}
                state={InputStateEnum.default}
                value={formik.values.verificationApproach}
                onChange={formik.handleChange}
              />
            </InputContainer>
            {formik.errors.verificationApproach &&
              formik.touched.verificationApproach && (
                <Body size="Small" color="red">
                  {formik.errors.verificationApproach}
                </Body>
              )}
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="verification-report-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-report-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                name="verificationReportDate"
                onBlur={formik.handleBlur}
                size="large"
                dateValue={formik.values.verificationReportDate}
                setDateValue={changeValue =>
                  formik.setFieldValue('verificationReportDate', changeValue)
                }
              />
            </InputContainer>
            {formik.errors.verificationReportDate && (
              <Body size="Small" color="red">
                {formik.errors.verificationReportDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="verification-body" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-body-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                name="verificationBody"
                onInputBlur={formik.handleBlur}
                variant={errorInputAlert('verificationBody')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-body',
                })}
                state={InputStateEnum.default}
                value={formik.values.verificationBody}
                onChange={formik.handleChange}
              />
            </InputContainer>
            {formik.errors.verificationBody && formik.touched.verificationBody && (
              <Body size="Small" color="red">
                {formik.errors.verificationBody}
              </Body>
            )}
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateIssuanceForm };
