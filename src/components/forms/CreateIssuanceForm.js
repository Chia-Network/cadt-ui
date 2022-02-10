import u from 'updeep';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  DateSelect,
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
} from '..';
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

const CreateIssuanceForm = ({ value, onChange, issuanceRef }) => {
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const intl = useIntl();
  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  const issuanceValidations = async () => {
    for (let key of Object.keys(value)) {
      await issuanceSchema.fields[key]
        ?.validate(value[key], { abortEarly: false })
        .catch(error => {
          setErrorIssuanceMessage(prev => ({
            ...prev,
            [key]: error.errors[0],
          }));
        });
    }
  };

  useEffect(() => {
    setErrorIssuanceMessage({});
    if (issuanceRef && issuanceRef.current) {
      issuanceRef.current = issuanceValidations;
    }
  }, [value]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="start-date" />
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
                size="large"
                dateValue={value.startDate}
                setDateValue={changeValue =>
                  onInputChange('startDate', changeValue)
                }
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
                  <FormattedMessage id="end-date" />
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
                size="large"
                dateValue={value.endDate}
                setDateValue={changeValue =>
                  onInputChange('endDate', changeValue)
                }
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
                  <FormattedMessage id="verification-approach" />
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
                state={InputStateEnum.default}
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="verification-report-date" />
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
                size="large"
                dateValue={value.verificationReportDate}
                setDateValue={changeValue =>
                  onInputChange('verificationReportDate', changeValue)
                }
              />
            </InputContainer>
            {errorIssuanceMessage?.verificationReportDate && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.verificationReportDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="verification-body" />
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
                state={InputStateEnum.default}
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
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateIssuanceForm };
