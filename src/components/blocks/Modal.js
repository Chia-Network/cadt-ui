import React from 'react';
import styled, { withTheme } from 'styled-components';
import { useIntl } from 'react-intl';
import {
  SuccessIcon,
  InfoIcon,
  ErrorIcon,
  WarningIcon,
  Body,
  PrimaryButton,
  CloseIcon,
} from '..';

const MaskContainer = styled('div')`
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
  background-color: ${props => props.theme.colors.default.onButton};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);

  ${props => {
    if (props.left && props.top && props.width && props.height) {
      return `
        position: absolute;
        left: ${props.left}px;
        top: ${props.top}px;
        width: ${props.width}px;
        height: ${props.height}px;
      `;
    }
    if (props.modalType === modalTypeEnum.basic) {
      return `
        height: fit-content;
        max-height: 80%;
      `;
    }
    if (
      props.modalType === modalTypeEnum.information ||
      props.modalType === modalTypeEnum.confirmation
    ) {
      return `height: fit-content;`;
    }
  }}
`;

const ButtonsContainer = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  ${props => {
    if (props.modalType === modalTypeEnum.basic) {
      return `border-top: 1px solid #e5e5e5; padding-right: 1rem; height: 3.25rem;`;
    }
    if (
      props.modalType === modalTypeEnum.information ||
      props.modalType === modalTypeEnum.confirmation
    ) {
      return `padding: 0px 2rem 24px 0px;`;
    }
  }};
`;

const ContentContainer = styled('div')`
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${props => {
    if (
      props.modalType === modalTypeEnum.confirmation ||
      props.modalType === modalTypeEnum.information
    ) {
      return `padding: 8px 32px 24px 72px; max-width: 296px;`;
    }
    if (props.modalType === modalTypeEnum.basic) {
      return `padding: 16px 24px 30px 24px;`;
    }
  }};
`;

const TitleContainer = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  ${props => {
    if (props.modalType === modalTypeEnum.basic) {
      return `
          justify-content: space-between;
          align-items: center;
          height: 3.5rem;
          align-self: center;
          border-bottom: 1px solid #e5e5e5;
          padding: 16px 24px;
        `;
    }
    if (
      props.modalType === modalTypeEnum.confirmation ||
      props.modalType === modalTypeEnum.information
    ) {
      return `
          justify-content: flex-start;
          height: 3.5rem;
          padding: 32px 33.5px;
          gap: 17.5px;
        `;
    }
  }};
`;

const modalTypeEnum = {
  basic: 'basic',
  confirmation: 'confirmation',
  information: 'information',
};

const Modal = withTheme(
  ({
    title,
    body,
    hideButtons,
    onClose,
    onOk,
    modalType,
    informationType,
    label,
    modalSizeAndPosition,
    extraButtonLabel,
    extraButtonOnClick,
    addComponent,
  }) => {
    const intl = useIntl();

    return (
      <MaskContainer onClick={onClose}>
        <ModalContainer
          onClick={e => e.stopPropagation()}
          modalType={modalType}
          top={modalSizeAndPosition?.top}
          left={modalSizeAndPosition?.left}
          width={modalSizeAndPosition?.width}
          height={modalSizeAndPosition?.height}>
          <TitleContainer modalType={modalType}>
            {modalType === modalTypeEnum.information && (
              <span>
                {informationType === 'info' && (
                  <InfoIcon height="21" width="21" />
                )}
                {informationType === 'error' && (
                  <ErrorIcon height="21" width="21" />
                )}
                {informationType === 'success' && (
                  <SuccessIcon height="21" width="21" />
                )}
                {informationType === 'warning' && (
                  <WarningIcon height="21" width="21" />
                )}
              </span>
            )}
            {modalType === modalTypeEnum.confirmation && (
              <span>
                <WarningIcon height="21" width="21" />
              </span>
            )}
            <Body size="Bold">{title}</Body>
            {modalType === modalTypeEnum.basic && (
              <div onClick={onClose} style={{ cursor: 'pointer' }}>
                <CloseIcon height="12" width="12" />
              </div>
            )}
          </TitleContainer>

          <ContentContainer modalType={modalType}>
            {modalType === modalTypeEnum.basic && body}
            {(modalType === modalTypeEnum.information ||
              modalType === modalTypeEnum.confirmation) && (
              <Body size="Small">{body}</Body>
            )}
          </ContentContainer>

          {!hideButtons && (
            <ButtonsContainer modalType={modalType}>
              {addComponent}
              {(modalType === modalTypeEnum.confirmation ||
                modalType === modalTypeEnum.basic) && (
                <PrimaryButton
                  size="large"
                  label={intl.formatMessage({ id: 'cancel' })}
                  onClick={onClose}
                  type="default"
                />
              )}
              {extraButtonLabel && extraButtonOnClick && (
                <PrimaryButton
                  size="large"
                  label={extraButtonLabel}
                  onClick={extraButtonOnClick}
                  type="default"
                />
              )}
              <PrimaryButton
                size="large"
                label={label || intl.formatMessage({ id: 'ok' })}
                onClick={onOk}
              />
            </ButtonsContainer>
          )}
        </ModalContainer>
      </MaskContainer>
    );
  },
);

export { Modal, modalTypeEnum };
