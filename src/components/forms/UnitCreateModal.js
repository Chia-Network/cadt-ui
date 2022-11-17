import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Step, StepLabel } from '@mui/material';
import { Formik, setNestedObjectValues } from 'formik';

import {
  postNewUnits,
  getIssuances,
  getPaginatedData,
  getMyProjects,
} from '../../store/actions/climateWarehouseActions';
import {
  Stepper,
  TabPanel,
  Modal,
  modalTypeEnum,
  UnitIssuanceForm,
  UnitDetailsForm,
  UnitLabelForm,
  FormikRepeater,
} from '..';
import { unitsSchema } from '../../store/validations';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const emptyUnit = {
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

const emptyLabel = {
  label: '',
  labelType: '',
  creditingPeriodStartDate: '',
  creditingPeriodEndDate: '',
  validityPeriodStartDate: '',
  validityPeriodEndDate: '',
  unitQuantity: 0,
  labelLink: '',
};

const UnitCreateModal = ({ onClose, modalSizeAndPosition }) => {
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const stepperStepsTranslationIds = ['unit', 'issuance', 'labels'];
  const { myOrgUid } = useSelector(store => store.climateWarehouse);

  useEffect(() => {
    if (myOrgUid) {
      dispatch(getMyProjects(myOrgUid));
      dispatch(getPaginatedData({ type: 'projects', orgUid: myOrgUid }));
      dispatch(getIssuances());
      localStorage.removeItem('unitSelectedWarehouseProjectId');
    }
  }, []);

  const onChangeStepTo = useCallback(
    async ({ formik, desiredStep = null }) => {
      const errors = await formik.validateForm();

      // manually setting touched for error fields so errors are displayed
      formik.setTouched(setNestedObjectValues(errors, true));

      const isUnitValid = _.isEmpty(errors);

      const isIssuanceSelected =
        desiredStep > 1 ? !_.isEmpty(formik.values?.issuance) : true;

      const isProjectSelected = Boolean(
        localStorage.getItem('unitSelectedWarehouseProjectId'),
      );

      if (isUnitValid && isProjectSelected && isIssuanceSelected) {
        if (
          desiredStep >= stepperStepsTranslationIds.length &&
          !apiResponseIsPending
        ) {
          formik.submitForm();
        } else {
          setTabValue(desiredStep);
        }
      }
    },
    [setTabValue, apiResponseIsPending],
  );

  // if unit was successfully created, close modal
  const unitWasSuccessfullyCreated =
    notification?.id === 'unit-successfully-created';
  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <Formik
      initialValues={emptyUnit}
      validationSchema={unitsSchema}
      onSubmit={values => {
        const dataToSend = _.cloneDeep(values);
        cleanObjectFromEmptyFieldsOrArrays(dataToSend);
        dispatch(postNewUnits(dataToSend));
      }}
    >
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
                <UnitDetailsForm />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <UnitIssuanceForm />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <FormikRepeater
                  empty={emptyLabel}
                  name="labels"
                  tooltip={intl.formatMessage({
                    id: 'labels-units-optional',
                  })}
                  min={0}
                  Component={UnitLabelForm}
                />
              </TabPanel>
            </StyledFormContainer>
          }
        />
      )}
    </Formik>
  );
};

export { UnitCreateModal };
