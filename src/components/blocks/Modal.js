import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  SuccessIcon,
  InfoIcon,
  ErrorIcon,
  WarningIcon,
  Body,
  PrimaryButton,
  CloseIcon,
  Divider,
} from '..';

const Container = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled('div')`
  height: ${props => (props.basic ? '12.625rem' : '11.75rem')};
  width: ${props => (props.basic ? '32.5rem' : '25rem')};
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0rem 0.5625rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05),
    0rem 0.375rem 1rem rgba(0, 0, 0, 0.08),
    0rem 0.1875rem 0.375rem -0.25rem rgba(0, 0, 0, 0.12);

  ${props =>
    props.form &&
    css`
      height: fit-content;
      width: fit-content;
      @media (max-width:866px){
        width: 100%;
        height: 100%;
      }
    `}
`;

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${props =>
    props.basic &&
    css`
      height: 3.25rem;
      width: 29.5rem;
      align-self: center;
      align-items: center;
    `};

  ${props =>
    props.form &&
    css`
      width: 90%;
      height: 60px;
    `};
`;

const IconContainer = styled('div')`
  align-self: center;
  height: 8.25rem;
  margin-right: 1.0938rem;
`;

const MessageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: ${props => (props.basic ? '100%' : '8.25rem')};
  width: ${props => (props.basic ? '100%' : '18.5rem')};
  align-items: ${props => (props.basic ? 'unset' : 'flex-start')};
`;

const BodyContainer = styled('div')`
  width: 100%;
  height: 50%;
  ${props =>
    props.basic &&
    css`
      display: flex;
      align-items: center;
      flex-grow: 0.5;
      align-self: center;
      margin-bottom: 0%;
    `};

  ${props =>
    props.form &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      height: fit-content;
      width: 868px;
      height: 724px;
      overflow: auto;
      @media (max-width:868px){
        width: 100%;
      }
    `}
`;

const TitleContainer = styled('div')`
  width: 100%;
  height: fit-content;
  ${props =>
    props.basic &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 29.5rem;
      height: 1.5rem;
      align-self: center;
      flex-grow: 0.25;
    `};

  ${props =>
    props.form &&
    css`
      width: 90%;
      height: 60px;
    `};
`;

const OkContainer = styled('div')`
  margin-left: 0.5rem;
`;
const Modal = withTheme(
  ({
    title,
    body,
    showButtons,
    onClose,
    onOk,
    type,
    confirmation,
    basic,
    label,
    form = false,
  }) => {
    const intl = useIntl();

    return (
      <Container>
        <ModalContainer basic={basic} form={form}>
          {type === 'info' && !basic && (
            <IconContainer>
              <InfoIcon height="21" width="21" />
            </IconContainer>
          )}
          {type === 'error' && !basic && (
            <IconContainer>
              <ErrorIcon height="21" width="21" />
            </IconContainer>
          )}
          {type === 'success' && !basic && (
            <IconContainer>
              <SuccessIcon height="21" width="21" />
            </IconContainer>
          )}
          {(type === 'warning' || confirmation) && !basic && (
            <IconContainer>
              <WarningIcon height="21" width="21" />
            </IconContainer>
          )}
          <MessageContainer basic={basic} form={form}>
            <TitleContainer basic={basic} form={form}>
              <Body size="Bold">{title}</Body>
              {basic && (
                <div onClick={onClose} style={{ cursor: 'pointer' }}>
                  <CloseIcon height="8.91" width="8.66" />
                </div>
              )}
            </TitleContainer>
            {basic && <Divider />}
            <BodyContainer basic={basic} form={form}>
              {form && (
                <>
                  <div
                    style={{
                      width: '90%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      fontSize: '12px',
                      color: '#3B8EE0',
                      paddingTop: '20px',
                    }}>
                    *<FormattedMessage id="required-field" />
                  </div>
                </>
              )}
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}>
                <Body size="Small">{body}</Body>
              </div>
            </BodyContainer>

            {basic && <Divider />}
            {showButtons && (
              <ButtonContainer basic={basic} form={form}>
                {(confirmation || basic) && (
                  <PrimaryButton
                    size="large"
                    label={intl.formatMessage({ id: 'cancel' })}
                    onClick={onClose}
                  />
                )}
                <OkContainer>
                  <PrimaryButton
                    size="large"
                    label={label || intl.formatMessage({ id: 'ok' })}
                    onClick={onOk}
                  />
                </OkContainer>
              </ButtonContainer>
            )}
          </MessageContainer>
        </ModalContainer>
      </Container>
    );
  },
);

export { Modal };
