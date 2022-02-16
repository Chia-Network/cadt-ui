import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Modal, TabPanel, Message, modalTypeEnum, UnitDetailsForm } from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';

import {
  unitsSchema,
  labelsSchema,
  issuancesSchema,
} from '../../store/validations';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const EditUnitsForm = ({ onClose, record, modalSizeAndPosition }) => {
  const { notification } = useSelector(state => state.app);
  const [labels, setLabelsRepeaterValues] = useState([]);
  const [issuance, setIssuance] = useState([{}]);
  const [editedUnits, setEditUnits] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();

  const unit = useSelector(
    state =>
      state.climateWarehouse.units.filter(
        unit => unit.warehouseUnitId === record.warehouseUnitId,
      )[0],
  );

  useEffect(() => {
    setEditUnits({
      warehouseUnitId: unit.warehouseUnitId ?? '',
      projectLocationId: unit.projectLocationId ?? '',
      unitOwner: unit.unitOwner ?? '',
      unitStatus: unit.unitStatus ?? '',
      unitType: unit.unitType ?? '',
      vintageYear: unit.vintageYear ?? '',
      unitStatusReason: unit.unitStatusReason ?? '',
      countryJurisdictionOfOwner: unit.countryJurisdictionOfOwner ?? '',
      inCountryJurisdictionOfOwner: unit.inCountryJurisdictionOfOwner ?? '',
      serialNumberBlock: unit.serialNumberBlock ?? '',
      serialNumberPattern: unit.serialNumberPattern ?? '',
      marketplace: unit.marketplace ?? '',
      marketplaceLink: unit.marketplaceLink ?? '',
      marketplaceIdentifier: unit.marketplaceIdentifier ?? '',
      unitTags: unit.unitTags ?? '',
      unitRegistryLink: unit.unitRegistryLink ?? '',
      correspondingAdjustmentDeclaration:
        unit.correspondingAdjustmentDeclaration ?? '',
      correspondingAdjustmentStatus: unit.correspondingAdjustmentStatus ?? '',
    });

    setIssuance([
      _.pick(
        unit.issuance,
        'startDate',
        'endDate',
        'verificationApproach',
        'verificationReportDate',
        'verificationBody',
      ),
    ]);

    setLabelsRepeaterValues(
      unit.labels.map(label =>
        _.pick(
          label,
          'label',
          'labelType',
          'creditingPeriodStartDate',
          'creditingPeriodEndDate',
          'validityPeriodStartDate',
          'validityPeriodEndDate',
          'unitQuantity',
          'labelLink',
        ),
      ),
    );
  }, [unit]);

  const stepperStepsTranslationIds = ['unit', 'labels', 'issuances'];

  const switchToNextTabIfDataIsValid = async (data, schema) => {
    const isValid = await schema.isValid(data);
    if (isValid) {
      if (stepperStepsTranslationIds[tabValue] === 'issuances') {
        handleUpdateUnit();
      } else {
        setTabValue(tabValue + 1);
      }
    }
  };

  const onNextButtonPress = async () => {
    switch (stepperStepsTranslationIds[tabValue]) {
      case 'unit':
        switchToNextTabIfDataIsValid(editedUnits, unitsSchema);
        break;
      case 'labels':
        switchToNextTabIfDataIsValid(labels, labelsSchema);
        break;
      case 'issuances':
        switchToNextTabIfDataIsValid(issuance, issuancesSchema);
        break;
    }
  };

  const handleUpdateUnit = async () => {
    const dataToSend = _.cloneDeep(editedUnits);

    Object.keys(dataToSend).forEach(el => {
      if (!dataToSend[el]) {
        delete dataToSend[el];
      }
    });

    if (!_.isEmpty(issuance)) {
      dataToSend.issuance = _.head(issuance);
    }

    if (!_.isEmpty(labels)) {
      dataToSend.labels = labels;
    }

    const isUnitValid = await unitsSchema.isValid(dataToSend);

    if (isUnitValid) {
      dispatch(updateUnitsRecord(dataToSend));
    }
  };

  const unitWasSuccessfullyEdited =
    notification?.id === 'unit-successfully-edited';
  useEffect(() => {
    if (unitWasSuccessfullyEdited) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      {notification && !unitWasSuccessfullyEdited && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        modalSizeAndPosition={modalSizeAndPosition}
        onOk={onNextButtonPress}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'edit-unit',
        })}
        extraButtonLabel={
          tabValue > 0
            ? intl.formatMessage({
                id: 'back',
              })
            : undefined
        }
        extraButtonOnClick={() =>
          setTabValue(prev => (prev > 0 ? prev - 1 : prev))
        }
        body={
          <StyledFormContainer>
            <Stepper activeStep={tabValue} alternativeLabel>
              {stepperStepsTranslationIds &&
                stepperStepsTranslationIds.map((step, index) => (
                  <Step
                    key={index}
                    onClick={() => setTabValue(index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StepLabel>
                      {intl.formatMessage({
                        id: step,
                      })}
                    </StepLabel>
                  </Step>
                ))}
            </Stepper>
            <TabPanel
              style={{ paddingTop: '1.25rem' }}
              value={tabValue}
              index={0}
            >
              <UnitDetailsForm
                unitDetails={editedUnits}
                setUnitDetails={setEditUnits}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <LabelsRepeater
                labelsState={labels}
                newLabelsState={setLabelsRepeaterValues}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <IssuanceRepeater
                max={1}
                issuanceState={issuance}
                newIssuanceState={setIssuance}
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
};

export { EditUnitsForm };
