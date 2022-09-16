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
import { takerImportOffer } from '../../store/actions/climateWarehouseActions';

const OfferUploadModal = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.app);
  const [isValidationOn, setIsValidationOn] = useState(false);
  const [file, setFile] = useState(null);

  const isFileValid = file != null;

  const onSubmit = useCallback(async () => {
    setIsValidationOn(true);
    if (isFileValid) {
      dispatch(takerImportOffer(file));
    }
  }, [isFileValid, file, setIsValidationOn]);

  const transferOfferWasSuccessfullyImported =
    notification && notification.id === 'transfer-offer-import-successful';
  useEffect(() => {
    if (transferOfferWasSuccessfullyImported) {
      onClose();
    }
  }, [notification]);

  return (
    <Modal
      onOk={onSubmit}
      onClose={onClose}
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'import-offer',
      })}
      label={intl.formatMessage({
        id: 'import',
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
              <UploadFileInput onChange={file => setFile(file)} file={file} />
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
  );
};

export { OfferUploadModal };
