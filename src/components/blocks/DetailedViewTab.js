import React from 'react';
import styled from 'styled-components';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { Body } from '../../components';

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
              <Body>{entry[entryProp] !== 'null' && entry[entryProp]}</Body>
            </div>
          ),
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
