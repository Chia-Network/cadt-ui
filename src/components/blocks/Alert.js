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
  position: relative;
  ${props => !props.alertBody && 'display: flex;justify-content: center;'}
  width: 24rem;
  margin: 5px;
  ${props => props.alertBody && `height: 6.375rem;`}
  ${props => !props.alertBody && `height: 2.5rem;`}
  ${props =>
    props.type === 'info' &&
    `background-color: ${props.theme.colors.default.status.info.secondary};`}
  ${props =>
    props.banner === false &&
    props.type === 'info' &&
    `border:0.0625rem solid ${props.theme.colors.default.status.info.primary};`}
            
    ${props =>
    props.type === 'error' &&
    `background-color: ${props.theme.colors.default.status.error.secondary};`}
    ${props =>
    props.banner === false &&
    props.type === 'error' &&
    `border:0.0625rem solid ${props.theme.colors.default.status.error.primary};`}

    ${props =>
    props.type === 'warning' &&
    `background-color: ${props.theme.colors.default.status.warning.secondary};`}
    ${props =>
    props.banner === false &&
    props.type === 'warning' &&
    `border:0.0625rem solid ${props.theme.colors.default.status.warning.primary};`}

    ${props =>
    props.type === 'success' &&
    `background-color: ${props.theme.colors.default.status.ok.secondary};`}
    ${props =>
    props.banner === false &&
    props.type === 'success' &&
    `border:0.0625rem solid ${props.theme.colors.default.status.ok.primary};`}
`);

const CloseTextButton = withTheme(styled('button')`
  position: absolute;
  background-color: unset;
  border: none;
  color: grey;
  ${props =>
    !props.alertBody
      ? `top: 0.5625rem; right: 1rem; bottom: 0.8125rem`
      : `top: 1rem; right: 1rem; bottom: 4.25rem`}
`);

const CloseButton = withTheme(styled('div')`
  position: absolute;
  height: 0.8125rem;
  ${props =>
    !props.alertBody
      ? `bottom: 0.9712rem; right: 1.1675rem;`
      : `bottom: 4.6588rem; right: 1.1675rem;`}
`);

const AlertTitle = withTheme(styled('div')`
  position: absolute;
  font-family: ${props => props.theme.typography.primary.regular};
  height: ${props => (props.alertBody ? '1.5rem;' : '1.375rem;')}
  line-height: 1.5rem;
  font-weight: 400;

  ${props =>
    props.showIcon &&
    !props.alertBody &&
    `top: 0.5625rem; left:2.625rem; right: 1rem; bottom: 0.5625rem; width: 20.375rem; font-size: 0.875rem;`}

    ${props =>
      !props.showIcon &&
      !props.alertBody &&
      `top: 0.5625rem; left:1rem; right: 2.25rem; bottom: 0.625rem; font-size: 0.875rem;`}

      ${props =>
        !props.showIcon &&
        props.alertBody &&
        `top: 1rem; left:1rem; right: 2.125rem; bottom: 3.875rem; width: 19.5rem;font-size: 1rem;`}
      

${props =>
  props.showIcon &&
  props.alertBody &&
  `top: 1rem; left:3.5rem; right: 4.8125rem; bottom: 3.875rem; width: 19.5rem;font-size: 1rem;`}
`);

const AlertBody = withTheme(styled('div')`
  position: absolute;
  top: 2.75rem;
  right: 1rem;
  bottom: 1rem;
  font-family: ${props => props.theme.typography.primary.light};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  height: 2.625rem;
  ${props =>
    props.showIcon === true
      ? `top: 2.75rem; left:3.5rem; right: 1rem; bottom: 1rem; width: 19.5rem;`
      : `top: 2.75rem; left:1rem; right: 1rem; bottom: 1rem; width: 19.5rem;`}
`);

const ShowIcons = withTheme(styled('div')`
  position: absolute;
  ${props => !props.alertBody && 'left: 1.0625rem;bottom: 0.75rem'}
  ${props =>
    props.alertBody && 'left: 1.0625rem;bottom: 0.75rem;top: 0.875rem;'}
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

          <AlertTitle showIcon={showIcon} alertBody={alertBody}>
            {alertTitle}
          </AlertTitle>
          {closeable && !closeText && (
            <CloseButton
              closeable={closeable}
              closeText={closeText}
              alertBody={alertBody}>
              <CloseIcon height="8.91" width="8.66" />
            </CloseButton>
          )}
          {closeText && !closeable && (
            <CloseTextButton
              closeText={closeText}
              closeable={closeable}
              alertBody={alertBody}>
              {closeText}
            </CloseTextButton>
          )}
          {alertBody && <AlertBody showIcon={showIcon}>{alertBody}</AlertBody>}
        </AlertCard>
      </>
    );
  },
);

export { Alert };
