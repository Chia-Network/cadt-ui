import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';

import {
  postNewUnits,
  getIssuances,
  getPaginatedData,
} from '../../store/actions/climateWarehouseActions';
import UnitIssuanceRepeater from './UnitIssuanceRepeater';
import UnitLabelsRepeater from './UnitLabelsRepeater';
import { TabPanel, Modal, modalTypeEnum } from '..';
import { unitsSchema } from '../../store/validations';
import { UnitDetailsForm } from '.';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';
import { setValidateForm, setForm } from '../../store/actions/app';
import { getMyOrgUid } from '../../utils/getMyOrgUid';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const CreateUnitsForm = withRouter(({ onClose, modalSizeAndPosition }) => {
  const { notification } = useSelector(state => state.app);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();

  const [unit, setUnit] = useState({
    projectLocationId: '',
    unitOwner: '',
    countryJurisdictionOfOwner: '',
    inCountryJurisdictionOfOwner: '',
    serialNumberBlock: '',
    serialNumberPattern: '[.*\\D]+([0-9]+)+[-][.*\\D]+([0-9]+)$',
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
    labels: [],
    issuance: null,
  });
  const stepperStepsTranslationIds = ['unit', 'issuances', 'labels'];
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);

  useEffect(() => {
    if (myOrgUid !== 'none') {
      dispatch(getPaginatedData({ type: 'projects', orgUid: myOrgUid }));
      dispatch(getIssuances());
    }
  }, []);

  const onChangeStep = async (desiredStep = null) => {
    const isUnitValid = await unitsSchema.isValid(unit);
    dispatch(setValidateForm(true));
    if (isUnitValid) {
      dispatch(setValidateForm(false));
      if (desiredStep >= stepperStepsTranslationIds.length) {
        handleSubmitUnit();
      } else {
        dispatch(setValidateForm(false));
        setTabValue(desiredStep);
        dispatch(setForm(stepperStepsTranslationIds[desiredStep]));
      }
    }
  };

  const handleSubmitUnit = async () => {
    const dataToSend = _.cloneDeep(unit);
    cleanObjectFromEmptyFieldsOrArrays(dataToSend);
    dispatch(postNewUnits(dataToSend));
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
      <Modal
        modalSizeAndPosition={modalSizeAndPosition}
        onOk={() => onChangeStep(tabValue + 1)}
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
          onChangeStep(tabValue > 0 ? tabValue - 1 : tabValue)
        }
        body={
          <StyledFormContainer>
            <Stepper activeStep={tabValue} alternativeLabel>
              {stepperStepsTranslationIds &&
                stepperStepsTranslationIds.map((step, index) => (
                  <Step
                    key={index}
                    onClick={() => onChangeStep(index)}
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
              <UnitIssuanceRepeater
                max={1}
                issuanceState={unit.issuance ? [unit.issuance] : []}
                newIssuanceState={value =>
                  setUnit(prev => ({
                    ...prev,
                    issuance: value[0] ? value[0] : null,
                  }))
                }
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <UnitLabelsRepeater
                labelsState={unit?.labels ?? []}
                newLabelsState={value =>
                  setUnit(prev => ({
                    ...prev,
                    labels: value,
                  }))
                }
              />
            </TabPanel>
          </StyledFormContainer>
        }
      />
    </>
  );
});

export { CreateUnitsForm };
