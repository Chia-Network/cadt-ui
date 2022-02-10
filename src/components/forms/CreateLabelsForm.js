import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
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
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
} from '..';
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

const CreateLabelsForm = ({ value, onChange, labelRef }) => {
  const [errorLabelMessage, setErrorLabelMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const selectLabelTypeOptions = useMemo(
    () =>
      pickLists.labelType.map(labelTypeItem => ({
        value: labelTypeItem,
        label: labelTypeItem,
      })),
    [pickLists],
  );

  const labelsValidations = async () => {
    for (let key of Object.keys(value)) {
      await labelSchema.fields[key]
        ?.validate(value[key], { abortEarly: false })
        .catch(error => {
          setErrorLabelMessage(prev => ({
            ...prev,
            [key]: error.errors[0],
          }));
        });
    }
  };

  useEffect(() => {
    setErrorLabelMessage({});
    if (labelRef) {
      labelRef.current = labelsValidations;
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
                  *<FormattedMessage id="label" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-label-description',
                  })}
                >
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
                state={InputStateEnum.default}
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
                options={selectLabelTypeOptions}
                state={SelectStateEnum.default}
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodStartDate: event })
                }
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodEndDate: event })
                }
              />
            </InputContainer>
            {errorLabelMessage?.creditingPeriodEndDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.creditingPeriodEndDate}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="validity-period-start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-validity-period-start-date-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.validityPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodStartDate: event })
                }
              />
            </InputContainer>
            {errorLabelMessage?.validityPeriodStartDate && (
              <Body size="Small" color="red">
                {errorLabelMessage.validityPeriodStartDate}
              </Body>
            )}
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="validity-period-end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-validity-period-end-date-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.validityPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodEndDate: event })
                }
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
                  })}
                >
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
                state={InputStateEnum.default}
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
                  })}
                >
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
                state={InputStateEnum.default}
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
