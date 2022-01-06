import _ from 'lodash';
import React from 'react';
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
} from '..';
import { FormattedMessage } from 'react-intl';

const AlertCard = styled('div')`
  display: flex;
  justify-content: space-between;
  border: none;
  width: ${props => (props.alertRefresh ? '44.3125rem;' : '24rem;')}
    ${props => (props.alertBody ? 'height: 6.375rem;' : 'height: 2.5rem;')}
    ${props =>
      props.alertRefresh &&
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
    props.alertRefresh &&
    css`
      margin-top: 0.3438rem;
    `}
`;

const AlertTitle = styled('div')`
  font-size: 1rem;
  font-family: ${props => props.theme.typography.primary.regular};
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
  font-family: ${props => props.theme.typography.primary.light};
  font-weight: normal;
  font-size: 0.875rem;
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
    props.alertRefresh &&
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
    props.alertRefresh &&
    css`
      align-self: center;
    `}
`;

const RefreshLinkContainer = styled('a')`
  cursor: pointer;
  width: 7.5rem;
  font-size: 0.9rem;
  text-decoration: underline;
  align-self: flex-end;
  margin-right: 2.5rem;
  margin-bottom: 0.625rem;
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
    onClose = _.noop,
    alertRefresh,
  }) => {
    return (
      <>
        <AlertCard
          alertRefresh={alertRefresh}
          type={type}
          banner={banner}
          alertBody={alertBody}>
          {showIcon && !alertBody && type === 'info' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <InfoIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'info' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <InfoIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'success' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <SuccessIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'success' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <SuccessIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'error' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <ErrorIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'error' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <ErrorIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'warning' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <WarningIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'warning' && (
            <ShowIcons
              alertRefresh={alertRefresh}
              showIcon={showIcon}
              type={type}
              alertBody={alertBody}>
              <WarningIcon height="21" width="21" />
            </ShowIcons>
          )}
          <AlertMessageContainer alertRefresh={alertRefresh}>
            <AlertTitle showIcon={showIcon} alertBody={alertBody}>
              {alertTitle}
            </AlertTitle>

            {alertBody && (
              <AlertBody showIcon={showIcon}>{alertBody}</AlertBody>
            )}
          </AlertMessageContainer>
          {alertRefresh && (
            <RefreshLinkContainer onClick={onRefresh}>
              <FormattedMessage id="refresh-page" />
            </RefreshLinkContainer>
          )}
          {closeText && !closeable && (
            <CloseTextButton
              alertRefresh={alertRefresh}
              closeText={closeText}
              closeable={closeable}
              alertBody={alertBody}
              onClick={onClose}>
              {closeText}
            </CloseTextButton>
          )}
          {closeable && !closeText && (
            <CloseButton
              alertRefresh={alertRefresh}
              closeable={closeable}
              closeText={closeText}
              alertBody={alertBody}
              onClick={onClose}>
              <CloseIcon height="8.91" width="8.66" />
            </CloseButton>
          )}
        </AlertCard>
      </>
    );
  },
);

export { Alert };
