import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '..';

const ProjectDetails = ({ data }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-name" />
            </Body>
            <Body>{data.projectName ? data.projectName : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body width="100%">
              <FormattedMessage id="project-id" />
            </Body>
            <Body>{data.projectId ? data.projectId : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-developer" />
            </Body>
            <Body>{data.projectDeveloper ? data.projectDeveloper : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="program" />
            </Body>
            <Body>{data.program ? data.program : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="project-link" />
              </Body>
              <Body>{data.projectLink ? data.projectLink : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="sector" />
            </Body>
            <Body>{data.sector ? data.sector : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-type" />
            </Body>
            <Body>{data.projectType ? data.projectType : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-status" />
            </Body>
            <Body>{data.projectStatus ? data.projectStatus : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-status-date" />
            </Body>
            <Body>
              {data.projectStatusDate ? data.projectStatusDate : '---'}
            </Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="covered-by-ndc" />
            </Body>
            <Body>{data.coveredByNDC ? data.coveredByNDC : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="ndc-information" />
              </Body>
              <Body>{data.ndcInformation ? data.ndcInformation : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="current-registry" />
              </Body>
              <Body>{data.currentRegistry ? data.currentRegistry : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="registry-of-origin" />
            </Body>
            <Body>{data.registryOfOrigin ? data.registryOfOrigin : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="origin-project-id" />
            </Body>
            <Body>{data.originProjectId ? data.originProjectId : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-metric" />
            </Body>
            <Body>{data.unitMetric ? data.unitMetric : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="methodology" />
              </Body>
              <Body>{data.methodology ? data.methodology : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validation-body" />
            </Body>
            <Body>{data.validationBody ? data.validationBody : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="validation-date" />
            </Body>
            <Body>{data.validationDate ? data.validationDate : '---'}</Body>
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-tags" />
            </Body>
            <Body>{data.projectTags ? data.projectTags : '---'}</Body>
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectDetails };
