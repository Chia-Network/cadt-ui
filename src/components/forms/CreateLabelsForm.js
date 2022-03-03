import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

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
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  SelectVariantEnum,
  DateVariantEnum,
} from '..';

import { labelSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

const CreateLabelsForm = ({ value, onChange }) => {
  const { labels } = useSelector(store => store.climateWarehouse);
  const [errorLabelMessage, setErrorLabelMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);
  const { location } = useHistory();

  const isUserOnUnitsPage = location.pathname.includes('units') ? true : false;

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

  const labelsSelectOptions = useMemo(() => {
    if (labels?.length > 0) {
      return labels.map(label => ({
        value: label.id,
        label: label.label,
      }));
    } else {
      return null;
    }
  }, [labels]);

  const updateLabelById = id => {
    const labelIsAvailable = labels?.some(label => label?.id === id);
    const selectedLabel =
      labelIsAvailable && labels.filter(label => label?.id === id)[0];

    if (selectedLabel) {
      const {
        creditingPeriodEndDate,
        creditingPeriodStartDate,
        id,
        label,
        labelLink,
        labelType,
        unitQuantity,
        validityPeriodEndDate,
        validityPeriodStartDate,
      } = selectedLabel;
      onChange({
        creditingPeriodEndDate,
        creditingPeriodStartDate,
        id,
        label,
        labelLink,
        labelType,
        unitQuantity,
        validityPeriodEndDate,
        validityPeriodStartDate,
      });
    }
  };

  const selectLabelTypeOptions = useMemo(
    () =>
      pickLists.labelType.map(labelTypeItem => ({
        value: labelTypeItem,
        label: labelTypeItem,
      })),
    [pickLists],
  );

  useEffect(() => {
    setValidationErrors(labelSchema, value, setErrorLabelMessage);
  }, [value]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="select-existing-label" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: isUserOnUnitsPage
                      ? 'select-existing-label'
                      : 'select-existing-label-description',
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
                options={labelsSelectOptions ? labelsSelectOptions : []}
                state={SelectStateEnum.default}
                selected={
                  value.id
                    ? [
                        {
                          value: value.id,
                          label: value.label,
                        },
                      ]
                    : undefined
                }
                onChange={selectedOptions =>
                  updateLabelById(selectedOptions[0].value)
                }
              />
            </InputContainer>
            {isUserOnUnitsPage && labelsSelectOptions === null && (
              <Body size="Small" color="red">
                {intl.formatMessage({
                  id: 'add-project-with-label',
                })}
              </Body>
            )}
          </StyledFieldContainer>
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
                variant={errorLabelMessage?.label && InputVariantEnum.error}
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
                onChange={event => {
                  onChange({ ...value, label: event });
                }}
              />
            </InputContainer>
            {errorLabelMessage?.label && (
              <Body size="Small" color="red">
                {errorLabelMessage.label}
              </Body>
            )}
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
              <Select
                variant={
                  errorLabelMessage?.labelType && SelectVariantEnum.error
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectLabelTypeOptions}
                state={
                  areFieldsDisabled
                    ? SelectStateEnum.disabled
                    : SelectStateEnum.default
                }
                selected={
                  value.labelType
                    ? [{ value: value.labelType, label: value.labelType }]
                    : undefined
                }
                onChange={selectedOptions =>
                  onChange({ ...value, labelType: selectedOptions[0].value })
                }
              />
            </InputContainer>
            {errorLabelMessage?.labelType && (
              <Body size="Small" color="red">
                {errorLabelMessage.labelType}
              </Body>
            )}
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
                  errorLabelMessage?.creditingPeriodStartDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodStartDate: event })
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorLabelMessage?.creditingPeriodStartDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.creditingPeriodStartDate}
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
                    id: 'labels-crediting-period-end-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                variant={
                  errorLabelMessage?.creditingPeriodEndDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.creditingPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodEndDate: event })
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorLabelMessage?.creditingPeriodEndDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.creditingPeriodEndDate}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  errorLabelMessage?.validityPeriodStartDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.validityPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodStartDate: event })
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorLabelMessage?.validityPeriodStartDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.validityPeriodStartDate}
              </Body>
            )}
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
                  errorLabelMessage?.validityPeriodEndDate &&
                  DateVariantEnum.error
                }
                size="large"
                dateValue={value.validityPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodEndDate: event })
                }
                disabled={areFieldsDisabled ? true : undefined}
              />
            </InputContainer>
            {errorLabelMessage?.validityPeriodEndDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.validityPeriodEndDate}
              </Body>
            )}
          </StyledFieldContainer>
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
                  errorLabelMessage.unitQuantity && InputVariantEnum.error
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
                onChange={event => {
                  onChange({ ...value, unitQuantity: event });
                }}
              />
            </InputContainer>
            {errorLabelMessage?.unitQuantity && (
              <Body size="Small" color="red">
                {errorLabelMessage.unitQuantity}
              </Body>
            )}
          </StyledFieldContainer>
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
            <InputContainer>
              <StandardInput
                variant={errorLabelMessage.labelLink && InputVariantEnum.error}
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
                onChange={event => {
                  onChange({ ...value, labelLink: event });
                }}
              />
            </InputContainer>
            {errorLabelMessage?.labelLink && (
              <Body size="Small" color="red">
                {errorLabelMessage.labelLink}
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
