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
  UploadPngInput,
  TabPanel,
  Tab,
  Tabs,
} from '..';
import {
  importHomeOrg,
  postNewOrg,
} from '../../store/actions/climateWarehouseActions';

const StyledTabsHeader = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const OrgCreateFormModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);
  const [formData, setFormData] = useState({
    name: '',
    png: null,
  });
  const [importedOrgUid, setImportedOrgUid] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const nameIsValid = formData?.name?.length > 0;
  const isOrgUidValid = importedOrgUid?.length > 4;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSubmit = async () => {
    if (tabValue === 1 && isOrgUidValid) {
      dispatch(importHomeOrg(importedOrgUid));
    }
    if (tabValue === 0 && nameIsValid) {
      dispatch(postNewOrg(formData));
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

export { OrgCreateFormModal };
