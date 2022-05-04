import React, { useEffect, useState, useMemo, useRef } from 'react';
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
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  DateVariantEnum,
  SpanTwoColumnsContainer,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  SimpleSelectVariantEnum,
  SimpleSelect,
} from '..';

import { labelSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

const CreateUnitLabelsForm = ({ value, onChange }) => {
  const { labels, projects } = useSelector(store => store.climateWarehouse);
  const { validateForm, formType } = useSelector(state => state.app);
  const [errorLabelMessage, setErrorLabelMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);
  const [selectedWayToAddLabel, setSelectedWayToAddLabel] = useState(null);
  const [selectedProjectLabelOption, setSelectedProjectLabelOption] =
    useState(null);
  const [selectedLabelOption, setSelectedLabelOption] = useState(null);
  const wasLabelExisting = useRef(Boolean(value.id));

  const areFieldsDisabled = useMemo(
    () => (selectedWayToAddLabel?.value !== 1 ? true : false),
    [selectedWayToAddLabel],
  );

  const areFormFieldsVisible =
    (selectedWayToAddLabel?.value ||
      JSON.parse(localStorage.getItem('selectedLabel'))?.value) === 1 ||
    (selectedWayToAddLabel?.value === 2 && selectedLabelOption) ||
    (selectedWayToAddLabel?.value === 3 && selectedProjectLabelOption) ||
    wasLabelExisting.current;

  const wayToAddLabelOptions = [
    {
      label: intl.formatMessage({
        id: 'add-new-label',
      }),
      value: 1,
    },
    {
      label: intl.formatMessage({
        id: 'select-from-all-labels',
      }),
      value: 2,
    },
    {
      label: intl.formatMessage({
        id: 'select-label-by-project',
      }),
      value: 3,
    },
  ];

  const handleChange = selectedOptions => {
    setSelectedWayToAddLabel(selectedOptions[0]);
    if (selectedWayToAddLabel?.value == 1) {
      localStorage.setItem(
        'selectedLabel',
        JSON.stringify(selectedWayToAddLabel),
      );
    }
    onChange({
      label: '',
      labelType: '',
      creditingPeriodStartDate: '',
      creditingPeriodEndDate: '',
      validityPeriodStartDate: '',
      validityPeriodEndDate: '',
      unitQuantity: 0,
      labelLink: '',
      warehouseProjectId: null,
      id: null,
    });
    setSelectedProjectLabelOption(null);
    setSelectedLabelOption(null);
  };

  const projectsSelectOptions = useMemo(() => {
    if (projects?.length > 0) {
      return projects.reduce((accumulator, project) => {
        if (project?.labels?.length > 0) {
          const optionsForTheCurrentProject = project.labels.map(label => ({
            value: label.id,
            label: `${project.projectName} - ${label.label}`,
          }));

          return [...accumulator, ...optionsForTheCurrentProject];
        }
        return accumulator;
      }, []);
    } else {
      return null;
    }
  }, [projects]);

  const labelsSelectOptions = useMemo(() => {
    if (labels?.length > 0) {
      return labels.map(label => ({
        value: label.id,
        label: label.label,
      }));
    } else {
      return [];
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
        warehouseProjectId,
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
        warehouseProjectId,
      });
    }
  };

  useEffect(() => {
    if (validateForm && formType === 'labels') {
      setValidationErrors(labelSchema, value, setErrorLabelMessage);
    }
  }, [value, validateForm, formType]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <SpanTwoColumnsContainer>
            {wasLabelExisting.current === false && (
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      <FormattedMessage id="way-to-add-label" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'way-to-add-label',
                      })}>
                      <DescriptionIcon height="14" width="14" />
                    </ToolTipContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <Select
                    size={SelectSizeEnum.large}
                    type={SelectTypeEnum.basic}
                    options={wayToAddLabelOptions}
                    state={SelectStateEnum.default}
                    selected={
                      selectedWayToAddLabel
                        ? [selectedWayToAddLabel]
                        : JSON.parse(localStorage.getItem('selectedLabel'))
                        ? [JSON.parse(localStorage.getItem('selectedLabel'))]
                        : undefined
                    }
                    onChange={handleChange}
                  />
                </InputContainer>
                {selectedWayToAddLabel === null && (
                  <Body size="Small" color="red">
                    <FormattedMessage id="way-to-add-label" />
                  </Body>
                )}
              </StyledFieldContainer>
            )}

            {selectedWayToAddLabel?.value === 2 && (
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      <FormattedMessage id="select-existing-label" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'select-existing-label',
                      })}>
                      <DescriptionIcon height="14" width="14" />
                    </ToolTipContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <Select
                    size={SelectSizeEnum.large}
                    type={SelectTypeEnum.basic}
                    options={labelsSelectOptions}
                    state={SelectStateEnum.default}
                    selected={
                      selectedLabelOption ? [selectedLabelOption] : undefined
                    }
                    onChange={selectedOptions => {
                      updateLabelById(selectedOptions[0].value);
                      setSelectedLabelOption(selectedOptions[0]);
                    }}
                  />
                </InputContainer>
                {selectedLabelOption === null && (
                  <Body size="Small" color="red">
                    <FormattedMessage id="select-existing-label" />
                  </Body>
                )}
              </StyledFieldContainer>
            )}

            {selectedWayToAddLabel?.value === 3 && (
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      <FormattedMessage id="select-label-by-project" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'select-label-by-project',
                      })}>
                      <DescriptionIcon height="14" width="14" />
                    </ToolTipContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <Select
                    size={SelectSizeEnum.large}
                    type={SelectTypeEnum.basic}
                    options={projectsSelectOptions}
                    state={SelectStateEnum.default}
                    selected={
                      selectedProjectLabelOption
                        ? [selectedProjectLabelOption]
                        : undefined
                    }
                    onChange={selectedOptions => {
                      setSelectedProjectLabelOption(selectedOptions[0]);
                      updateLabelById(selectedOptions[0].value);
                    }}
                  />
                </InputContainer>
                {selectedProjectLabelOption === null && (
                  <Body size="Small" color="red">
                    <FormattedMessage id="select-label-by-project" />
                  </Body>
                )}
              </StyledFieldContainer>
            )}
          </SpanTwoColumnsContainer>

          {areFormFieldsVisible && (
            <>
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
                  <SimpleSelect
                    variant={
                      errorLabelMessage?.labelType &&
                      SimpleSelectVariantEnum.error
                    }
                    size={SimpleSelectSizeEnum.large}
                    type={SimpleSelectTypeEnum.basic}
                    options={pickLists.labelType}
                    state={
                      areFieldsDisabled
                        ? SimpleSelectStateEnum.disabled
                        : SimpleSelectStateEnum.default
                    }
                    selected={value.labelType ? [value.labelType] : undefined}
                    onChange={selectedOptions =>
                      onChange({ ...value, labelType: selectedOptions[0] })
                    }
                  />
                </InputContainer>
                {errorLabelMessage?.labelType && (
                  <Body size="Small" color="red">
                    {errorLabelMessage.labelType}
                  </Body>
                )}
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
                      errorLabelMessage.labelLink && InputVariantEnum.error
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
                    onChange={event => {
                      onChange({ ...value, labelLink: event });
                    }}
                  />
                  {errorLabelMessage?.labelLink && (
                    <Body size="Small" color="red">
                      {errorLabelMessage.labelLink}
                    </Body>
                  )}
                </StyledFieldContainer>
              </SpanTwoColumnsContainer>
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
                    key={value.validityPeriodStartDate}
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
                    key={value.validityPeriodEndDate}
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
                    key={value.creditingPeriodStartDate}
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
                    key={value.creditingPeriodEndDate}
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
            </>
          )}
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateUnitLabelsForm };
