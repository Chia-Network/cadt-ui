import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Body,
  InputSizeEnum,
  InputStateEnum,
  StandardInput,
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
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  SimpleSelect,
} from '..';
import { splitUnits } from '../../store/actions/climateWarehouseActions';
import { splitUnitValidationSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

const SplitUnitForm = ({ onClose, record }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
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
  ]);
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const { units, pickLists } = useSelector(store => store.climateWarehouse);
  const [splitValidationErrors, setSplitValidationErrors] = useState([]);
  const [isFormValidationOn, setIsFormValidationOn] = useState(false);

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
      parseInt(data[0].unitCount) + parseInt(data[1].unitCount) ===
      fullRecord.unitCount,
    [data[0].unitCount, data[1].unitCount],
  );

  useEffect(() => {
    if (isFormValidationOn) {
      setValidationErrors(
        splitUnitValidationSchema,
        data,
        setSplitValidationErrors,
      );
    }
  }, [data, isFormValidationOn]);

  const onFormSubmit = async () => {
    if (!isFormValidationOn) {
      setIsFormValidationOn(true);
    }
    if (!apiResponseIsPending) {
      const isSplitUnitDataValid = await splitUnitValidationSchema.isValid();
      if (isSplitUnitDataValid && isUnitSumValid) {
        dispatch(splitUnits(getFormattedSplitUnitData()));
      }
    }
  };

  const getFormattedSplitUnitData = () => ({
    warehouseUnitId: fullRecord.warehouseUnitId,
    records: data.map(splittedUnit => {
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
  });

  const unitWasSuccessfullySplit =
    notification && notification.id === 'unit-successfully-split';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

  return (
    <Modal
      onOk={onFormSubmit}
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
            {data.map((unit, index) => (
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
                          splitValidationErrors[`[${index}].unitCount`]
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        value={unit.unitCount}
                        onChange={value =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].unitCount = value;
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
                    {isFormValidationOn &&
                      !isUnitSumValid &&
                      !splitValidationErrors[`[${index}].unitCount`] && (
                        <Body size="Small" color="red">
                          <FormattedMessage id="units-dont-add-up" />
                          {fullRecord.unitCount}
                        </Body>
                      )}
                    {isFormValidationOn &&
                      splitValidationErrors[`[${index}].unitCount`] && (
                        <Body size="Small" color="red">
                          <FormattedMessage id="unit-count-must-be-a-valid-integer" />
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
                          splitValidationErrors[`[${index}].unitOwner`]
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitOwner}
                        onChange={value =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].unitOwner = value;
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          <FormattedMessage id="unit-block-start" />
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
                          splitValidationErrors[`[${index}].unitBlockStart`]
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitBlockStart}
                        onChange={value =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].unitBlockStart = value;
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
                    {isFormValidationOn &&
                      splitValidationErrors[`[${index}].unitBlockStart`] && (
                        <Body size="Small" color="red">
                          <FormattedMessage id="unit-block-start-error" />
                        </Body>
                      )}
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        <LabelContainer>
                          <FormattedMessage id="unit-block-end" />
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
                          splitValidationErrors[`[${index}].unitBlockEnd`]
                            ? InputVariantEnum.error
                            : InputVariantEnum.default
                        }
                        state={
                          isUnitDivisible
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        value={unit.unitBlockEnd}
                        onChange={value =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].unitBlockEnd = value;
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
                    {isFormValidationOn &&
                      splitValidationErrors[`[${index}].unitBlockEnd`] && (
                        <Body size="Small" color="red">
                          <FormattedMessage id="unit-block-end-error" />
                        </Body>
                      )}
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
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].countryJurisdictionOfOwner =
                              selectedOptions[0];
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
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
                        onChange={value =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].inCountryJurisdictionOfOwner = value;
                            return newData;
                          })
                        }
                      />
                    </InputContainer>
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

export { SplitUnitForm };
