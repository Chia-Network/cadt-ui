import u from 'updeep';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
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
  SpanTwoColumnsContainer,
} from '..';

const CreateUnitIssuanceForm = ({ value, onChange }) => {
  const { validateForm } = useSelector(state => state.app);
  const { issuances } = useSelector(store => store.climateWarehouse);
  const [selectedWarehouseProjectId, setSelectedWarehouseProjectId] =
    useState(null);
  const [selectedIssuanceId, setSelectedIssuanceId] = useState(null);
  const intl = useIntl();

  // if unit has issuance, infer project id
  useEffect(() => {
    if (value?.id && issuances) {
      setSelectedIssuanceId(value.id);
      const projectId = issuances.filter(item => item.id)[0].warehouseProjectId;
      setSelectedWarehouseProjectId(projectId);
    }
  }, [value, issuances]);

  // if unit has no issuance yet, infer it from local storage from selected project at the beginning of the form
  useEffect(() => {
    const unitSelectedWarehouseProjectId = localStorage.getItem(
      'unitSelectedWarehouseProjectId',
    );
    if (unitSelectedWarehouseProjectId && selectedWarehouseProjectId === null) {
      setSelectedWarehouseProjectId(unitSelectedWarehouseProjectId);
    }
  }, []);

  const getIssuanceLabel = useCallback(
    id => {
      if (issuances) {
        for (const issuance of issuances) {
          if (issuance.id === id) {
            const start = `${new Date(issuance.startDate).toDateString()}`;
            const end = `${new Date(issuance.endDate).toDateString()}`;
            return `${start} - ${end}`;
          }
        }
      }
      return id;
    },
    [issuances],
  );

  const issuancesSelectOptions = useMemo(() => {
    if (issuances?.length > 0) {
      return issuances.reduce((acc, issuance) => {
        if (issuance.warehouseProjectId === selectedWarehouseProjectId)
          return [
            ...acc,
            {
              value: issuance.id,
              label: getIssuanceLabel(issuance.id),
            },
          ];
        return acc;
      }, []);
    }
    return [];
  }, [issuances, selectedWarehouseProjectId]);

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

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <SpanTwoColumnsContainer>
            {selectedWarehouseProjectId && (
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      <FormattedMessage id="select-existing-issuance" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'select-existing-issuance',
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
                      selectedIssuanceId
                        ? [
                            {
                              value: selectedIssuanceId,
                              label: getIssuanceLabel(selectedIssuanceId),
                            },
                          ]
                        : undefined
                    }
                    onChange={selectedOptions => {
                      setSelectedIssuanceId(selectedOptions[0].value);
                      updateIssuanceById(selectedOptions[0].value);
                    }}
                  />
                </InputContainer>
                {selectedIssuanceId === null && validateForm && (
                  <Body size="Small" color="red">
                    {intl.formatMessage({
                      id: 'select-existing-issuance',
                    })}
                  </Body>
                )}
              </StyledFieldContainer>
            )}
          </SpanTwoColumnsContainer>

          {selectedWarehouseProjectId && selectedIssuanceId && value.id && (
            <>
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
                    disabled
                  />
                </InputContainer>
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
                    disabled
                  />
                </InputContainer>
              </StyledFieldContainer>

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
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'verification-body',
                    })}
                    state={InputStateEnum.disabled}
                    value={value.verificationBody}
                    onChange={changeValue =>
                      onInputChange('verificationBody', changeValue)
                    }
                  />
                </InputContainer>
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
                    disabled
                  />
                </InputContainer>
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
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'verification-approach',
                    })}
                    state={InputStateEnum.disabled}
                    value={value.verificationApproach}
                    onChange={changeValue =>
                      onInputChange('verificationApproach', changeValue)
                    }
                  />
                </InputContainer>
              </StyledFieldContainer>
            </>
          )}
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateUnitIssuanceForm };
