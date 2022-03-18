import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '..';

const ProjectRatingsDetails = ({data}) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-type" />
            </Body>
            <Body>{data.ratingType ? data.ratingType : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating" />
            </Body>
            <Body>{data.rating ? data.rating : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-range-highest" />
            </Body>
            <Body>
              {data.ratingRangeHighest ? data.ratingRangeHighest : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="rating-range-lowest" />
            </Body>
            <Body>
              {data.ratingRangeLowest ? data.ratingRangeLowest : '---'}
            </Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="rating-range-highest" />
              </Body>
              <Body>
                {data.ratingReportLink ? data.ratingReportLink : '---'}
              </Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectRatingsDetails };
