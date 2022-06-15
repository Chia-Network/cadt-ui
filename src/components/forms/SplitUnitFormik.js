/* eslint-disable no-constant-condition */
import React, { useMemo, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
  Modal,
  Body,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  ModalFormContainerStyle,
  modalTypeEnum,
  FormContainerStyle,
  BodyContainer,
  LabelContainer,
  ToolTipContainer,
  DescriptionIcon,
  FieldRequired,
  StyledFieldRequired,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SimpleSelectSizeEnum,
  SimpleSelectStateEnum,
  SimpleSelectTypeEnum,
  SimpleSelect,
} from '..';
import { splitUnitValidationSchema } from '../../store/validations';
import { splitUnits } from '../../store/actions/climateWarehouseActions';
import { ErrorFormik } from '../form/ErrorFormik';
import { StandardInput } from '../form/StandardInput';

const SplitUnitFormik = ({ onClose, record }) => {
  const { units, pickLists } = useSelector(store => store.climateWarehouse);
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: [
      {
        unitCount: 0,
        unitOwner: '',
        countryJurisdictionOfOwner: '',
        inCountryJurisdictionOfOwner: '',
        unitBlockStart: '',
        unitBlockEnd: '',
      },
      {
        unitCount: 0,
        unitOwner: '',
        countryJurisdictionOfOwner: '',
        inCountryJurisdictionOfOwner: '',
        unitBlockStart: '',
        unitBlockEnd: '',
      },
    ],
    validationSchema: splitUnitValidationSchema,
    onSubmit: () => {
      if (isUnitSumValid && !apiResponseIsPending) {
        const dataToBeSubmitted = {
          warehouseUnitId: fullRecord.warehouseUnitId,
          records: formik.values.map(splittedUnit => {
            const newUnit = {};
            newUnit.unitCount = splittedUnit.unitCount;
            newUnit.unitBlockStart = splittedUnit.unitBlockStart;
            newUnit.unitBlockEnd = splittedUnit.unitBlockEnd;

            if (splittedUnit.unitOwner !== '') {
              newUnit.unitOwner = splittedUnit.unitOwner;
            }

            if (splittedUnit.countryJurisdictionOfOwner !== '') {
              newUnit.countryJurisdictionOfOwner =
                splittedUnit.countryJurisdictionOfOwner;
            }

            if (splittedUnit.inCountryJurisdictionOfOwner !== '') {
              newUnit.inCountryJurisdictionOfOwner =
                splittedUnit.inCountryJurisdictionOfOwner;
            }

            return newUnit;
          }),
        };

        dispatch(splitUnits(dataToBeSubmitted));
      }
    },
  });

  const fullRecord = useMemo(
    () =>
      units.filter(unit => unit.warehouseUnitId === record.warehouseUnitId)[0],
    [units],
  );

  const isUnitDivisible = useMemo(
    () => parseInt(fullRecord.unitCount) !== 1,
    [fullRecord],
  );

  const isUnitSumValid = useMemo(
    () =>
      parseInt(formik.values[0].unitCount) +
        parseInt(formik.values[1].unitCount) ===
      fullRecord.unitCount,
    [formik.values[0].unitCount, formik.values[1].unitCount],
  );

  const unitWasSuccessfullySplit =
    notification && notification.id === 'unit-successfully-split';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

  return (
    <Modal
      onOk={formik.submitForm}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      hideButtons={!isUnitDivisible}
      title={intl.formatMessage({
        id: 'split',
      })}
      label={intl.formatMessage({
        id: 'split',
      })}
      body={
        <ModalFormContainerStyle>
          <Body size="Bold">
            <FormattedMessage id="total-units-available" />:{' '}
            {fullRecord.unitCount}
          </Body>
          <FormContainerStyle>
            {formik.values.map((unit, index) => (
              <React.Fragment key={index}>
                {index === 1 && <StyledFieldRequired />}
                {index === 0 && <FieldRequired />}
                <StyledLabelContainer>
                  <Body size="Bold">
                    <FormattedMessage id="record" /> {index + 1}
                  </Body>
                </StyledLabelContainer>
                <BodyContainer key={index}>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          * <FormattedMessage id="nr-of-units" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'unit-count',
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
                          id: 'nr-of-units',
                        })}
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        variant={
                          false
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        name={`[${index}].unitCount`}
                        value={unit.unitCount}
                        onChange={value =>
                          formik.setFieldValue(`[${index}].unitCount`, value)
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={formik?.touched[index]?.unitCount}
                      error={formik?.errors[index]?.unitCount}
                    />
                    {formik?.touched[index]?.unitCount && !isUnitSumValid && (
                      <Body size="Small" color="red">
                        <FormattedMessage id="units-dont-add-up" />
                        {fullRecord.unitCount}
                      </Body>
                    )}
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          <FormattedMessage id="unit-owner" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'units-unit-owner-description',
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
                          id: 'unit-owner',
                        })}
                        variant={
                          false
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitOwner}
                        name={`[${index}].unitOwner`}
                        onChange={value =>
                          formik.setFieldValue(`[${index}].unitOwner`, value)
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={formik?.touched[index]?.unitOwner}
                      error={formik?.errors[index]?.unitOwner}
                    />
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          * <FormattedMessage id="unit-block-start" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'units-unit-block-start-description',
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
                          id: 'unit-block-start',
                        })}
                        variant={
                          false
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitBlockStart}
                        name={`[${index}].unitBlockStart`}
                        onChange={value =>
                          formik.setFieldValue(
                            `[${index}].unitBlockStart`,
                            value,
                          )
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={formik?.touched[index]?.unitBlockStart}
                      error={formik?.errors[index]?.unitBlockStart}
                    />
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          * <FormattedMessage id="unit-block-end" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'units-unit-block-end-description',
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
                          id: 'unit-block-end',
                        })}
                        variant={
                          false
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitBlockEnd}
                        name={`[${index}].unitBlockEnd`}
                        onChange={value =>
                          formik.setFieldValue(`[${index}].unitBlockEnd`, value)
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={formik?.touched[index]?.unitBlockEnd}
                      error={formik?.errors[index]?.unitBlockEnd}
                    />
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          <FormattedMessage id="country-jurisdiction-of-owner" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'units-country-jurisdiction-of-owner-description',
                          })}
                        >
                          <DescriptionIcon height="14" width="14" />
                        </ToolTipContainer>
                      </Body>
                    </StyledLabelContainer>
                    <InputContainer>
                      <SimpleSelect
                        size={SimpleSelectSizeEnum.large}
                        type={SimpleSelectTypeEnum.basic}
                        options={pickLists.countries}
                        state={
                          isUnitDivisible
                            ? SimpleSelectStateEnum.default
                            : SimpleSelectStateEnum.disabled
                        }
                        onChange={selectedOptions =>
                          formik.setFieldValue(
                            `[${index}].countryJurisdictionOfOwner`,
                            selectedOptions[0],
                          )
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={
                        formik?.touched[index]?.countryJurisdictionOfOwner
                      }
                      error={formik?.errors[index]?.countryJurisdictionOfOwner}
                    />
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          <FormattedMessage id="in-country-jurisdiction-of-owner" />
                        </LabelContainer>
                        <ToolTipContainer
                          tooltip={intl.formatMessage({
                            id: 'units-in-country-jurisdiction-of-owner-description',
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
                          id: 'in-country-jurisdiction-of-owner',
                        })}
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.inCountryJurisdictionOfOwner}
                        name={`[${index}].inCountryJurisdictionOfOwner`}
                        onChange={value =>
                          formik.setFieldValue(
                            `[${index}].inCountryJurisdictionOfOwner`,
                            value,
                          )
                        }
                        onBlur={formik.handleBlur}
                      />
                    </InputContainer>
                    <ErrorFormik
                      touched={
                        formik?.touched[index]?.inCountryJurisdictionOfOwner
                      }
                      error={
                        formik?.errors[index]?.inCountryJurisdictionOfOwner
                      }
                    />
                  </StyledFieldContainer>
                </BodyContainer>
              </React.Fragment>
            ))}
          </FormContainerStyle>
        </ModalFormContainerStyle>
      }
    />
  );
};

export { SplitUnitFormik };
