import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styledComponents from 'styled-components';

import { Body, SpanTwoDetailColumnsContainer } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { SpanTwoColumnsContainer } from '../layout';
import { detailsViewData } from '../../utils/functionUtils';
import { MagnifyGlassIcon } from '..';
import { getUpdatedUrl } from '../../utils/urlUtils';

const StyledCursor = styledComponents('div')`
  cursor: zoom-in;
`;

const UnitsDetails = ({ data, stagingData, changeColor }) => {
  const { issuances, projects } = useSelector(store => store.climateWarehouse);
  const navigate = useNavigate();
  let location = useLocation();

  const unitBelongsToProjectId =
    data &&
    issuances?.filter(issuanceItem => issuanceItem.id === data.issuanceId)[0]
      ?.warehouseProjectId;

  const unitBelongsToProjectName =
    data &&
    projects?.filter(
      projectItem => projectItem.warehouseProjectId === unitBelongsToProjectId,
    )[0]?.projectName;

  const projectUrl =
    data &&
    `/projects?${getUpdatedUrl(
      location.search,
      {
        param: 'projectId',
        value: unitBelongsToProjectId,
      },
      {
        param: 'unitId',
        value: null,
      },
    )}`;

  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          {data &&
            unitBelongsToProjectId &&
            unitBelongsToProjectName &&
            projectUrl && (
              <StyledItem>
                <Body size="Bold" width="100%">
                  <FormattedMessage id="project-name" />
                </Body>
                <StyledCursor>
                  <Body onClick={() => navigate(projectUrl)} color="#1890ff">
                    {unitBelongsToProjectName
                      ? unitBelongsToProjectName
                      : '---'}
                    <MagnifyGlassIcon height="15" width="30" />
                  </Body>
                </StyledCursor>
              </StyledItem>
            )}
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="project-location-id" />
            </Body>
            {data &&
              detailsViewData('data', data, 'projectLocationId', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'projectLocationId',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-owner" />
            </Body>
            {data && detailsViewData('data', data, 'unitOwner', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitOwner',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-block-start" />
            </Body>
            {data &&
              detailsViewData('data', data, 'unitBlockStart', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitBlockStart',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-block-end" />
            </Body>
            {data && detailsViewData('data', data, 'unitBlockEnd', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitBlockEnd',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-count" />
            </Body>
            {data && detailsViewData('data', data, 'unitCount', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitCount',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="serial-number-block" />
            </Body>
            {data &&
              detailsViewData('data', data, 'serialNumberBlock', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'serialNumberBlock',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="country-jurisdiction-of-owner" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'countryJurisdictionOfOwner',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'countryJurisdictionOfOwner',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="in-country-jurisdiction-of-owner" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'inCountryJurisdictionOfOwner',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'inCountryJurisdictionOfOwner',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-type" />
            </Body>
            {data && detailsViewData('data', data, 'unitType', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitType',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="unit-status" />
            </Body>
            {data && detailsViewData('data', data, 'unitStatus', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'unitStatus',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-status-reason" />
              </Body>
              {data &&
                detailsViewData('data', data, 'unitStatusReason', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'unitStatusReason',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-registry-link" />
              </Body>
              {data &&
                detailsViewData('link', data, 'unitRegistryLink', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingLink',
                  stagingData,
                  'unitRegistryLink',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="vintage-year" />
            </Body>
            {data && detailsViewData('data', data, 'vintageYear', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'vintageYear',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace" />
            </Body>
            {data && detailsViewData('data', data, 'marketplace', changeColor)}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'marketplace',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="marketplace-identifier" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'marketplaceIdentifier',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'marketplaceIdentifier',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="marketplace-link" />
              </Body>
              {data &&
                detailsViewData('link', data, 'marketplaceLink', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingLink',
                  stagingData,
                  'marketplaceLink',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-declaration" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'correspondingAdjustmentDeclaration',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'correspondingAdjustmentDeclaration',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="corresponding-adjustment-status" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'correspondingAdjustmentStatus',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'stagingData',
                stagingData,
                'correspondingAdjustmentStatus',
                changeColor,
              )}
          </StyledItem>
          <SpanTwoColumnsContainer>
            <hr />
          </SpanTwoColumnsContainer>
          <SpanTwoDetailColumnsContainer>
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="unit-tags" />
              </Body>
              {data && detailsViewData('data', data, 'unitTags', changeColor)}
              {stagingData &&
                detailsViewData(
                  'stagingData',
                  stagingData,
                  'unitTags',
                  changeColor,
                )}
            </StyledItem>
          </SpanTwoDetailColumnsContainer>
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitsDetails };
