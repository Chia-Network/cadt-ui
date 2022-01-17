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
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  InputVariantEnum,
  Message,
  LocalMessageTypeEnum,
  LocalMessage,
  SelectOrganizations,
} from '..';
import { splitUnits } from '../../store/actions/climateWarehouseActions';

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

const SplitUnitForm = ({ onClose, record }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    { unitCount: null, unitOwnerOrgUid: record.unitOwnerOrgUid },
    { unitCount: null, unitOwnerOrgUid: record.unitOwnerOrgUid },
  ]);
  const intl = useIntl();
  const [validationErrors, setValidationErrors] = useState([]);
  const { notification } = useSelector(state => state.app);

  const { units } = useSelector(store => store.climateWarehouse);
  const fullRecord = units.filter(
    unit => unit.warehouseUnitId === record.warehouseUnitId,
  )[0];

  const unitIsSplitable = fullRecord.unitCount !== 1;

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
      value => value[0].unitCount + value[1].unitCount === fullRecord.unitCount,
    );

  const onSubmit = () => {
    validationSchema
      .validate(data, { abortEarly: false, recursive: true })
      .then(() => {
        setValidationErrors([]);
        dispatch(
          splitUnits({
            warehouseUnitId: fullRecord.warehouseUnitId,
            records: data,
          }),
        );
      })
      .catch(err => {
        setValidationErrors([...err.errors]);
      });
  };

  const unitWasSuccessfullySplit =
    notification && notification.id === 'unit-successfully-split';
  useEffect(() => {
    if (unitWasSuccessfullySplit) {
      onClose();
    }
  }, [notification]);

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

  const getValidationLocalMessage = () => {
    if (
      validationErrors.findIndex(element => element.includes('0')) !== -1 ||
      validationErrors.findIndex(element => element.includes('1')) !== -1
    ) {
      return intl.formatMessage({
        id: 'unit-count-must-be-a-valid-integer',
      });
    }
    if (_.includes(validationErrors, 'units do not add up')) {
      return `
        ${intl.formatMessage({
          id: 'units-dont-add-up',
        })} ${fullRecord.unitCount}.
        `;
    }
    return '';
  };

  return (
    <>
      {notification && !unitWasSuccessfullySplit && (
        <Message id={notification.id} type={notification.type} />
      )}
      {validationErrors.length > 0 && (
        <LocalMessage
          msg={getValidationLocalMessage()}
          type={LocalMessageTypeEnum.error}
          onClose={() => setValidationErrors([])}
        />
      )}
      {unitIsSplitable === false && (
        <LocalMessage
          msg={intl.formatMessage({
            id: 'unit-cannot-be-split',
          })}
          type={LocalMessageTypeEnum.error}
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
                    <SelectOrganizations
                      size={SelectSizeEnum.large}
                      type={SelectTypeEnum.basic}
                      state={
                        unitIsSplitable
                          ? SelectStateEnum.default
                          : SelectStateEnum.disabled
                      }
                      placeholder="Select"
                      onChange={value =>
                        setData(prevData => {
                          const newData = [...prevData];
                          newData[index].unitOwnerOrgUid =
                            value[0].orgUid !== 'none'
                              ? value[0].orgUid
                              : fullRecord.unitOwnerOrgUid;
                          return newData;
                        })
                      }
                      displayNoChangeOrganization
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
