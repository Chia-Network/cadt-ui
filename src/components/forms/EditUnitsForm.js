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
  issuanceSchema,
} from '../../store/validations';
import {
  cleanObjectFromEmptyFieldsOrArrays,
  formatAPIData,
} from '../../utils/formatData';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const EditUnitsForm = ({ onClose, record, modalSizeAndPosition }) => {
  const { notification } = useSelector(state => state.app);
  const [unit, setUnit] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const unitToBeEdited = useSelector(
    state =>
      state.climateWarehouse.units.filter(
        unit => unit.warehouseUnitId === record.warehouseUnitId,
      )[0],
  );

  useEffect(() => {
    const formattedProjectData = formatAPIData(unitToBeEdited);
    setUnit(formattedProjectData);
  }, [unitToBeEdited]);

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
        switchToNextTabIfDataIsValid(unit, unitsSchema);
        break;
      case 'labels':
        switchToNextTabIfDataIsValid(unit.labels, labelsSchema);
        break;
      case 'issuances':
        switchToNextTabIfDataIsValid(unit.issuance, issuanceSchema);
        break;
    }
  };

  const handleUpdateUnit = async () => {
    const dataToSend = _.cloneDeep(unit);
    cleanObjectFromEmptyFieldsOrArrays(dataToSend);
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
        label={intl.formatMessage({
          id: tabValue < 2 ? 'next' : 'update-unit',
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
              <UnitDetailsForm unitDetails={unit} setUnitDetails={setUnit} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <LabelsRepeater
                labelsState={unit.labels}
                newLabelsState={value =>
                  setUnit(prev => ({
                    ...prev,
                    labels: value,
                  }))
                }
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <IssuanceRepeater
                max={1}
                issuanceState={unit.issuance !== '' ? [unit.issuance] : []}
                newIssuanceState={value =>
                  setUnit(prev => ({
                    ...prev,
                    issuance: value[0],
                  }))
                }
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
};

export { EditUnitsForm };
