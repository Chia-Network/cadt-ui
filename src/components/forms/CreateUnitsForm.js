import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import { TabPanel, Modal, Message, modalTypeEnum } from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { postNewUnits } from '../../store/actions/climateWarehouseActions';
import { useIntl } from 'react-intl';

import {
  unitsSchema,
  labelsSchema,
  issuancesSchema,
} from '../../store/validations';
import { UnitDetailsForm } from '.';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const CreateUnitsForm = withRouter(({ onClose, modalSizeAndPosition }) => {
  const { notification } = useSelector(state => state.app);
  const [newLabels, setNewLabels] = useState([]);
  const [newIssuance, setNewIssuance] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();

  const [newUnits, setNewUnits] = useState({
    projectLocationId: '',
    unitOwner: '',
    countryJurisdictionOfOwner: '',
    inCountryJurisdictionOfOwner: '',
    serialNumberBlock: '',
    serialNumberPattern: '',
    marketplace: '',
    marketplaceLink: '',
    marketplaceIdentifier: '',
    unitTags: '',
    unitStatusReason: '',
    vintageYear: '',
    unitRegistryLink: '',
    unitType: '',
    unitStatus: '',
    correspondingAdjustmentDeclaration: '',
    correspondingAdjustmentStatus: '',
  });

  const stepperStepsTranslationIds = ['unit', 'labels', 'issuances'];

  const switchToNextTabIfDataIsValid = async (data, schema) => {
    const isValid = await schema.isValid(data);
    if (isValid) {
      if (stepperStepsTranslationIds[tabValue] === 'issuances') {
        handleSubmitUnit();
      } else {
        setTabValue(tabValue + 1);
      }
    }
  };

  const onNextButtonPress = async () => {
    switch (stepperStepsTranslationIds[tabValue]) {
      case 'unit':
        switchToNextTabIfDataIsValid(newUnits, unitsSchema);
        break;
      case 'labels':
        switchToNextTabIfDataIsValid(newLabels, labelsSchema);
        break;
      case 'issuances':
        switchToNextTabIfDataIsValid(newIssuance, issuancesSchema);
        break;
    }
  };

  const handleSubmitUnit = async () => {
    const dataToSend = _.cloneDeep(newUnits);

    Object.keys(dataToSend).forEach(el => {
      if (!dataToSend[el]) {
        delete dataToSend[el];
      }
    });

    if (!_.isEmpty(newLabels)) {
      dataToSend.labels = newLabels;
    }

    if (!_.isEmpty(newIssuance)) {
      dataToSend.issuance = _.head(newIssuance);
    }

    const isUnitValid = await unitsSchema.isValid(dataToSend);

    if (isUnitValid) {
      dispatch(postNewUnits(dataToSend));
    }
  };

  const unitWasSuccessfullyCreated =
    notification?.id === 'unit-successfully-created';

  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      {notification && !unitWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        modalSizeAndPosition={modalSizeAndPosition}
        onOk={onNextButtonPress}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'create-unit',
        })}
        label={intl.formatMessage({
          id: tabValue < 2 ? 'next' : 'create',
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
                unitDetails={newUnits}
                setUnitDetails={setNewUnits}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <LabelsRepeater
                labelsState={newLabels}
                newLabelsState={setNewLabels}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <IssuanceRepeater
                max={1}
                issuanceState={
                  Array.isArray(newIssuance) ? newIssuance : [newIssuance]
                }
                newIssuanceState={setNewIssuance}
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateUnitsForm };
