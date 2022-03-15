import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '../layout';


const RelatedProjectsDetails = ({ data }) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <SpanTwoColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="related-project-id" />
              </Body>
              <Body>
                {data.relatedProjectId ? data.relatedProjectId : '---'}
              </Body>
            </StyledItem>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="relationship-type" />
              </Body>
              <Body>
                {data.relationshipType ? data.relationshipType : '---'}
              </Body>
            </StyledItem>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="registry" />
              </Body>
              <Body>{data.registry ? data.registry : '---'}</Body>
            </StyledItem>
          </SpanTwoColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { RelatedProjectsDetails };
