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
    png: null,
  });
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);

  const nameIsValid = formData?.name?.length > 0;

  const pngIsValid = formData?.png != null;

  const onSubmit = async () => {
    if (nameIsValid && pngIsValid) {
      dispatch(postNewOrg(formData));
    }
  };

  const onPngInputChange = e => {
    if (e.target.value && e.target.value !== '') {
      const fileNameIsValid = /\.png$/.test(e.target.value);
      if (fileNameIsValid) {
        const file = e.target.files[0];
        setFormData(prevState => ({
          ...prevState,
          png: file,
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
                  <label htmlFor="png">
                    {!pngIsValid && <UploadIcon width="20" height="20" />}
                    {pngIsValid && <SuccessIcon width="20" height="20" />}
                  </label>
                  <StyledInput
                    type="file"
                    id="png"
                    accept=".png"
                    onChange={onPngInputChange}
                  />
                </StyledDiv>
              </InputContainer>
              {!pngIsValid && (
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
