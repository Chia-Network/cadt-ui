import _ from 'lodash';
import u from 'updeep';
import React, { useState, useEffect, useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  DateVariantEnum,
  Select,
  SpanTwoColumnsContainer,
} from '..';

const CreateUnitIssuanceForm = ({ value, onChange }) => {
  const { issuances, projects } = useSelector(store => store.climateWarehouse);
  const { validateForm, formType } = useSelector(state => state.app);
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const intl = useIntl();
  const { location } = useHistory();

  const isUserOnUnitsPage = location.pathname.includes('projects')
    ? true
    : false;

  const areFieldsDisabled = useMemo(() => {
    if (!isUserOnUnitsPage) {
      if (value.id) {
        return true;
      }
      return false;
    }
    if (isUserOnUnitsPage) {
      return true;
    }
  }, [isUserOnUnitsPage, value, value.id]);

  const getIssuanceLabel = issuance => {
    const projectName = _.find(
      projects,
      project => project.warehouseProjectId === issuance.warehouseProjectId,
    );
    if (issuance) {
      const start = `${new Date(issuance.startDate).toDateString()}`;
      const end = `${new Date(issuance.endDate).toDateString()}`;
      return `${projectName?.projectName}: ${start} - ${end}`;
    }
  };

  const issuancesSelectOptions = useMemo(() => {
    if (issuances?.length > 0) {
      return issuances.map(issuance => ({
        value: issuance.id,
        label: getIssuanceLabel(issuance),
      }));
    } else {
      return null;
    }
  }, [issuances]);

  const updateIssuanceById = id => {
    const issuanceIsAvailable = issuances?.some(
      issuance => issuance?.id === id,
    );
    const selectedIssuance =
      issuanceIsAvailable &&
      issuances.filter(issuance => issuance?.id === id)[0];

    if (selectedIssuance) {
      const {
        endDate,
        startDate,
        verificationApproach,
        verificationBody,
        verificationReportDate,
        id,
        warehouseProjectId,
      } = selectedIssuance;
      onChange({
        endDate,
        startDate,
        verificationApproach,
        verificationBody,
        verificationReportDate,
        id,
        warehouseProjectId,
      });
    }
  };

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
          {issuancesSelectOptions && (
            <>
              <SpanTwoColumnsContainer>
                <StyledFieldContainer>
                  <StyledLabelContainer>
                    <Body>
                      <LabelContainer>
                        <FormattedMessage id="select-existing-issuance" />
                      </LabelContainer>
                      <ToolTipContainer
                        tooltip={intl.formatMessage({
                          id: isUserOnUnitsPage
                            ? 'select-existing-issuance'
                            : 'select-existing-issuance-description',
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
                      options={
                        issuancesSelectOptions ? issuancesSelectOptions : []
                      }
                      state={SelectStateEnum.default}
                      selected={
                        _.isEmpty(projects) && value.id
                          ? [
                              {
                                value: value.id,
                                label: getIssuanceLabel(value),
                              },
                            ]
                          : undefined
                      }
                      onChange={selectedOptions =>
                        updateIssuanceById(selectedOptions[0].value)
                      }
                    />
                  </InputContainer>
                  {isUserOnUnitsPage && issuancesSelectOptions === null && (
                    <Body size="Small" color="red">
                      {intl.formatMessage({
                        id: 'add-project-with-issuance',
                      })}
                    </Body>
                  )}
                </StyledFieldContainer>
              </SpanTwoColumnsContainer>
            </>
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

export { CreateUnitIssuanceForm };
