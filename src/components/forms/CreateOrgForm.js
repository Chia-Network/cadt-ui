import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Modal,
  Body,
  InputSizeEnum,
  StandardInput,
  InputVariantEnum,
  modalTypeEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
  UploadIcon,
  SuccessIcon,
} from '..';
import { postNewOrg } from '../../store/actions/climateWarehouseActions';

const StyledInput = styled('input')`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const StyledDiv = styled('div')`
  border: 1px dotted #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  & label {
    cursor: pointer;
  }
`;

const CreateOrgForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    svg: null,
  });
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);

  const nameIsValid = formData?.name?.length > 0;

  const svgIsValid = formData?.svg != null;

  const onSubmit = async () => {
    if (nameIsValid && svgIsValid) {
      dispatch(postNewOrg(formData));
    }
  };

  const onSvgInputChange = e => {
    if (e.target.value && e.target.value !== '') {
      const fileNameIsValid = /\.svg$/.test(e.target.value);
      if (fileNameIsValid) {
        const file = e.target.files[0];
        setFormData(prevState => ({
          ...prevState,
          svg: file,
        }));
      }
    }
  };

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-created';
  useEffect(() => {
    if (orgWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <>
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
              {!nameIsValid && (
                <Body size="Small" color="red">
                  {intl.formatMessage({
                    id: 'add-valid-organization-name',
                  })}
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
                <StyledDiv>
                  <label htmlFor="svg">
                    {!svgIsValid && <UploadIcon width="20" height="20" />}
                    {svgIsValid && <SuccessIcon width="20" height="20" />}
                  </label>
                  <StyledInput
                    type="file"
                    id="svg"
                    accept=".svg"
                    onChange={onSvgInputChange}
                  />
                </StyledDiv>
              </InputContainer>
              {!svgIsValid && (
                <Body size="Small" color="red">
                  {intl.formatMessage({
                    id: 'add-valid-organization-icon',
                  })}
                </Body>
              )}
            </StyledFieldContainer>
          </ModalFormContainerStyle>
        }
      />
    </>
  );
};

export { CreateOrgForm };
