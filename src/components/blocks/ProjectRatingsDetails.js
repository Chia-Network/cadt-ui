import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body, SpanTwoDetailColumnsContainer } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

import { detailsViewData } from '../../utils/functionUtils';

const ProjectRatingsDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-type" />
            </Body>
            {data && detailsViewData('data', data, 'ratingType', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'ratingType',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating" />
            </Body>
            {data && detailsViewData('data', data, 'rating', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'rating',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-range-highest" />
            </Body>
            {data &&
              detailsViewData('data', data, 'ratingRangeHighest', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'ratingRangeHighest',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-range-lowest" />
            </Body>
            {data &&
              detailsViewData('data', data, 'ratingRangeLowest', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'ratingRangeLowest',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="rating-link" />
              </Body>
              {data && detailsViewData('link', data, 'ratingLink', changeColor)}
              {stagingData &&
                detailsViewData(
                  'subformStagingLink',
                  stagingData,
                  'ratingLink',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectRatingsDetails };
