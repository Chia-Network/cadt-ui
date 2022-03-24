import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body, SpanTwoDetailColumnsContainer, LinkIcon } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { handleClickLink } from '../../utils/functionUtils';

const ProjectRatingsDetails = ({ data }) => {
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
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="rating-link" />
              </Body>
              <Body>
                <a
                  href={handleClickLink(data.ratingLink)}
                  style={{wordWrap: 'break-word'}}
                  target="_blank"
                  rel="noreferrer noopener">
                  {data.ratingLink ? data.ratingLink : '---'}
                  {data.ratingLink && <LinkIcon height="15" width="30" />}
                </a>
              </Body>
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectRatingsDetails };
