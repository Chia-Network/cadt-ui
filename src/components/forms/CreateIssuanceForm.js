import u from 'updeep';
import React, { useState, useEffect, useMemo } from 'react';
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
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
} from '..';

const CreateIssuanceForm = ({ value, onChange }) => {
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const [selectedIssuance, setSelectedIssuance] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    if (value?.id) {
      setSelectedIssuance(getIssuanceById(value.id));
    }
  }, [value]);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    setValidationErrors(issuanceSchema, value, setErrorIssuanceMessage);
  }, [value]);

  const getIssuanceLabel = issuance => {
    const start = `${new Date(issuance.startDate).toDateString()}`;
    const end = `${new Date(issuance.endDate).toDateString()}`;
    return `${start} - ${end}`;
  };

  const issuancesSelectOptions = useMemo(() => {
    if (climateWarehouseStore.issuances) {
      return climateWarehouseStore.issuances.map(issuance => ({
        value: issuance.id,
        label: getIssuanceLabel(issuance),
      }));
    } else {
      return null;
    }
  }, [climateWarehouseStore.issuances]);

  const getIssuanceById = id => {
    if (id) {
      const foundIssuance = climateWarehouseStore?.issuances?.filter(
        issuance => issuance?.id === id,
      );
      if (foundIssuance?.length) {
        return foundIssuance[0];
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    if (selectedIssuance) {
      const {
        endDate,
        startDate,
        verificationApproach,
        verificationBody,
        verificationReportDate,
        id,
      } = selectedIssuance;
      onChange({
        endDate,
        startDate,
        verificationApproach,
        verificationBody,
        verificationReportDate,
        id,
      });
    }
  }, [selectedIssuance]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          {issuancesSelectOptions && (
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    <FormattedMessage id="select-existing-issuance" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'select-existing-issuance-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <Select
                  size={SelectSizeEnum.large}
                  type={SelectTypeEnum.basic}
                  options={issuancesSelectOptions}
                  state={SelectStateEnum.default}
                  selected={
                    selectedIssuance
                      ? [
                          {
                            value: selectedIssuance.id,
                            label: getIssuanceLabel(selectedIssuance),
                          },
                        ]
                      : undefined
                  }
                  onChange={selectedOptions =>
                    setSelectedIssuance({
                      ...getIssuanceById(selectedOptions[0].value),
                    })
                  }
                />
              </InputContainer>
            </StyledFieldContainer>
          )}
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
                size="large"
                dateValue={value.startDate}
                setDateValue={changeValue =>
                  onInputChange('startDate', changeValue)
                }
                disabled={selectedIssuance ? true : undefined}
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
                size="large"
                dateValue={value.endDate}
                setDateValue={changeValue =>
                  onInputChange('endDate', changeValue)
                }
                disabled={selectedIssuance ? true : undefined}
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
                size="large"
                dateValue={value.verificationReportDate}
                setDateValue={changeValue =>
                  onInputChange('verificationReportDate', changeValue)
                }
                disabled={selectedIssuance ? true : undefined}
              />
            </InputContainer>
            {errorIssuanceMessage?.verificationReportDate && (
              <Body size="Small" color="red">
                {errorIssuanceMessage.verificationReportDate}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {selectedIssuance && (
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
                  selectedIssuance
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
                  selectedIssuance
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
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateIssuanceForm };
