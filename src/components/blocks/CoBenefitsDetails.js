import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

const CoBenefitsDetails = ({data}) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="co-benefit" />
            </Body>
            <Body>{data.cobenefit ? data.cobenefit : '---'}</Body>
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { CoBenefitsDetails };
