import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Formik, setNestedObjectValues } from 'formik';

import {
  postNewUnits,
  getIssuances,
  getPaginatedData,
  getMyProjects,
} from '../../store/actions/climateWarehouseActions';
import { TabPanel, Modal, modalTypeEnum } from '..';
import { unitsSchema } from '../../store/validations';
import { UnitDetailsFormik } from '.';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';
import { UnitIssuanceForm } from './UnitIssuanceForm';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const initialState = {
  projectLocationId: '',
  unitOwner: '',
  countryJurisdictionOfOwner: '',
  inCountryJurisdictionOfOwner: '',
  unitCount: 0,
  unitBlockEnd: '',
  unitBlockStart: '',
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
};

const UnitCreateModalFormik = ({ onClose, modalSizeAndPosition }) => {
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const stepperStepsTranslationIds = ['unit', 'issuances', 'labels'];
  const { myOrgUid } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    if (myOrgUid) {
      dispatch(getMyProjects(myOrgUid));
      dispatch(getPaginatedData({ type: 'projects', orgUid: myOrgUid }));
      dispatch(getIssuances());
      localStorage.removeItem('unitSelectedWarehouseProjectId');
    }
  }, []);

  const onChangeStepTo = async ({ formik, desiredStep = null }) => {
    const errors = await formik.validateForm();
    const isUnitValid = Object.keys(errors).length === 0;
    if (!isUnitValid) {
      // manually setting touched for error fields so errors are displayed
      formik.setTouched(setNestedObjectValues(errors, true));
    }

    const isIssuanceSelected =
      desiredStep > 1 ? Object.keys(formik.values.issuance)?.length > 0 : true;

    const isProjectSelected = Boolean(
      localStorage.getItem('unitSelectedWarehouseProjectId'),
    );

    if (isUnitValid && isProjectSelected && isIssuanceSelected) {
      if (
        desiredStep >= stepperStepsTranslationIds.length &&
        !apiResponseIsPending
      ) {
        handleSubmitUnit(formik.values);
      } else {
        setTabValue(desiredStep);
      }
    }
  };

  const handleSubmitUnit = async values => {
    const dataToSend = _.cloneDeep(values);
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
    <Formik initialValues={initialState} validationSchema={unitsSchema}>
      {formik => (
        <Modal
          modalSizeAndPosition={modalSizeAndPosition}
          onOk={() =>
            onChangeStepTo({
              formik,
              desiredStep: tabValue + 1,
            })
          }
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
            onChangeStepTo({
              formik,
              desiredStep: tabValue > 0 ? tabValue - 1 : tabValue,
            })
          }
          body={
            <StyledFormContainer>
              <Stepper activeStep={tabValue} alternativeLabel>
                {stepperStepsTranslationIds &&
                  stepperStepsTranslationIds.map((step, index) => (
                    <Step
                      key={index}
                      onClick={() =>
                        onChangeStepTo({
                          formik,
                          desiredStep: index,
                        })
                      }
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
                <UnitDetailsFormik />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <UnitIssuanceForm />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                {/* <UnitLabelsRepeater
                  useToolTip={intl.formatMessage({
                    id: 'labels-units-optional',
                  })}
                  labelsState={unit?.labels ?? []}
                  newLabelsState={value =>
                    setUnit(prev => ({
                      ...prev,
                      labels: value,
                    }))
                  }
                /> */}
              </TabPanel>
            </StyledFormContainer>
          }
        />
      )}
    </Formik>
  );
};

export { UnitCreateModalFormik };
