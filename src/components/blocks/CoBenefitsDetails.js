import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { detailsViewData } from '../../utils/functionUtils';

const CoBenefitsDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="co-benefit" />
            </Body>
            {data && detailsViewData('data', data, 'cobenefit', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'cobenefit',
                changeColor,
              )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { CoBenefitsDetails };
