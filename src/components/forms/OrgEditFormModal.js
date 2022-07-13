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
  UploadPngInput,
} from '..';
import { editExistingOrg } from '../../store/actions/climateWarehouseActions';

const OrgEditFormModal = ({ onClose, name, icon }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.app);
  const [formData, setFormData] = useState({
    name,
    png: icon,
  });

  const nameIsValid = formData?.name?.length > 0;
  const pngIsValid = formData?.png != null;

  const onSubmit = async () => {
    if (nameIsValid && pngIsValid) {
      dispatch(editExistingOrg(formData));
    }
  };

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-edited';
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
          id: 'edit-organization',
        })}
        body={
          <ModalFormContainerStyle>
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
                  <FormattedMessage id="organization-icon" />
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <UploadPngInput
                  onChange={file =>
                    setFormData(prevState => ({
                      ...prevState,
                      png: file,
                    }))
                  }
                  icon={formData.png}
                />
              </InputContainer>
            </StyledFieldContainer>
          </ModalFormContainerStyle>
        }
      />
    </>
  );
};

export { OrgEditFormModal };
