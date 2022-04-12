import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '../layout';

import { detailsViewData } from '../../utils/functionUtils';

const RelatedProjectsDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="related-project-id" />
              </Body>
              {data &&
                detailsViewData('data', data, 'relatedProjectId', changeColor)}
              {stagingData &&
                detailsViewData(
                  'subformStagingData',
                  stagingData,
                  'relatedProjectId',
                  changeColor,
                )}
            </StyledItem>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="relationship-type" />
              </Body>
              {data &&
                detailsViewData('data', data, 'relationshipType', changeColor)}
              {stagingData &&
                detailsViewData(
                  'subformStagingData',
                  stagingData,
                  'relationshipType',
                  changeColor,
                )}
            </StyledItem>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="registry" />
              </Body>
              {data && detailsViewData('data', data, 'registry', changeColor)}
              {stagingData &&
                detailsViewData(
                  'subformStagingData',
                  stagingData,
                  'registry',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { RelatedProjectsDetails };
