/* eslint-disable */
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
  PrimaryButton,
  modalTypeEnum,
} from '..';
import { postNewOrg } from '../../store/actions/climateWarehouseActions';

const InputContainer = styled('div')`
  width: 20rem;
`;

const StyledFieldContainer = styled('div')`
  padding-top: 1.5rem;
`;

const StyledLabelContainer = styled('div')`
  padding: 0.3rem 0 0.3rem 0;
`;

const StyledTotalUnitsAvailable = styled('div')`
  padding-bottom: 30px;
`;

const StyledContainer = styled('div')`
  padding: 2rem 5rem 4rem 5rem;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const StyledSplitEntry = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

const StyledAddIconContainer = styled('div')`
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted #d9d9d9;
  cursor: pointer;
`;

const StyledFileInput = styled('input')`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const CreateOrgForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
  });
  const intl = useIntl();
  // const [validationErrors, setValidationErrors] = useState([]);
  const { notification } = useSelector(state => state.app);

  // const validationSchema = yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       unitCount: yup.number().required().positive().integer(),
  //       unitOwnerOrgUid: yup.string().nullable(),
  //     }),
  //   )
  //   .test(
  //     'test array elements sum',
  //     'units do not add up',
  //     value => value[0].unitCount + value[1].unitCount === fullRecord.unitCount,
  //   );

  // const onSubmit = () => {
  //   validationSchema
  //     .validate(data, { abortEarly: false, recursive: true })
  //     .then(() => {
  //       setValidationErrors([]);
  //       dispatch(
  //         splitUnits({
  //           warehouseUnitId: fullRecord.warehouseUnitId,
  //           records: data,
  //         }),
  //       );
  //     })
  //     .catch(err => {
  //       setValidationErrors([...err.errors]);
  //     });
  // };

  const onSubmit = () => {
    dispatch(postNewOrg(formData));
  };

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-created';
  useEffect(() => {
    if (orgWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  // const getInputFieldState = index => {
  //   if (_.includes(validationErrors, 'units do not add up')) {
  //     return InputVariantEnum.error;
  //   }
  //   if (
  //     validationErrors.findIndex(element => element.includes(`${index}`)) !== -1
  //   ) {
  //     return InputVariantEnum.error;
  //   }
  //   return InputVariantEnum.default;
  // };

  // const getValidationLocalMessage = () => {
  //   if (
  //     validationErrors.findIndex(element => element.includes('0')) !== -1 ||
  //     validationErrors.findIndex(element => element.includes('1')) !== -1
  //   ) {
  //     return intl.formatMessage({
  //       id: 'unit-count-must-be-a-valid-integer',
  //     });
  //   }
  //   if (_.includes(validationErrors, 'units do not add up')) {
  //     return `
  //       ${intl.formatMessage({
  //         id: 'units-dont-add-up',
  //       })} ${fullRecord.unitCount}.
  //       `;
  //   }
  //   return '';
  // };

  return (
    <>
      {notification && !orgWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      {/* {validationErrors.length > 0 && (
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
      )} */}
      <Modal
        onOk={onSubmit}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'create-organization',
        })}
        body={
          <StyledContainer>
            <Body size="Big" color={'#262626'}>
              <FormattedMessage id="organization-information" />
            </Body>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  *<FormattedMessage id="organization-name" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  value={formData.name}
                  onChange={value =>
                    setFormData(prevState => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  *<FormattedMessage id="organization-icon" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  value={formData.icon}
                  onChange={value =>
                    setFormData(prevState => ({
                      ...prevState,
                      icon: value,
                    }))
                  }
                />
              </InputContainer>
              {/* <label htmlFor="csv">
                <StyledAddIconContainer>
                  {intl.formatMessage({
                    id: 'click-to-add',
                  })}
                </StyledAddIconContainer>
              </label> */}
              <StyledFileInput type="file" id="csv" accept=".csv" />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body color={'#262626'}>
                  <FormattedMessage id="organization-website" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  onChange={value => console.log(value)}
                />
              </InputContainer>
            </StyledFieldContainer>
          </StyledContainer>
        }
      />
    </>
  );
};

export { CreateOrgForm };
