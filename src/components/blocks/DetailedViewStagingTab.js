import React from 'react';
import styled from 'styled-components';

import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { Body } from '..';

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

const DetailedViewTabItem = ({ entry, action }) => {
  const hasEntryKeyData = key =>
    (entry[key].original !== null && entry[key].original !== 'null') ||
    (entry[key].changes &&
      entry[key].changes.some(change => change !== null && change !== 'null'));

  const isKeyAllowedToBeDisplayed = key =>
    ![
      'orgUid',
      'warehouseProjectId',
      'id',
      'createdAt',
      'updatedAt',
      'label_unit',
    ].includes(key);

  const areThereAnyChangesForThisOriginal = key =>
    entry[key].changes &&
    entry[key].changes.length > 0 &&
    entry[key].changes.some(x => x !== null);

  const getOriginalColorForKey = entryProp => {
    if (areThereAnyChangesForThisOriginal(entryProp)) {
      return '#f5222d';
    }
    if (action === 'DELETE') {
      return '#f5222d';
    }
    if (action === 'INSERT') {
      return '#52C41A';
    }
    return '#000000';
  };

  return (
    <StyledDetailedViewTabItem>
      {Object.keys(entry).map(
        (entryProp, index) =>
          isKeyAllowedToBeDisplayed(entryProp) &&
          hasEntryKeyData(entryProp) && (
            <div key={index}>
              <Body size="Bold">
                {convertPascalCaseToSentenceCase(entryProp)}
              </Body>
              {entry[entryProp].original &&
                entry[entryProp].original !== 'null' && (
                  <Body color={getOriginalColorForKey(entryProp)}>
                    {entry[entryProp].original}
                  </Body>
                )}
              {entry[entryProp].changes &&
                entry[entryProp].changes.length > 0 &&
                entry[entryProp].changes.some(x => x !== null) &&
                entry[entryProp].changes.map((changeItem, index) => (
                  <Body key={index} color="#52C41A">
                    {changeItem ? changeItem : '--'}
                  </Body>
                ))}
            </div>
          ),
      )}
    </StyledDetailedViewTabItem>
  );
};

const DetailedViewStagingTab = ({ data, action }) => {
  return (
    <StyledDetailedViewTab>
      {data.map((entry, index) => (
        <DetailedViewTabItem key={index} entry={entry} action={action} />
      ))}
    </StyledDetailedViewTab>
  );
};

export { DetailedViewStagingTab };
