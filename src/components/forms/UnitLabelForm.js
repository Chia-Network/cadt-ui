import _ from 'lodash';
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  memo,
} from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { FormikError } from '../form/FormikError';

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
  DateSelectVariantEnum,
  SpanTwoColumnsContainer,
  SimpleSelectStateEnum,
  SimpleSelectVariantEnum,
  SelectCreatable,
} from '..';

import { SelectVariantEnum } from '../form/Select';

// eslint-disable-next-line react/display-name
const UnitLabelForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const getFieldName = fieldName => `${name}[${index}].${fieldName}`;
    const { labels, myProjects } = useSelector(store => store.climateWarehouse);
    const intl = useIntl();
    const { pickLists } = useSelector(store => store.climateWarehouse);
    const [selectedWayToAddLabel, setSelectedWayToAddLabel] = useState(null);
    const [selectedProjectLabelOption, setSelectedProjectLabelOption] =
      useState(null);
    const [selectedLabelOption, setSelectedLabelOption] = useState(null);
    const wasLabelExisting = useRef(Boolean(value.id));

    useEffect(() => {
      if (
        !_.isEmpty(
          _.filter(Object.values({ ...value, tempId: '' }), value => value),
        ) &&
        !selectedWayToAddLabel
      ) {
        if (!value.id) {
          setSelectedWayToAddLabel(wayToAddLabelOptions[0]);
        }
      }
    }, []);

    const areFieldsDisabled = selectedWayToAddLabel?.value !== 1 ? true : false;

    const areFormFieldsVisible =
      selectedWayToAddLabel?.value === 1 ||
      (selectedWayToAddLabel?.value === 2 && selectedLabelOption) ||
      (selectedWayToAddLabel?.value === 3 && selectedProjectLabelOption) ||
      wasLabelExisting.current;

    const wayToAddLabelOptions = useMemo(
      () => [
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
      ],
      [],
    );

    const changeWayToAddLabel = useCallback(
      selectedOptions => {
        setSelectedWayToAddLabel(selectedOptions[0]);
        setFieldValue(`${name}[${index}]`, {
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
          tempId: value?.tempId || null,
        });
        setSelectedProjectLabelOption(null);
        setSelectedLabelOption(null);
      },
      [name, index, setFieldValue],
    );

    const projectsSelectOptions = useMemo(() => {
      if (myProjects?.length > 0) {
        return myProjects.reduce((accumulator, project) => {
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
    }, [myProjects]);

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

    const updateLabelById = useCallback(
      id => {
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
          setFieldValue(`${name}[${index}]`, {
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
      },
      [labels, name, index, setFieldValue],
    );

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
                      variant={
                        selectedWayToAddLabel === null &&
                        SelectVariantEnum.error
                      }
                      selected={
                        selectedWayToAddLabel
                          ? [selectedWayToAddLabel]
                          : undefined
                      }
                      onChange={changeWayToAddLabel}
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
                      variant={
                        selectedLabelOption === null && SelectVariantEnum.error
                      }
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
                      variant={
                        selectedProjectLabelOption === null &&
                        SelectVariantEnum.error
                      }
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

            {/* only input fields from this line below are connected to formik */}
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
                      variant={
                        errors?.label &&
                        touched?.label &&
                        InputVariantEnum.error
                      }
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
                      onChange={value =>
                        setFieldValue(getFieldName('label'), value)
                      }
                      onBlur={handleBlur}
                      name={getFieldName('label')}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('label')} />
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
                    <SelectCreatable
                      variant={
                        (errors?.labelType &&
                          touched?.labelType &&
                          SimpleSelectVariantEnum.error) ||
                        (areFieldsDisabled
                          ? SimpleSelectStateEnum.disabled
                          : SimpleSelectStateEnum.default)
                      }
                      options={pickLists.labelType}
                      selected={value.labelType}
                      onChange={val =>
                        setFieldValue(getFieldName('labelType'), val)
                      }
                      onBlur={handleBlur}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('labelType')} />
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
                        errors?.labelLink &&
                        touched?.labelLink &&
                        InputVariantEnum.error
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
                      onChange={value =>
                        setFieldValue(getFieldName('labelLink'), value)
                      }
                      onBlur={handleBlur}
                      name={getFieldName('labelLink')}
                    />
                    <FormikError name={getFieldName('labelLink')} />
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
                      variant={
                        errors?.validityPeriodStartDate &&
                        touched?.validityPeriodStartDate &&
                        DateSelectVariantEnum.error
                      }
                      size="large"
                      dateValue={value.validityPeriodStartDate}
                      setDateValue={value =>
                        setFieldValue(
                          getFieldName('validityPeriodStartDate'),
                          value,
                        )
                      }
                      name={getFieldName('validityPeriodStartDate')}
                      onBlur={handleBlur}
                      disabled={areFieldsDisabled ? true : undefined}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('validityPeriodStartDate')} />
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
                        errors?.validityPeriodEndDate &&
                        touched?.validityPeriodEndDate &&
                        DateSelectVariantEnum.error
                      }
                      size="large"
                      dateValue={value.validityPeriodEndDate}
                      setDateValue={value =>
                        setFieldValue(
                          getFieldName('validityPeriodEndDate'),
                          value,
                        )
                      }
                      name={getFieldName('validityPeriodEndDate')}
                      onBlur={handleBlur}
                      disabled={areFieldsDisabled ? true : undefined}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('validityPeriodEndDate')} />
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
                        errors?.creditingPeriodStartDate &&
                        touched?.creditingPeriodStartDate &&
                        DateSelectVariantEnum.error
                      }
                      size="large"
                      dateValue={value.creditingPeriodStartDate}
                      setDateValue={value =>
                        setFieldValue(
                          getFieldName('creditingPeriodStartDate'),
                          value,
                        )
                      }
                      name={getFieldName('creditingPeriodStartDate')}
                      onBlur={handleBlur}
                      disabled={areFieldsDisabled ? true : undefined}
                    />
                  </InputContainer>
                  <FormikError
                    name={getFieldName('creditingPeriodStartDate')}
                  />
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
                        errors?.creditingPeriodEndDate &&
                        touched?.creditingPeriodEndDate &&
                        DateSelectVariantEnum.error
                      }
                      size="large"
                      dateValue={value.creditingPeriodEndDate}
                      setDateValue={value =>
                        setFieldValue(
                          getFieldName('creditingPeriodEndDate'),
                          value,
                        )
                      }
                      name={getFieldName('creditingPeriodEndDate')}
                      onBlur={handleBlur}
                      disabled={areFieldsDisabled ? true : undefined}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('creditingPeriodEndDate')} />
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
                        errors?.unitQuantity &&
                        touched?.unitQuantity &&
                        InputVariantEnum.error
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
                      name={getFieldName('unitQuantity')}
                      onChange={value =>
                        setFieldValue(getFieldName('unitQuantity'), value)
                      }
                      onBlur={handleBlur}
                    />
                  </InputContainer>
                  <FormikError name={getFieldName('unitQuantity')} />
                </StyledFieldContainer>
              </>
            )}
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { UnitLabelForm };
