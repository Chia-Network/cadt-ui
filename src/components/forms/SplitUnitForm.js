import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
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
  NotificationCard,
  Alert,
  SelectStateEnum,
  InputVariantEnum,
} from '..';
import { splitUnits } from '../../store/actions/climateWarehouseActions';
import { setGlobalErrorMessage } from '../../store/actions/app';

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
  const appStore = useSelector(store => store.app);
  const intl = useIntl();
  const [validationErrors, setValidationErrors] = useState([]);
  const submitButtonPressed = useRef(null);

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

  const unitIsSplitable = record.unitCount !== 1;

  const onSubmit = () => {
    validationSchema
      .validate(data, { abortEarly: false, recursive: true })
      .then(() => {
        submitButtonPressed.current = true;
        setValidationErrors([]);
        dispatch(
          splitUnits({
            warehouseUnitId: record.warehouseUnitId,
            records: data,
          }),
        );
      })
      .catch(err => {
        setValidationErrors([...err.errors]);
      });
  };

  useEffect(() => {
    if (
      !appStore.errorMessage &&
      submitButtonPressed &&
      submitButtonPressed.current
    ) {
      onClose();
    }
  }, [appStore.errorMessage]);

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

  const getValidationFormattedError = () => {
    if (
      validationErrors.findIndex(element => element.includes('0')) !== -1 ||
      validationErrors.findIndex(element => element.includes('1')) !== -1
    ) {
      return intl.formatMessage({
        id: 'unit-count-must-be-a-valid-integer',
      });
    } else if (_.includes(validationErrors, 'units do not add up')) {
      return (
        intl.formatMessage({
          id: 'units-dont-add-up',
        }) +
        ' ' +
        record.unitCount +
        '.'
      );
    }
    return '';
  };

  return (
    <>
      {unitIsSplitable === false && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'unit' })}
            alertBody={intl.formatMessage({
              id: 'unit-cannot-be-split',
            })}
            showIcon
            closeable
          />
        </NotificationCard>
      )}
      {appStore.errorMessage && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'something-went-wrong' })}
            alertBody={intl.formatMessage({
              id: 'unit-could-not-be-split',
            })}
            showIcon
            closeable
            onClose={() => dispatch(setGlobalErrorMessage(null))}
          />
        </NotificationCard>
      )}
      {validationErrors.length > 0 && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'unit' })}
            alertBody={getValidationFormattedError()}
            showIcon
            closeable
            onClose={() => setValidationErrors([])}
          />
        </NotificationCard>
      )}
      <Modal
        onOk={onSubmit}
        onClose={onClose}
        basic
        form
        showButtons
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
