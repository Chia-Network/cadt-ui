import React from 'react';
import styled, { withTheme } from 'styled-components';
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

const AlertCard = withTheme(styled('div')`
  display: flex;
  justify-content: space-between;
  border: none;
  margin: 20px;
  ${props =>
    props.alertBody
      ? 'height: 102px;  width: 384px;'
      : 'height: 40px;  width: 384px;'}

  ${props =>
    (props.type === 'info' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.info.secondary}; border: 1px solid ${props.theme.colors.default.status.info.primary} `) ||
    (props.type === 'success' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.ok.secondary}; border: 1px solid ${props.theme.colors.default.status.ok.primary}`) ||
    (props.type === 'warning' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.warning.secondary}; border: 1px solid ${props.theme.colors.default.status.warning.primary}`) ||
    (props.type === 'error' &&
      !props.banner &&
      `background-color: ${props.theme.colors.default.status.error.secondary}; border: 1px solid ${props.theme.colors.default.status.error.primary} `)}

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
      `background-color: ${props.theme.colors.default.status.error.secondary};`)}
`);

const CloseTextButton = withTheme(styled('button')`
  width: 100px;
  height: 18px;
  background-color: unset;
  border: none;
  color: #8C8C8C;

  ${props =>
    props.alertBody
      ? 'margin-right: 16px; margin-top: 16px;'
      : 'margin-right: 16px; margin-top: 9px;'}
`);

const CloseButton = withTheme(styled('div')`
  ${props =>
    props.alertBody
      ? 'margin-right: 18.68px; margin-top: 16px;'
      : 'margin-right: 18.68px; align-self: center'}
`);

const AlertTitle = withTheme(styled('div')`
font-size: 16px;
  font-family: ${props => props.theme.typography.primary.regular};
  height: ${props => (props.alertBody ? '1.5rem;' : '1.375rem;')}
  line-height: 1.5rem;
  font-weight: 400;
  margin-bottom: 4px;

  ${props => !props.showIcon && !props.alertBody && 'margin-top: 9px;'}
      ${props =>
        props.showIcon &&
        !props.alertBody &&
        'margin-left: 16px;margin-top: 9px;'}

  ${props =>
    props.showIcon && props.alertBody
      ? 'margin-left: 17.5px;margin-top: 16px;'
      : 'margin-left: 16px;'}

      ${props =>
        !props.showIcon &&
        props.alertBody &&
        'margin-left: 16px;margin-top: 16px;'}


`);

const AlertBody = withTheme(styled('div')`
  font-family: ${props => props.theme.typography.primary.light};
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 21px;
  margin-bottom: 16px;
  ${props => (props.showIcon ? 'margin-left: 17.5px;' : 'margin-left: 16px')}
`);

const ShowIcons = withTheme(styled('div')`
  ${props =>
    props.alertBody
      ? 'margin-left: 17.5px; margin-top: 17.5px;'
      : 'margin-left: 17px; margin-top: 12px;'}
`);

const Alert = withTheme(
  ({ type, banner, alertTitle, alertBody, showIcon, closeable, closeText }) => {
    return (
      <>
        <AlertCard type={type} banner={banner} alertBody={alertBody}>
          {showIcon && !alertBody && type === 'info' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <InfoIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'info' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <InfoIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'success' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <SuccessIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'success' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <SuccessIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'error' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <ErrorIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'error' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <ErrorIcon height="21" width="21" />
            </ShowIcons>
          )}

          {showIcon && !alertBody && type === 'warning' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <WarningIconSmall height="14" width="14" />
            </ShowIcons>
          )}
          {showIcon && alertBody && type === 'warning' && (
            <ShowIcons showIcon={showIcon} type={type} alertBody={alertBody}>
              <WarningIcon height="21" width="21" />
            </ShowIcons>
          )}
          <div
            style={{
              width: '100%',
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <AlertTitle showIcon={showIcon} alertBody={alertBody}>
              {alertTitle}
            </AlertTitle>

            {alertBody && (
              <AlertBody showIcon={showIcon}>{alertBody}</AlertBody>
            )}
          </div>
          {closeText && !closeable && (
            <CloseTextButton
              closeText={closeText}
              closeable={closeable}
              alertBody={alertBody}>
              {closeText}
            </CloseTextButton>
          )}
          {closeable && !closeText && (
            <CloseButton
              closeable={closeable}
              closeText={closeText}
              alertBody={alertBody}>
              <CloseIcon height="8.91" width="8.66" />
            </CloseButton>
          )}
        </AlertCard>
      </>
    );
  },
);

export { Alert };
