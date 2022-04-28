import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';

import { detailsViewData } from '../../utils/functionUtils';
import { useSelector } from 'react-redux';

const ProjectIssuanceDetails = ({ data, stagingData, changeColor }) => {
  const { units } = useSelector(store => store.climateWarehouse);

  const unitsBelongingToThisIssuance = useMemo(
    () =>
      units?.reduce((accumulator, currentUnit) => {
        if (currentUnit.issuanceId === data.id) {
          return [...accumulator, currentUnit.warehouseUnitId];
        }
        return accumulator;
      }, []),
    [units, data],
  );

  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="start-date" />
            </Body>
            {data && detailsViewData('data', data, 'startDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'startDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="end-date" />
            </Body>
            {data && detailsViewData('data', data, 'endDate', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'endDate',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-body" />
            </Body>
            {data &&
              detailsViewData('data', data, 'verificationBody', changeColor)}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'verificationBody',
                changeColor,
              )}
          </StyledItem>
          <StyledItem>
            <Body size="Bold" width="100%">
              <FormattedMessage id="verification-approach" />
            </Body>
            {data &&
              detailsViewData(
                'data',
                data,
                'verificationApproach',
                changeColor,
              )}
            {stagingData &&
              detailsViewData(
                'subformStagingData',
                stagingData,
                'verificationApproach',
                changeColor,
              )}
          </StyledItem>
          {data && (
            <StyledItem>
              <Body size="Bold" width="100%">
                <FormattedMessage id="units-belonging-to-issuance" />
              </Body>
              {unitsBelongingToThisIssuance?.length > 0 &&
                unitsBelongingToThisIssuance.map(unitId => (
                  <Body key={unitId}>{unitId}</Body>
                ))}
              {unitsBelongingToThisIssuance?.length === 0 && '---'}
            </StyledItem>
          )}
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { ProjectIssuanceDetails };
