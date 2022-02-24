import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { Body } from '../../components';
import { getUnits } from '../../store/actions/climateWarehouseActions';

const StyledDetailedViewTabItem = styled('div')`
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 20px;
`;

const StyledDetailedViewTab = styled('div')`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailedViewTabItem = ({ entry }) => {
  const { units } = useSelector(store => store.climateWarehouse);
  const dispatch = useDispatch();

  const isIssuance =
    entry?.verificationApproach && entry?.verificationBody && entry?.id;

  useEffect(() => {
    if (isIssuance) {
      dispatch(getUnits({ useMockedResponse: false, useApiMock: false }));
    }
  }, []);

  const allUnitsWithThisIssuance = useMemo(
    () =>
      isIssuance && units
        ? units.filter(unit => unit.issuance.id === entry.id)
        : null,
    [units],
  );

  return (
    <StyledDetailedViewTabItem>
      {Object.keys(entry).map(
        (entryProp, index) =>
          ![
            'orgUid',
            'warehouseProjectId',
            'id',
            'createdAt',
            'updatedAt',
            'label_unit',
          ].includes(entryProp) && (
            <div key={index}>
              <Body size="Bold">
                {convertPascalCaseToSentenceCase(entryProp)}
              </Body>
              <Body>
                {entry[entryProp] !== 'null' ? entry[entryProp] : '--'}
              </Body>
            </div>
          ),
      )}
      {isIssuance && (
        <div>
          <Body size="Bold">
            <FormattedMessage id="all-issuance-units" />
          </Body>
          {allUnitsWithThisIssuance &&
            allUnitsWithThisIssuance.map((unit, index) => (
              <Body key={index}>{`${index + 1} : ${
                unit.warehouseUnitId
              }`}</Body>
            ))}
        </div>
      )}
    </StyledDetailedViewTabItem>
  );
};

const DetailedViewTab = ({ data }) => {
  return (
    <StyledDetailedViewTab>
      {data.map((entry, index) => (
        <DetailedViewTabItem key={index} entry={entry} />
      ))}
    </StyledDetailedViewTab>
  );
};

export { DetailedViewTab };
