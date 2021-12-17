import React from 'react';
import styled, { css, withTheme } from 'styled-components';
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
  height: ${props => (props.basic ? '202px' : '188px')};
  width: ${props => (props.basic ? '520px' : '400px')};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
`;

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${props =>
    props.basic &&
    css`
      height: 52px;
      width: 472px;
      align-self: center;
      align-items: center;
    `};
`;

const IconContainer = styled('div')`
  align-self: center;
  height: 132px;
  margin-right: 17.5px;
`;

const MessageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: ${props => (props.basic ? '100%' : '132px')};
  width: ${props => (props.basic ? '100%' : '296px')};
  justify-content: space-evenly;
  align-items: ${props => (props.basic ? 'unset' : 'center')};
`;

const BodyContainer = styled('div')`
  margin-bottom: 24px;
  ${props =>
    props.basic &&
    css`
      display: flex;
      align-items: center;
      height: 44px;
      width: 472px;
      flex-grow: 0.5;
      align-self: center;
      margin-bottom: 0%;
    `};
`;

const TitleContainer = styled('div')`
  align-self: flex-start;
  ${props =>
    props.basic &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 472px;
      height: 24px;
      align-self: center;
      flex-grow: 0.25;
    `};
`;

const OkContainer = styled('div')`
  margin-left: 8px;
`;
const Modal = withTheme(
  ({ title, body, showButtons, onClose, onOk, type, confirmation, basic }) => {
    return (
      <Container basic={basic}>
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
        <MessageContainer basic={basic}>
          <TitleContainer basic={basic}>
            <Body size="Bold">{title}</Body>
            {basic && <CloseIcon height="8.91" width="8.66" />}
          </TitleContainer>
          {basic && <Divider height="1" width="520" />}
          <BodyContainer basic={basic}>
            <Body size="Small">{body}</Body>
          </BodyContainer>

          {basic && <Divider height="1" width="520" />}
          {showButtons && (
            <ButtonContainer basic={basic}>
              {(confirmation || basic) && (
                <PrimaryButton size="large" label="Cancel" onClose={onClose} />
              )}
              <OkContainer>
                <PrimaryButton size="large" label="Ok" onClick={onOk} />
              </OkContainer>
            </ButtonContainer>
          )}
        </MessageContainer>
      </Container>
    );
  },
);

export { Modal };
