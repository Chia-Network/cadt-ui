import React, { useMemo, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import {
  Modal,
  Body,
  ModalFormContainerStyle,
  modalTypeEnum,
  FormContainerStyle,
  UnitSplitForm,
  FormikRepeater,
} from '..';
import { splitUnitsValidationSchema } from '../../store/validations';
import { splitUnits } from '../../store/actions/climateWarehouseActions';

const UnitSplitFormModal = ({ onClose, record }) => {
  const { units } = useSelector(store => store.climateWarehouse);
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const dispatch = useDispatch();
  const initialValues = useMemo(() => ({ units: [] }), []);
  const emptyUnit = useMemo(
    () => ({
      unitCount: 0,
      unitOwner: '',
      countryJurisdictionOfOwner: '',
      inCountryJurisdictionOfOwner: '',
      unitBlockStart: '',
      unitBlockEnd: '',
    }),
    [],
  );

  const fullRecord = useMemo(
    () =>
      units.filter(unit => unit.warehouseUnitId === record.warehouseUnitId)[0],
    [units],
  );

  const isUnitDivisible = useMemo(
    () => parseInt(fullRecord.unitCount) !== 1,
    [fullRecord],
  );

  const getIsUnitSumValid = useCallback(
    units => {
      const splittedUnitsSum = units.reduce(
        (acc, cur) => parseInt(cur?.unitCount) + acc,
        0,
      );
      return splittedUnitsSum === fullRecord.unitCount;
    },
    [fullRecord],
  );

  const submitValues = useCallback(
    values => {
      if (getIsUnitSumValid(values.units) && !apiResponseIsPending) {
        const dataToBeSubmitted = {
          warehouseUnitId: fullRecord.warehouseUnitId,
          records: values.units.map(splittedUnit => {
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
    [apiResponseIsPending],
  );

  // if unit was successfully split, close modal
  const unitWasSuccessfullySplit =
    notification && notification.id === 'unit-successfully-split';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

  return (
    <Formik
      validationSchema={splitUnitsValidationSchema}
      initialValues={initialValues}
      onSubmit={submitValues}
    >
      {formik => (
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
              {_.isEmpty(formik.errors) &&
                !getIsUnitSumValid(formik.values.units) && (
                  <Body size="Small" color="red">
                    <FormattedMessage id="units-dont-add-up" />
                    {fullRecord.unitCount}
                  </Body>
                )}
              {!isUnitDivisible && (
                <Body size="Small" color="red">
                  <FormattedMessage id="unit-cannot-be-split" />
                </Body>
              )}
              <Body size="Small">
                <FormattedMessage id="serial-number-block" />:{' '}
                {fullRecord.serialNumberBlock}
              </Body>
              <FormContainerStyle>
                <FormikRepeater
                  empty={emptyUnit}
                  name="units"
                  min={2}
                  max={4}
                  Component={UnitSplitForm}
                />
              </FormContainerStyle>
            </ModalFormContainerStyle>
          }
        />
      )}
    </Formik>
  );
};

export { UnitSplitFormModal };
