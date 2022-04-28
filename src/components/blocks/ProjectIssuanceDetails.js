import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styledComponents from 'styled-components';

import { Body } from '..';
import {
  StyledDetailedViewTab,
  StyledDetailedViewTabItem,
  StyledItem,
} from '.';
import { detailsViewData } from '../../utils/functionUtils';
import { getMyOrgUid } from '../../utils/getMyOrgUid';
import { MagnifyGlassIcon } from '../icons';

const StyledCursor = styledComponents('div')`
  cursor: pointer;
`;

const ProjectIssuanceDetails = ({ data, stagingData, changeColor }) => {
  const { units } = useSelector(store => store.climateWarehouse);
  const navigate = useNavigate();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);

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
                  <StyledCursor key={unitId}>
                    <Body
                      onClick={() =>
                        navigate(
                          `/units?orgUid=${myOrgUid}&myRegistry=true&projectId=${unitId}`,
                        )
                      }
                      color="#1890ff"
                    >
                      {unitId}
                      <MagnifyGlassIcon height="15" width="30" />
                    </Body>
                  </StyledCursor>
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
