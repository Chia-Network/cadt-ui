import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Body,
  InputSizeEnum,
  StandardInput,
  InputVariantEnum,
  Message,
  modalTypeEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
} from '..';
import { postNewOrg } from '../../store/actions/climateWarehouseActions';
import { organizationSchema } from '../../store/validations/organization.validation';
import { setValidationErrors } from '../../utils/validationUtils';

const CreateOrgForm = ({ onClose }) => {
  const [errorIssuanceMessage, setErrorIssuanceMessage] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
  });
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);

  const onSubmit = async () => {
    const orgIsValid = await organizationSchema.isValid(formData);
    if (orgIsValid) {
      dispatch(postNewOrg(formData));
    }
  };

  useEffect(() => {
    setValidationErrors(organizationSchema, formData, setErrorIssuanceMessage);
  }, [formData]);

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-created';
  useEffect(() => {
    if (orgWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      {notification && !orgWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        onOk={onSubmit}
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'create-organization',
        })}
        body={
          <ModalFormContainerStyle>
            <Body size="Big" color={'#262626'}>
              <FormattedMessage id="organization-information" />
            </Body>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
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
              {errorIssuanceMessage?.name && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.name}
                </Body>
              )}
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
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
              {errorIssuanceMessage?.icon && (
                <Body size="Small" color="red">
                  {errorIssuanceMessage.icon}
                </Body>
              )}
            </StyledFieldContainer>
            {/* Organization website field is not implemented on the back-end yet, after implementation please validate and connect the following field to the form */}
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
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
          </ModalFormContainerStyle>
        }
      />
    </>
  );
};

export { CreateOrgForm };
