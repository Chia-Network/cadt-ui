import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Body,
  SpanTwoColumnsContainer,
  SpanTwoDetailColumnsContainer,
} from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { detailsViewData } from '../../utils/functionUtils';

const ProjectLabelsDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="label" />
            </Body>
            {data && detailsViewData('data', data, 'label', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'label',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="label-type" />
            </Body>
            {data && detailsViewData('data', data, 'labelType', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'labelType',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="label-link" />
              </Body>
              {data && detailsViewData('link', data, 'labelLink', changeColor)}
              {stagingData &&
                detailsViewData(
                  'subformStagingLink',
                  stagingData,
                  'labelLink',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validity-period-start-date" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'validityPeriodStartDate',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'validityPeriodStartDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validity-period-end-date" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'validityPeriodEndDate',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'validityPeriodEndDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-start-date" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'creditingPeriodStartDate',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'creditingPeriodStartDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="crediting-period-end-date" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'creditingPeriodEndDate',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'creditingPeriodEndDate',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-quantity" />
            </Body>
            {data && detailsViewData('data', data, 'unitQuantity', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'unitQuantity',
                changeColor,
              )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectLabelsDetails };
