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
  TabPanel,
  Tab,
  Tabs,
} from '..';
import {
  importHomeOrg,
  postNewOrg,
} from '../../store/actions/climateWarehouseActions';

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

const StyledTabsHeader = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const CreateOrgForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);
  const [formData, setFormData] = useState({
    name: '',
    file: null,
  });
  const [importedOrgUid, setImportedOrgUid] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const nameIsValid = formData?.name?.length > 0;
  const fileIsValid = formData?.file != null;
  const isOrgUidValid = importedOrgUid?.length > 4;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSubmit = async () => {
    if (tabValue === 1 && isOrgUidValid) {
      dispatch(importHomeOrg(importedOrgUid));
    }
    if (tabValue === 0 && nameIsValid && fileIsValid) {
      dispatch(postNewOrg(formData));
    }
  };

  const onPngInputChange = e => {
    if (e.target.value && e.target.value !== '') {
      setFormData(prevState => ({
        ...prevState,
        file: e.target.files[0],
      }));
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
            <StyledTabsHeader>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label={intl.formatMessage({ id: 'add-details' })} />
                <Tab label={intl.formatMessage({ id: 'import-by-orgUid' })} />
              </Tabs>
            </StyledTabsHeader>
            <TabPanel value={tabValue} index={0}>
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
                    <label htmlFor="file">
                      {!fileIsValid && <UploadIcon width="20" height="20" />}
                      {fileIsValid && <SuccessIcon width="20" height="20" />}
                    </label>
                    <StyledInput
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={onPngInputChange}
                    />
                  </StyledDiv>
                </InputContainer>
                {!fileIsValid && (
                  <Body size="Small" color="red">
                    {intl.formatMessage({
                      id: 'add-valid-organization-icon',
                    })}
                  </Body>
                )}
              </StyledFieldContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    *<FormattedMessage id="org-uid" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={InputVariantEnum.default}
                    value={importedOrgUid}
                    onChange={value => setImportedOrgUid(value)}
                  />
                </InputContainer>
                {!isOrgUidValid && (
                  <Body size="Small" color="red">
                    {intl.formatMessage({
                      id: 'invalid-uid',
                    })}
                  </Body>
                )}
              </StyledFieldContainer>
            </TabPanel>
          </ModalFormContainerStyle>
        }
      />
    </>
  );
};

export { CreateOrgForm };
