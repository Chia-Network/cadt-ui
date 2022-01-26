/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { Modal, MinusIcon, Body } from '..';
import { TableDrawer } from '.';
import { useWindowSize } from '../hooks/useWindowSize';

const StyledChangeGroup = styled('div')`
  background: #f0f2f5;
  margin: 20px 20px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  padding: 40px 1%;
`;

const StyledChangeCard = styled('div')`
  background-color: white;
  width: 33%;
  min-width: 300px;
  max-width: 500px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 8px 10px -5px rgb(0 0 0 / 20%),
    0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);
`;

const StyledChangeCardTitle = styled('div')`
  ${props =>
    props.displayInRed
      ? ` background-color: #ffebee;
      border: 2px solid #f5222d;
      body {
        color: #f5222d;
      }`
      : ` background-color: #ECF8E6;
      border: 2px solid #52C41A;
      body {
        color: #52C41A;
      }`}
  padding: 15px 5px 8px 17px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StyledChangeCardBody = styled('div')`
  padding: 8px 17px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 2px solid #e5e5e5;
  border-top: none;
`;

const StyledCardBodyItem = styled('div')`
  padding: 4px;
`;

const StyledDeleteGroupIcon = styled('div')`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const StagingDataGroupsContainer = styled('div')`
  height: 100%;
`;

const ChangeGroupHeader = ({ headings, appStore }) => {
  return (
    <THead selectedTheme={appStore.theme}>
      <Tr color="gray">
        {headings &&
          headings.map((heading, index) => (
            <Th selectedTheme={appStore.theme} key={index}>
              <TableCellHeaderText>
                {convertPascalCaseToSentenceCase(heading)}
              </TableCellHeaderText>
            </Th>
          ))}
        <Th selectedTheme={appStore.theme}>
          <TableCellHeaderText></TableCellHeaderText>
        </Th>
      </Tr>
      <Tr />
    </THead>
  );
};

const ChangeGroupItem = ({
  headings,
  data,
  appStore,
  color,
  onClick,
  onDeleteStaging,
}) => {
  return (
    <>
      <Tr color={color} selectedTheme={appStore.theme}>
        {headings.map((key, index) => (
          <Td selectedTheme={appStore.theme} key={index} onClick={onClick}>
            <TableCellText>
              {data[key] ? data[key].toString() : '--'}
            </TableCellText>
          </Td>
        ))}
        <Td selectedTheme={appStore.theme}>
          {onDeleteStaging && (
            <div
              style={{
                textAlign: 'right',
                paddingRight: '10px',
              }}
            >
              <span onClick={onDeleteStaging} style={{ cursor: 'pointer' }}>
                <MinusIcon width={16} height={16} />
              </span>
            </div>
          )}
        </Td>
      </Tr>
      <Tr>
        <td></td>
      </Tr>
    </>
  );
};

const InvalidChangeGroup = ({ onDeleteStaging, appStore, headings }) => {
  return (
    <>
      <Tr color="red" selectedTheme={appStore.theme}>
        <Td colSpan={headings.length}>
          <TableCellText>
            <span onClick={onDeleteStaging} style={{ cursor: 'pointer' }}>
              This change request has been corrupted, click here to remove.
            </span>
          </TableCellText>
        </Td>
        <Td selectedTheme={appStore.theme}>
          {onDeleteStaging && (
            <div
              style={{
                textAlign: 'right',
                paddingRight: '10px',
              }}
            >
              <span onClick={onDeleteStaging} style={{ cursor: 'pointer' }}>
                <MinusIcon width={16} height={16} />
              </span>
            </div>
          )}
        </Td>
      </Tr>
    </>
  );
};

const ChangeCard = ({ headings, data, appStore, displayInRed, onClick }) => {
  return (
    <StyledChangeCard onClick={onClick}>
      <StyledChangeCardTitle displayInRed={displayInRed}>
        <Body size="Bold">Project Details</Body>
      </StyledChangeCardTitle>
      <StyledChangeCardBody>
        {headings &&
          headings.map((heading, index) => (
            <StyledCardBodyItem key={index}>
              <Body size="Small Bold">
                {convertPascalCaseToSentenceCase(heading)}
              </Body>
              <Body>{data[heading] ? data[heading] : '--'}</Body>
            </StyledCardBodyItem>
          ))}
      </StyledChangeCardBody>
    </StyledChangeCard>
  );
};

const StagingDataGroups = withTheme(({ headings, data, deleteStagingData }) => {
  const appStore = useSelector(state => state.app);
  const [getRecord, setRecord] = useState(null);
  const [deleteFromStaging, setDeleteFromStaging] = useState(false);
  const [deleteUUID, setDeleteUUID] = useState();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const windowSize = useWindowSize();

  const changeGroupIsValid = changeGroup => {
    if (!changeGroup.diff) {
      return false;
    }

    if (!changeGroup.diff.original || !changeGroup.diff.change) {
      return false;
    }

    if (changeGroup.diff.change.length === 1 && !changeGroup.diff.change[0]) {
      return false;
    }

    if (
      changeGroup.diff.change.length === 2 &&
      (!changeGroup.diff.change[0] || !changeGroup.diff.change[1])
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    setHeight(windowSize.height - ref.current.getBoundingClientRect().top - 20);
  }, [ref.current, windowSize.height, data]);

  const onDeleteStaging = uuid => {
    if (!deleteStagingData) return null;
    return () => {
      deleteStagingData(uuid);
      setDeleteFromStaging(false);
    };
  };

  console.log(data);

  return (
    <StagingDataGroupsContainer ref={ref}>
      <div style={{ height: `${height}px`, overflow: 'auto' }}>
        {data &&
          headings &&
          data.map((changeGroup, index) => (
            <>
              {changeGroupIsValid(changeGroup) && (
                <StyledChangeGroup key={index}>
                  <StyledDeleteGroupIcon>
                    <div
                      onClick={() => {
                        setDeleteUUID(changeGroup.uuid);
                        setDeleteFromStaging(true);
                      }}
                    >
                      <MinusIcon width={20} height={20} />
                    </div>
                  </StyledDeleteGroupIcon>
                  {changeGroup.action === 'DELETE' && (
                    <ChangeCard
                      data={changeGroup.diff.original}
                      headings={headings}
                      onClick={() => setRecord(changeGroup.diff.original)}
                      displayInRed
                    />
                  )}
                  {changeGroup.action === 'INSERT' && (
                    <ChangeCard
                      data={changeGroup.diff.change[0]}
                      headings={headings}
                      onClick={() => setRecord(changeGroup.diff.change[0])}
                    />
                  )}
                  {changeGroup.action === 'UPDATE' && (
                    <ChangeCard
                      data={changeGroup.diff.original}
                      headings={headings}
                      onClick={() => setRecord(changeGroup.diff.original)}
                      displayInRed
                    />
                  )}
                  {changeGroup.action === 'UPDATE' &&
                    changeGroup.diff.change.map((change, index) => (
                      <ChangeCard
                        data={change}
                        headings={headings}
                        onClick={() => setRecord(change)}
                      />
                    ))}
                </StyledChangeGroup>
              )}
            </>
          ))}
        <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
        {deleteFromStaging && (
          <Modal
            title="Notification"
            body="Are you sure you want to delete"
            showButtons
            confirmation
            onClose={() => setDeleteFromStaging(false)}
            onOk={onDeleteStaging(deleteUUID)}
          />
        )}
      </div>
    </StagingDataGroupsContainer>
  );
});

export { StagingDataGroups };
