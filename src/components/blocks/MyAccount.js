import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { validateUrl } from '../../utils/urlUtils';

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
  Link,
} from '../../components';

import {
  signIn,
  signInFromLocalStorage,
  signOut,
  refreshApp,
} from '../../store/actions/app';

const StyledMyAccountContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MyAccount = ({ openModal = false, onClose, isHeader = true }) => {
  const [apiKey, setApiKey] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(openModal);
  const appStore = useSelector(state => state.app);
  const isUserLoggedIn = appStore.serverAddress !== null;
  const intl = useIntl();
  const dispatch = useDispatch();

  const signUserIn = () => {
    if (serverAddress && validateUrl(serverAddress)) {
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

  useEffect(() => {
    // Function to handle the message event
    const handleMessage = event => {
      if (event.origin !== window.location.origin) {
        return;
      }
      console.log('Received message:', event.data);
      if (
        event?.data?.serverAddress &&
        validateUrl(event?.data?.serverAddress)
      ) {
        dispatch(
          signIn({
            apiKey: event?.data?.apiKey,
            serverAddress: event?.data?.serverAddress,
          }),
        );
        setServerAddress(null);
        setApiKey(null);
        setIsLogInModalOpen(false);
      }
    };

    // Add the event listener
    window.addEventListener('message', handleMessage, false);

    // Return a function that will be called when the component unmounts
    return () => {
      // Remove the event listener
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return (
    <StyledMyAccountContainer>
      {isHeader && (
        <>
          {isUserLoggedIn && (
            <div
              onClick={() => {
                dispatch(signOut());
                dispatch(refreshApp(true));
              }}
            >
              <Link>
                <FormattedMessage id="sign-out" />
              </Link>
            </div>
          )}
          {!isUserLoggedIn && (
            <div onClick={() => setIsLogInModalOpen(true)}>
              <Link>
                <FormattedMessage id="sign-in" />
              </Link>
            </div>
          )}
        </>
      )}

      {isLogInModalOpen && (
        <Modal
          onOk={signUserIn}
          onClose={() => (onClose ? onClose() : setIsLogInModalOpen(false))}
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
                    *<FormattedMessage id="server-address" />{' '}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={InputVariantEnum.default}
                    value={serverAddress}
                    onChange={value => setServerAddress(value)}
                    placeholderText="http://0.0.0.0:31310"
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
                    <FormattedMessage id="api-key" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={InputVariantEnum.default}
                    value={apiKey}
                    onChange={value => setApiKey(value)}
                    placeholderText="xxxxxxx-xxxxxx-xxxxxx"
                  />
                </InputContainer>
              </StyledFieldContainer>
            </ModalFormContainerStyle>
          }
        />
      )}
    </StyledMyAccountContainer>
  );
};

export { MyAccount };
