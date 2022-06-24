import React, { useRef } from 'react';
import styled, { css, withTheme } from 'styled-components';
import {
  SuccessIcon,
  SuccessIconSmall,
  InfoIcon,
  InfoIconSmall,
  CloseIcon,
  ErrorIcon,
  ErrorIconSmall,
  WarningIcon,
  WarningIconSmall,
  Body,
} from '..';
import { FormattedMessage } from 'react-intl';

const AlertCard = styled('div')`
  display: flex;
  justify-content: space-between;
  border: none;
  width: ${props => (props.bannerMode ? '44.3125rem;' : '24rem;')};
  ${props => (props.alertBody ? 'height: 6.375rem;' : 'height: 2.5rem;')}
  ${props =>
    props.bannerMode &&
    css`
      height: 3.875rem;
      align-self: center;
    `}
    ${props =>
    (props.type === 'info' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.info.secondary}; border: 0.0625rem solid ${props.theme.colors.default.status.info.primary} `) ||
    (props.type === 'success' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.ok.secondary}; border: 0.0625rem solid ${props.theme.colors.default.status.ok.primary}`) ||
    (props.type === 'warning' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.warning.secondary}; border: 0.0625rem solid ${props.theme.colors.default.status.warning.primary}`) ||
    (props.type === 'error' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.error.secondary}; border: 0.0625rem solid ${props.theme.colors.default.status.error.primary};`)}
    ${props =>
    (props.type === 'info' &&
      props.banner &&
      `background-color: ${props.theme.colors.default.status.info.secondary};`) ||
    (props.type === 'success' &&
      props.banner &&
      `background-color: ${props.theme.colors.default.status.ok.secondary};`) ||
    (props.type === 'warning' &&
      props.banner &&
      `background-color: ${props.theme.colors.default.status.warning.secondary};`) ||
    (props.type === 'error' &&
      props.banner &&
      `background-color: ${props.theme.colors.default.status.error.secondary};`)};
`;

const CloseTextButton = styled('button')`
  width: 6.25rem;
  height: 1.125rem;
  background-color: unset;
  border: none;
  color: #8c8c8c;
  cursor: pointer;
  ${props =>
    props.alertBody
      ? 'margin-right: 1rem; margin-top: 1rem;'
      : 'margin-right: 1rem; margin-top: 0.5625rem;'}
`;

const CloseButton = styled('div')`
  cursor: pointer;
  height: fit-content;
  ${props =>
    props.alertBody
      ? 'margin-right: 1.1675rem; margin-top: 1rem;'
      : 'margin-right: 1.1675rem; align-self: center'}
  ${props =>
    props.bannerMode &&
    css`
      margin-top: 0.3438rem;
    `}
`;

const AlertTitle = styled('div')`
  height: ${props => (props.alertBody ? '1.5rem;' : '1.375rem;')};
  line-height: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.25rem;

  ${props => !props.showIcon && !props.alertBody && 'margin-top: 0.5625rem;'};
  ${props =>
    props.showIcon &&
    !props.alertBody &&
    'margin-left: 1rem;margin-top: 0.5625rem;'};

  ${props =>
    props.showIcon && props.alertBody
      ? 'margin-left: 1.0938rem;margin-top: 1rem;'
      : 'margin-left: 1rem;'};

  ${props =>
    !props.showIcon &&
    props.alertBody &&
    'margin-left: 1rem;margin-top: 1rem;'};
`;

const AlertBody = styled('div')`
  font-weight: normal;
  line-height: 1.3125rem;
  margin-bottom: 1rem;
  ${props => (props.showIcon ? 'margin-left: 1.0938rem;' : 'margin-left: 1rem')}
`;

const ShowIcons = styled('div')`
  ${props =>
    props.alertBody
      ? 'margin-left: 1.0938rem; margin-top: 1.0938rem;'
      : 'margin-left: 1.0625rem; margin-top: 0.75rem;'}
  ${props =>
    props.bannerMode &&
    css`
      margin-top: 0.4688rem;
    `}
`;

const AlertMessageContainer = styled('div')`
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${props =>
    props.bannerMode &&
    css`
      align-self: center;
    `}
`;

const RefreshLinkContainer = styled('a')`
  cursor: pointer;
  width: 9rem;
  font-size: 0.9rem;
  text-decoration: underline;
  align-self: flex-end;
  margin-right: 2.5rem;
  margin-bottom: 0.525rem;
  color: ${props => props.theme.colors.default.status.warning.primary};
`;

const Alert = withTheme(
  ({
    type,
    onRefresh,
    banner = false,
    alertTitle,
    alertBody,
    showIcon = false,
    closeable = false,
    closeText,
    onClose,
    bannerMode,
  }) => {
    const cardRef = useRef(null);

    const onCloseHandler = () => {
      if (onClose) {
        onClose();
      } else if (cardRef && cardRef.current) {
        cardRef.current.remove();
      }
    }

    return (
      <AlertCard
        ref={cardRef}
        bannerMode={bannerMode}
        type={type}
        banner={banner}
        alertBody={alertBody}>
        {showIcon && !alertBody && type === 'info' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <InfoIconSmall height="14" width="14" />
          </ShowIcons>
        )}
        {showIcon && alertBody && type === 'info' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <InfoIcon height="21" width="21" />
          </ShowIcons>
        )}

        {showIcon && !alertBody && type === 'success' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <SuccessIconSmall height="14" width="14" />
          </ShowIcons>
        )}
        {showIcon && alertBody && type === 'success' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <SuccessIcon height="21" width="21" />
          </ShowIcons>
        )}

        {showIcon && !alertBody && type === 'error' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <ErrorIconSmall height="14" width="14" />
          </ShowIcons>
        )}
        {showIcon && alertBody && type === 'error' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <ErrorIcon height="21" width="21" />
          </ShowIcons>
        )}

        {showIcon && !alertBody && type === 'warning' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <WarningIconSmall height="14" width="14" />
          </ShowIcons>
        )}
        {showIcon && alertBody && type === 'warning' && (
          <ShowIcons
            bannerMode={bannerMode}
            showIcon={showIcon}
            type={type}
            alertBody={alertBody}>
            <WarningIcon height="21" width="21" />
          </ShowIcons>
        )}
        <AlertMessageContainer bannerMode={bannerMode}>
          <AlertTitle showIcon={showIcon} alertBody={alertBody}>
            <Body size="Small">{alertTitle}</Body>
          </AlertTitle>

          {alertBody && (
            <Body size="Small">
              <AlertBody showIcon={showIcon}>{alertBody}</AlertBody>
            </Body>
          )}
        </AlertMessageContainer>
        {bannerMode && (
          <RefreshLinkContainer onClick={onRefresh}>
            <Body color="blue" size="Small">
              <FormattedMessage id="click-to-refresh" />
            </Body>
          </RefreshLinkContainer>
        )}
        {closeText && !closeable && (
          <CloseTextButton
            bannerMode={bannerMode}
            closeText={closeText}
            closeable={closeable}
            alertBody={alertBody}
            onClick={onCloseHandler}>
            {closeText}
          </CloseTextButton>
        )}
        {closeable && !closeText && (
          <CloseButton
            bannerMode={bannerMode}
            closeable={closeable}
            closeText={closeText}
            alertBody={alertBody}
            onClick={onCloseHandler}>
            <CloseIcon height="8.91" width="8.66" />
          </CloseButton>
        )}
      </AlertCard>
    );
  },
);

export { Alert };
