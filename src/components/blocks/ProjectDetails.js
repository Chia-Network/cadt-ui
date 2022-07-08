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

const ProjectDetails = ({ data, stagingData, changeColor }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-name" />
            </Body>
            {data && detailsViewData('data', data, 'projectName', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectName',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-id" />
            </Body>
            {data && detailsViewData('data', data, 'projectId', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectId',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="project-description" />
              </Body>
              {data &&
                detailsViewData('data', data, 'description', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'description',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-developer" />
            </Body>
            {data &&
              detailsViewData('data', data, 'projectDeveloper', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectDeveloper',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="program" />
            </Body>
            {data && detailsViewData('data', data, 'program', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'program',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="project-link" />
              </Body>
              {data &&
                detailsViewData('link', data, 'projectLink', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingLink',
                  stagingData,
                  'projectLink',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="sector" />
            </Body>
            {data && detailsViewData('data', data, 'sector', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'sector',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-type" />
            </Body>
            {data && detailsViewData('data', data, 'projectType', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectType',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-status" />
            </Body>
            {data &&
              detailsViewData('data', data, 'projectStatus', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectStatus',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-status-date" />
            </Body>
            {data &&
              detailsViewData('data', data, 'projectStatusDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectStatusDate',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="covered-by-ndc" />
            </Body>
            {data && detailsViewData('data', data, 'coveredByNDC', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'coveredByNDC',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="ndc-information" />
              </Body>
              {data &&
                detailsViewData('data', data, 'ndcInformation', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'ndcInformation',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="current-registry" />
              </Body>
              {data &&
                detailsViewData('data', data, 'currentRegistry', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'currentRegistry',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="registry-of-origin" />
            </Body>
            {data &&
              detailsViewData('data', data, 'registryOfOrigin', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'registryOfOrigin',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="origin-project-id" />
            </Body>
            {data &&
              detailsViewData('data', data, 'originProjectId', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'originProjectId',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-metric" />
            </Body>
            {data && detailsViewData('data', data, 'unitMetric', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitMetric',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="methodology" />
              </Body>
              {data &&
                detailsViewData('data', data, 'methodology', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'methodology',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validation-body" />
            </Body>
            {data &&
              detailsViewData('data', data, 'validationBody', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'validationBody',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validation-date" />
            </Body>
            {data &&
              detailsViewData('data', data, 'validationDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'validationDate',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-tags" />
            </Body>
            {data && detailsViewData('data', data, 'projectTags', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectTags',
                changeColor,
              )}
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectDetails };
