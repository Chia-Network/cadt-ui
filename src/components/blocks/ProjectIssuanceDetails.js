import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { detailsViewData } from '../../utils/functionUtils';
import { DetailedViewIssuanceUnitTable } from './DetailedViewIssuanceUnitTable';

const ProjectIssuanceDetails = ({ data, stagingData, changeColor }) => {
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
                'subformStagingData',
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
                'subformStagingData',
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
                'subformStagingData',
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
                'subformStagingData',
                stagingData,
                'verificationApproach',
                changeColor,
              )}
          </StyledItem>
          {data && <DetailedViewIssuanceUnitTable issuance={data} />}
          {stagingData && (
            <DetailedViewIssuanceUnitTable issuance={stagingData} />
          )}
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectIssuanceDetails };
