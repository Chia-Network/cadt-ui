/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

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
  UploadFileInput,
} from '..';
import { isValidFileName } from '../../utils/stringUtils';

const FileUploadModal = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.app);
  const [formData, setFormData] = useState({
    fileName: '',
    file: null,
  });

  const fileNameIsValid = isValidFileName(formData.fileName);
  const fileIsValid = formData?.file != null;

  const onSubmit = async () => {
    if (fileNameIsValid && fileIsValid) {
      // TO DO IMPLEMENT STORE ACTION
      // dispatch(editExistingOrg(formData));
    }
  };

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'file-uploaded';
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
          id: 'file-upload',
        })}
        label={intl.formatMessage({
          id: 'upload',
        })}
        body={
          <ModalFormContainerStyle>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  *<FormattedMessage id="filename" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  value={formData.fileName}
                  onChange={value =>
                    setFormData(prevState => ({
                      ...prevState,
                      fileName: value,
                    }))
                  }
                />
              </InputContainer>
              {!fileNameIsValid && (
                <Body size="Small" color="red">
                  {intl.formatMessage({
                    id: 'add-valid-filename',
                  })}
                </Body>
              )}
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  *<FormattedMessage id="file" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <UploadFileInput
                  onChange={file =>
                    setFormData(prevState => ({
                      ...prevState,
                      file: file,
                    }))
                  }
                  file={formData.file}
                />
              </InputContainer>
              {!fileIsValid && (
                <Body size="Small" color="red">
                  {intl.formatMessage({
                    id: 'add-valid-file',
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

export { FileUploadModal };
