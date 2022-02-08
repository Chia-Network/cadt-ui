import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  Modal,
  Body,
  InputSizeEnum,
  InputStateEnum,
  StandardInput,
  InputVariantEnum,
  Message,
  LocalMessageTypeEnum,
  LocalMessage,
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
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
} from '..';
import { splitUnits } from '../../store/actions/climateWarehouseActions';

const SplitUnitForm = ({ onClose, record }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      unitCount: '',
      unitOwner: '',
      countryJurisdictionOfOwner: '',
      inCountryJurisdictionOfOwner: '',
    },
    {
      unitCount: '',
      unitOwner: '',
      countryJurisdictionOfOwner: '',
      inCountryJurisdictionOfOwner: '',
    },
  ]);
  const intl = useIntl();
  const [validationErrors, setValidationErrors] = useState([]);
  const { notification } = useSelector(state => state.app);

  const { units, pickLists } = useSelector(store => store.climateWarehouse);
  const fullRecord = units.filter(
    unit => unit.warehouseUnitId === record.warehouseUnitId,
  )[0];

  const selectCountriesOptions = useMemo(
    () =>
      pickLists.countries.map(country => ({ value: country, label: country })),
    [pickLists],
  );

  const unitIsSplitable = fullRecord.unitCount !== 1;

  const validationSchema = yup
    .array()
    .of(
      yup.object().shape({
        unitCount: yup.number().required().positive().integer(),
        unitOwnerOrgUid: yup.string().nullable(),
      }),
    )
    .test(
      'test array elements sum',
      'units do not add up',
      value => value[0].unitCount + value[1].unitCount === fullRecord.unitCount,
    );

  const onSubmit = () => {
    validationSchema
      .validate(data, { abortEarly: false, recursive: true })
      .then(() => {
        setValidationErrors([]);
        dispatch(
          splitUnits({
            warehouseUnitId: fullRecord.warehouseUnitId,
            records: data.map(splittedUnit => {
              const newUnit = {};
              newUnit.unitCount = splittedUnit.unitCount;

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
          }),
        );
      })
      .catch(err => {
        setValidationErrors([...err.errors]);
      });
  };

  const unitWasSuccessfullySplit =
    notification && notification.id === 'unit-successfully-split';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

  const getInputFieldState = index => {
    if (_.includes(validationErrors, 'units do not add up')) {
      return InputVariantEnum.error;
    }
    if (
      validationErrors.findIndex(element => element.includes(`${index}`)) !== -1
    ) {
      return InputVariantEnum.error;
    }
    return InputVariantEnum.default;
  };

  const getValidationLocalMessage = () => {
    if (
      validationErrors.findIndex(element => element.includes('0')) !== -1 ||
      validationErrors.findIndex(element => element.includes('1')) !== -1
    ) {
      return intl.formatMessage({
        id: 'unit-count-must-be-a-valid-integer',
      });
    }
    if (_.includes(validationErrors, 'units do not add up')) {
      return `
        ${intl.formatMessage({
          id: 'units-dont-add-up',
        })} ${fullRecord.unitCount}.
        `;
    }
    return '';
  };

  return (
    <>
      {notification && !unitWasSuccessfullySplit && (
        <Message id={notification.id} type={notification.type} />
      )}
      {validationErrors.length > 0 && (
        <LocalMessage
          msg={getValidationLocalMessage()}
          type={LocalMessageTypeEnum.error}
          onClose={() => setValidationErrors([])}
        />
      )}
      {unitIsSplitable === false && (
        <LocalMessage
          msg={intl.formatMessage({
            id: 'unit-cannot-be-split',
          })}
          type={LocalMessageTypeEnum.error}
        />
      )}
      <Modal
        onOk={onSubmit}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        hideButtons={!unitIsSplitable}
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
            <StyledFieldRequired />
            <FormContainerStyle>
              {data.map((unit, index) => (
                <BodyContainer key={index}>
                  <StyledLabelContainer>
                    <Body size="Bold">
                      <FormattedMessage id="record" /> {index + 1}
                    </Body>
                  </StyledLabelContainer>
                  <StyledFieldContainer>
                    {index === 1 && <StyledFieldRequired />}
                    {index === 0 && <FieldRequired />}
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
                          unitIsSplitable
                            ? InputStateEnum.default
                            : InputStateEnum.disabled
                        }
                        variant={getInputFieldState(index)}
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
                        state={
                          unitIsSplitable
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
                      <Select
                        size={SelectSizeEnum.large}
                        type={SelectTypeEnum.basic}
                        options={selectCountriesOptions}
                        state={
                          unitIsSplitable
                            ? SelectStateEnum.default
                            : SelectStateEnum.disabled
                        }
                        placeholder={intl.formatMessage({
                          id: 'country-jurisdiction-of-owner',
                        })}
                        onChange={selectedOption =>
                          setData(prevData => {
                            const newData = [...prevData];
                            newData[index].countryJurisdictionOfOwner =
                              selectedOption[0].value;
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
                          unitIsSplitable
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
              ))}
            </FormContainerStyle>
          </ModalFormContainerStyle>
        }
      />
    </>
  );
};

export { SplitUnitForm };
