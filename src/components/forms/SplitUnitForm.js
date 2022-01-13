import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  Modal,
  Body,
  InputSizeEnum,
  InputStateEnum,
  StandardInput,
  Select,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  InputVariantEnum,
  Message,
} from '..';
import { splitUnits } from '../../store/actions/climateWarehouseActions';
import {
  NotificationMessageTypeEnum,
  setNotificationMessage,
} from '../../store/actions/app';

const InputContainer = styled('div')`
  width: 20rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 2.25rem;
`;

const StyledLabelContainer = styled('div')`
  padding: 0.3rem 0 0.3rem 0;
`;

const StyledContainer = styled('div')`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const StyledSplitEntry = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

const SplitUnitForm = ({ onClose, organizations, record }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    { unitCount: null, unitOwnerOrgUid: record.unitOwnerOrgUid },
    { unitCount: null, unitOwnerOrgUid: record.unitOwnerOrgUid },
  ]);
  const intl = useIntl();
  const [validationErrors, setValidationErrors] = useState([]);
  const appStore = useSelector(state => state.app);

  const organizationsArray = Object.keys(organizations).map(key => ({
    value: key,
    label: organizations[key].name,
  }));
  organizationsArray.unshift({
    value: record.unitOwnerOrgUid,
    label: intl.formatMessage({
      id: 'no-change',
    }),
  });

  const unitIsSplitable = record.unitCount !== 1;
  useEffect(() => {
    if (unitIsSplitable === false) {
      console.log(appStore.notifcation);
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          'unit-cannot-be-split',
        ),
      );
    }
  }, []);

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
      value => value[0].unitCount + value[1].unitCount === record.unitCount,
    );

  const onSubmit = () => {
    validationSchema
      .validate(data, { abortEarly: false, recursive: true })
      .then(() => {
        setValidationErrors([]);
        dispatch(
          splitUnits({
            warehouseUnitId: record.warehouseUnitId,
            records: data,
          }),
        );
        onClose();
      })
      .catch(err => {
        setValidationErrors([...err.errors]);
      });
  };

  useEffect(() => {
    if (validationErrors.length > 0) {
      dispatch(
        setNotificationMessage(
          NotificationMessageTypeEnum.error,
          getValidationErrorId(),
        ),
      );
    }
  }, [validationErrors]);

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

  const getValidationErrorId = () => {
    if (
      validationErrors.findIndex(element => element.includes('0')) !== -1 ||
      validationErrors.findIndex(element => element.includes('1')) !== -1
    ) {
      return 'unit-count-must-be-a-valid-integer';
    }
    if (_.includes(validationErrors, 'units do not add up')) {
      return 'units-dont-add-up';
    }
    return '';
  };

  return (
    <>
      {appStore.notification && (
        <Message
          id={appStore.notification.id}
          type={appStore.notification.type}
        />
      )}
      <Modal
        onOk={onSubmit}
        onClose={onClose}
        basic
        form
        showButtons={unitIsSplitable}
        title={intl.formatMessage({
          id: 'split',
        })}
        body={
          <StyledContainer>
            {data.map((item, index) => (
              <StyledSplitEntry key={index}>
                <StyledFieldContainer>
                  <div>
                    <Body size="Bold">
                      <FormattedMessage id="record" /> {index + 1}
                    </Body>
                  </div>
                  <StyledLabelContainer>
                    <Body color={'#262626'}>
                      <FormattedMessage id="nr-of-units" />
                    </Body>
                  </StyledLabelContainer>
                  <InputContainer>
                    <StandardInput
                      size={InputSizeEnum.large}
                      state={
                        unitIsSplitable
                          ? InputStateEnum.default
                          : InputStateEnum.disabled
                      }
                      variant={getInputFieldState(index)}
                      value={item.unitCount}
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
                    <Body color={'#262626'}>
                      <FormattedMessage id="units-owner" />
                    </Body>
                  </StyledLabelContainer>
                  <InputContainer>
                    <Select
                      size={SelectSizeEnum.large}
                      type={SelectTypeEnum.basic}
                      state={
                        unitIsSplitable
                          ? SelectStateEnum.default
                          : SelectStateEnum.disabled
                      }
                      options={organizationsArray}
                      placeholder="Select"
                      onChange={value =>
                        setData(prevData => {
                          const newData = [...prevData];
                          newData[index].unitOwnerOrgUid = value[0].value;
                          return newData;
                        })
                      }
                    />
                  </InputContainer>
                </StyledFieldContainer>
              </StyledSplitEntry>
            ))}
          </StyledContainer>
        }
      />
    </>
  );
};

export { SplitUnitForm };
