import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

const ProjectLocationsDetails = ({data}) => {
  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="host-country" />
            </Body>
            <Body>{data.country ? data.country : '---'}</Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="in-country-region" />
            </Body>
            <Body>
              {data.inCountryRegion ? data.inCountryRegion : '---'}
            </Body>
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="geographic-identifier" />
            </Body>
            <Body>
              {data.geographicIdentifier
                ? data.geographicIdentifier
                : '---'}
            </Body>
          </StyledItem>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectLocationsDetails };
