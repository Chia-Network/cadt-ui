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
  FormikRepeater,
  UnitSplitForm,
} from '..';
import { splitUnitsValidationSchema } from '../../store/validations';
import { editStagingData } from '../../store/actions/climateWarehouseActions';

const UnitSplitEditStagingFormModal = ({ onClose, changeGroup }) => {
  const { units } = useSelector(store => store.climateWarehouse);
  const intl = useIntl();
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const dispatch = useDispatch();

  const fullRecord = useMemo(
    () =>
      units.filter(
        unit =>
          unit.warehouseUnitId === changeGroup.diff.original.warehouseUnitId,
      )[0],
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

  const initialValues = useMemo(
    () => ({
      units: changeGroup.diff.change.map(unitItem => ({
        ...unitItem,
        unitCount: unitItem?.unitCount ?? 0,
        unitOwner: unitItem?.unitOwner ?? '',
        countryJurisdictionOfOwner: unitItem?.countryJurisdictionOfOwner ?? '',
        inCountryJurisdictionOfOwner:
          unitItem?.inCountryJurisdictionOfOwner ?? '',
        unitBlockStart: unitItem?.unitBlockStart ?? '',
        unitBlockEnd: unitItem?.unitBlockEnd ?? '',
      })),
    }),
    [changeGroup],
  );

  // if staging unit split was successfully edited, close modal
  const unitWasSuccessfullySplit =
    notification && notification.id === 'staging-group-edited';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

  const submitForm = useCallback(
    values => {
      if (getIsUnitSumValid(values.units) && !apiResponseIsPending) {
        dispatch(editStagingData(changeGroup.uuid, values.units));
      }
    },
    [changeGroup, apiResponseIsPending],
  );

  return (
    <Formik
      validationSchema={splitUnitsValidationSchema}
      initialValues={initialValues}
      onSubmit={submitForm}
    >
      {formik => (
        <Modal
          onOk={formik.submitForm}
          onClose={onClose}
          modalType={modalTypeEnum.basic}
          hideButtons={!isUnitDivisible}
          title={intl.formatMessage({
            id: 'edit-split-unit',
          })}
          label={intl.formatMessage({
            id: 'update',
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
                  empty={{}}
                  name="units"
                  min={formik.values.units.length}
                  Component={UnitSplitForm}
                  isControlVisible={false}
                />
              </FormContainerStyle>
            </ModalFormContainerStyle>
          }
        />
      )}
    </Formik>
  );
};

export { UnitSplitEditStagingFormModal };
