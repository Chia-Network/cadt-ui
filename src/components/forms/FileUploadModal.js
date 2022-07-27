/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [isValidationOn, setIsValidationOn] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    file: null,
  });

  const isFileNameValid = isValidFileName(formData.fileName);
  const isFileValid = formData?.file != null;

  const onSubmit = useCallback(async () => {
    setIsValidationOn(true);
    if (isFileNameValid && isFileValid) {
      // TO DO IMPLEMENT STORE ACTION
      // dispatch(editExistingOrg(formData));
    }
  }, [isFileNameValid, isFileValid]);

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
              {isValidationOn && !isFileNameValid && (
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
              {isValidationOn && !isFileValid && (
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
