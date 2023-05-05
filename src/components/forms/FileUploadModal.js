import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import {
  Modal,
  Body,
  modalTypeEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
  UploadFileInput,
} from '..';
import { postNewFile } from '../../store/actions/climateWarehouseActions';

const FileUploadModal = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.app);
  const [isValidationOn, setIsValidationOn] = useState(false);
  const [userConfirmation, setUserConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    file: null,
  });

  const isFileValid = formData?.file != null;

  const onSubmit = useCallback(async () => {
    setIsValidationOn(true);
    if (isFileValid) {
      setUserConfirmation(true);
    }
  }, [isFileValid, formData, setIsValidationOn]);

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
                  *<FormattedMessage id="file" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <UploadFileInput
                  onChange={file =>
                    setFormData(prevState => ({
                      ...prevState,
                      file: file,
                      fileName: file.name,
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
      {userConfirmation && (
        <Modal
          title={intl.formatMessage({
            id: 'file-upload-confirmation',
          })}
          body={`${intl.formatMessage({
            id: 'file-upload-confirmation-message',
          })} ${formData.fileName}?`}
          modalType={modalTypeEnum.basic}
          label={intl.formatMessage({
            id: 'upload',
          })}
          onOk={() => {
            dispatch(postNewFile(formData));
            setUserConfirmation(false);
          }}
          onClose={() => setUserConfirmation(false)}
        />
      )}
    </>
  );
};

export { FileUploadModal };
