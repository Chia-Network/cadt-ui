import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

const UnitsIssuanceDetails = ({ data, changeColor }) => {
  console.log(data)
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="start-date" />
            </Body>
            {!data.startDate?.original ? (
              <Body>{data.startDate ? data.startDate : '---'}</Body>
            ) : (
              <Body color={changeColor('startDate')}>
                {data.startDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="end-date" />
            </Body>
            {!data.endDate?.original ? (
              <Body>{data.endDate ? data.endDate : '---'}</Body>
            ) : (
              <Body color={changeColor('endDate')}>
                {data.endDate?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-body" />
            </Body>
            {!data.verificationBody?.original ? (
              <Body>
                {data.verificationBody ? data.verificationBody : '---'}
              </Body>
            ) : (
              <Body color={changeColor('verificationBody')}>
                {data.verificationBody?.original}
              </Body>
            )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-approach" />
            </Body>
            {!data.verificationApproach?.original ? (
              <Body>
                {data.verificationApproach
                  ? data.verificationApproach
                  : '---'}
              </Body>
            ) : (
              <Body color={changeColor('verificationApproach')}>
                {data.verificationApproach?.original}
              </Body>
            )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsIssuanceDetails };
