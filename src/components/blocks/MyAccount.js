import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledMyAccountContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

import {
  Modal,
  modalTypeEnum,
  Body,
  InputSizeEnum,
  StandardInput,
  InputVariantEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
} from '../../components';
import {
  signIn,
  signInFromLocalStorage,
  signOut,
} from '../../store/actions/app';
import { validateUrl } from '../../utils/urlUtils';

const MyAccount = () => {
  const [apiKey, setApiKey] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const appStore = useSelector(state => state.app);
  const isUserLoggedIn =
    appStore.apiKey !== null && appStore.serverAddress !== null;
  const intl = useIntl();
  const dispatch = useDispatch();

  const signUserIn = () => {
    if (serverAddress && apiKey && validateUrl(serverAddress)) {
      dispatch(signIn({ apiKey, serverAddress }));
      setServerAddress(null);
      setApiKey(null);
      setIsLogInModalOpen(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn === false) {
      dispatch(signInFromLocalStorage());
    }
  }, []);

  return (
    <StyledMyAccountContainer>
      {isUserLoggedIn && (
        <div onClick={() => dispatch(signOut())}>
          <Body color="#1890ff">
            <FormattedMessage id="sign-out" />
          </Body>
        </div>
      )}
      {!isUserLoggedIn && (
        <div onClick={() => setIsLogInModalOpen(true)}>
          <Body color="#1890ff">
            <FormattedMessage id="sign-in" />
          </Body>
        </div>
      )}
      {isLogInModalOpen && (
        <Modal
          onOk={signUserIn}
          onClose={() => setIsLogInModalOpen(false)}
          modalType={modalTypeEnum.basic}
          title={intl.formatMessage({
            id: 'log-in-to-remote-node',
          })}
          label={intl.formatMessage({
            id: 'sign-in',
          })}
          body={
            <ModalFormContainerStyle>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    *<FormattedMessage id="server-address" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={InputVariantEnum.default}
                    value={serverAddress}
                    onChange={value => setServerAddress(value)}
                  />
                </InputContainer>
                {(serverAddress === null ||
                  validateUrl(serverAddress) === false) && (
                  <Body size="Small" color="red">
                    {intl.formatMessage({
                      id: 'add-valid-server-address',
                    })}
                  </Body>
                )}
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    *<FormattedMessage id="api-key" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={InputVariantEnum.default}
                    value={apiKey}
                    onChange={value => setApiKey(value)}
                  />
                </InputContainer>
                {apiKey === null && (
                  <Body size="Small" color="red">
                    {intl.formatMessage({
                      id: 'add-valid-api-key',
                    })}
                  </Body>
                )}
              </StyledFieldContainer>
            </ModalFormContainerStyle>
          }
        />
      )}
    </StyledMyAccountContainer>
  );
};

export { MyAccount };
