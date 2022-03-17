import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

const EstimationsDetails = ({data}) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-start-date" />
            </Body>
            <Body>
              {data.creditingPeriodStart
                ? data.creditingPeriodStart
                : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-end-date" />
            </Body>
            <Body>
              {data.creditingPeriodEnd
                ? data.creditingPeriodEnd
                : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-count" />
            </Body>
            <Body>{data.unitCount >= 0 ? data.unitCount : '---'}</Body>
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { EstimationsDetails };
