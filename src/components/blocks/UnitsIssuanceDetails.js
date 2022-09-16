import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

import { detailsViewData } from '../../utils/functionUtils';

const UnitsIssuanceDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-period-start" />
            </Body>
            {data && detailsViewData('data', data, 'startDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'issuanceStagingData',
                stagingData,
                'startDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-period-end" />
            </Body>
            {data && detailsViewData('data', data, 'endDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'issuanceStagingData',
                stagingData,
                'endDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-body" />
            </Body>
            {data &&
              detailsViewData('data', data, 'verificationBody', changeColor)}
            {stagingData &&
              detailsViewData(
                'issuanceStagingData',
                stagingData,
                'verificationBody',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-approach" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'verificationApproach',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'issuanceStagingData',
                stagingData,
                'verificationApproach',
                changeColor,
              )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsIssuanceDetails };
