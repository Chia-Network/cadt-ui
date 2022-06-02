import u from 'updeep';
import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { setValidationErrors } from '../../utils/validationUtils';
import { issuanceSchema } from '../../store/validations';
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
  LabelContainer,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  DateVariantEnum,
} from '..';

const CreateProjectIssuancesForm = ({ value, onChange }) => {
  const { validateForm, formType } = useSelector(state => state.app);
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const intl = useIntl();

  const areFieldsDisabled = Boolean(value.id);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    if (validateForm && formType === 'issuances') {
      setValidationErrors(issuanceSchema, value, setErrorIssuanceMessage);
    }
  }, [value, validateForm, formType]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-start-date-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errorIssuanceMessage?.startDate && DateVariantEnum.error
                }
                size="large"
                dateValue={value.startDate}
                setDateValue={changeValue =>
                  onInputChange('startDate', changeValue)
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorIssuanceMessage?.startDate && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.startDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-end-date-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={errorIssuanceMessage?.endDate && DateVariantEnum.error}
                size="large"
                dateValue={value.endDate}
                setDateValue={changeValue =>
                  onInputChange('endDate', changeValue)
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorIssuanceMessage?.endDate && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.endDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="verification-body" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-body-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.verificationBody &&
                  InputVariantEnum.error
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-body',
                })}
                state={
                  areFieldsDisabled
                    ? InputStateEnum.disabled
                    : InputStateEnum.default
                }
                value={value.verificationBody}
                onChange={changeValue =>
                  onInputChange('verificationBody', changeValue)
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.verificationBody && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.verificationBody}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="verification-report-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-report-date-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errorIssuanceMessage?.verificationReportDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.verificationReportDate}
                setDateValue={changeValue =>
                  onInputChange('verificationReportDate', changeValue)
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorIssuanceMessage?.verificationReportDate && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.verificationReportDate}
              </Body>
            )}
          </StyledFieldContainer>
          {value.id && (
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="id" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'id',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'id',
                  })}
                  state={InputStateEnum.disabled}
                  value={value.id}
                />
              </InputContainer>
            </StyledFieldContainer>
          )}
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="verification-approach" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorIssuanceMessage?.verificationApproach &&
                  InputVariantEnum.error
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-approach',
                })}
                state={
                  areFieldsDisabled
                    ? InputStateEnum.disabled
                    : InputStateEnum.default
                }
                value={value.verificationApproach}
                onChange={changeValue =>
                  onInputChange('verificationApproach', changeValue)
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.verificationApproach && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.verificationApproach}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateProjectIssuancesForm };
