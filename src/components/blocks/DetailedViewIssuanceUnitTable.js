import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import styledComponents from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Body } from '..';
import { StyledItem } from '.';
import { MagnifyGlassIcon } from '../icons';
import { getMyOrgUid } from '../../utils/getMyOrgUid';

const StyledCursor = styledComponents('div')`
  cursor: pointer;
`;

const DetailedViewIssuanceUnitTable = ({ issuance }) => {
  const navigate = useNavigate();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const { units } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);

  const unitsBelongingToThisIssuance = useMemo(
    () =>
      units?.reduce((accumulator, currentUnit) => {
        if (currentUnit.issuanceId === issuance.id) {
          return [...accumulator, currentUnit];
        }
        return accumulator;
      }, []),
    [units, issuance],
  );

  console.log(issuance);

  return (
    <StyledItem>
      <Body size="Bold" width="100%">
        <FormattedMessage id="units-belonging-to-issuance" />
      </Body>
      {unitsBelongingToThisIssuance?.length > 0 &&
        unitsBelongingToThisIssuance.map(unitItem => (
          <StyledCursor key={unitItem.warehouseUnitId}>
            <Body
              onClick={() =>
                navigate(
                  `/units?orgUid=${myOrgUid}&myRegistry=true&unitId=${unitItem.warehouseUnitId}`,
                )
              }
              color="#1890ff"
            >
              {unitItem.warehouseUnitId}
              <MagnifyGlassIcon height="15" width="30" />
            </Body>
          </StyledCursor>
        ))}
      {unitsBelongingToThisIssuance?.length === 0 && '---'}
    </StyledItem>
  );
};

export { DetailedViewIssuanceUnitTable };
