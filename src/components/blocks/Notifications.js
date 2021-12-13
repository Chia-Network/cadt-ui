import React from 'react';
import styled, { withTheme } from 'styled-components';
import { SuccessIcon, InfoIcon, CloseIcon, ErrorIcon, WarningIcon } from '..';

const NotificationCard = withTheme(styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  border: none;
  margin: 1.25rem;
  height: ${props => (props.buttonText ? '144px' : '104px')};
  width: 401px;
`);

const ConfirmButton = withTheme(styled('button')`
  font-family: ${props => props.theme.typography.primary.regular};
  width: 59px;
  height: 29px;
  margin-right: 24px;
  margin-bottom: 16px;
  align-self: flex-end;
  background-color: #1890ff;
  border-radius: 2px;
  border: none;
  color: #ffffff;
  cursor: pointer;
`);

const CloseButton = withTheme(styled('div')`
  margin-top: 18.54px;
  margin-right: 26.68px;
  cursor: pointer;
`);

const NotificationTitle = withTheme(styled('div')`
  font-family: ${props => props.theme.typography.primary.regular};
  font-size: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 16px;
  margin-bottom: 0.25rem;
  ${props => (props.showIcon ? 'margin-left: 1.0938rem;' : 'margin-left: 24px')}
`);

const NotificationBody = withTheme(styled('div')`
  font-family: ${props => props.theme.typography.primary.regular};
  font-family: ${props => props.theme.typography.primary.light};
  font-size: 0.875rem;
  height: 44px;
  width: 312px;
  line-height: 1.3125rem;
  margin-bottom: 1rem;
  ${props => (props.showIcon ? 'margin-left: 1.0938rem;' : 'margin-left: 24px')}
`);

const NotificationMessage = withTheme(styled('div')`
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`);

const ShowIcons = withTheme(styled('div')`
  margin-top: 17.5px;
  margin-left: 25.5px;
  ${props => props.showIcon && 'margin-left: 29.5; margin-top: 17.5px;'};
`);

const Notification = withTheme(
  ({
    showIcon,
    buttonText,
    notificationTitle = 'Notification Title',
    notificationBody = 'Interactively monetize corporate alignments and fully tested niche markets.',
  }) => {
    return (
      <>
        <NotificationCard buttonText={buttonText}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {showIcon === 'info' && (
              <ShowIcons showIcon={showIcon}>
                <InfoIcon height="21" width="21" />
              </ShowIcons>
            )}
            {showIcon === 'success' && (
              <ShowIcons showIcon={showIcon}>
                <SuccessIcon height="21" width="21" />
              </ShowIcons>
            )}
            {showIcon === 'error' && (
              <ShowIcons showIcon={showIcon}>
                <ErrorIcon height="21" width="21" />
              </ShowIcons>
            )}

            {showIcon === 'warning' && (
              <ShowIcons showIcon={showIcon}>
                <WarningIcon height="21" width="21" />
              </ShowIcons>
            )}
            <NotificationMessage>
              <NotificationTitle showIcon={showIcon}>
                {notificationTitle}
              </NotificationTitle>
              <NotificationBody showIcon={showIcon}>
                {notificationBody}
              </NotificationBody>
            </NotificationMessage>

            <CloseButton>
              <CloseIcon height="8.91" width="8.66" />
            </CloseButton>
          </div>
          {buttonText && <ConfirmButton>{buttonText}</ConfirmButton>}
        </NotificationCard>
      </>
    );
  },
);

export { Notification };
