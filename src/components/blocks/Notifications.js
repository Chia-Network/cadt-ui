import React from 'react';
import { withTheme } from 'styled-components';
import {
  SuccessIcon,
  InfoIcon,
  CloseIcon,
  ErrorIcon,
  WarningIcon,
  Body,
  ButtonText,
} from '..';

const Notification = withTheme(
  ({
    showIcon,
    buttonText,
    notificationTitle = 'Notification Title',
    notificationBody = 'Interactively monetize corporate alignments and fully tested niche markets.',
  }) => {
    return (
      <>
        <div
          style={{
            margin: '50px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            height: `${buttonText ? `144px` : `104px`}`,
            width: '401px',
          }}
          buttonText={buttonText}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}>
            {showIcon && (
              <div
                style={{
                  alignSelf: 'baseline',
                  marginTop: '17.5px',
                  marginLeft: '25.5px',
                }}>
                {showIcon === 'info' && <InfoIcon height="21" width="21" />}
                {showIcon === 'success' && (
                  <SuccessIcon height="21" width="21" />
                )}
                {showIcon === 'error' && <ErrorIcon height="21" width="21" />}

                {showIcon === 'warning' && (
                  <WarningIcon height="21" width="21" />
                )}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '17.5px',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Body showIcon={showIcon}>{notificationTitle}</Body>
                <div>
                  <CloseIcon height="8.91" width="8.66" />
                </div>
              </div>

              <div
                style={{
                  width: `${showIcon ? `312px` : `353px`}`,
                  height: '44px',
                }}>
                <Body size="Small" showIcon={showIcon}>
                  {notificationBody}
                </Body>
              </div>
            </div>
          </div>

          {buttonText && (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-end',
                marginRight: '24px',
                marginBottom: '17px',
                borderRadius: '2px',
                justifyContent: 'center',
                height: '24px',
                width: '59px',
                backgroundColor: '#1890FF',
              }}>
              <ButtonText color="#ffffff">{buttonText}</ButtonText>
            </div>
          )}
        </div>
      </>
    );
  },
);

export { Notification };
