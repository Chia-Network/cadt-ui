import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { MinusIcon } from '..';
import { TableDrawer } from './';
import { useWindowSize } from '../../utils/useWindowSize';

const Table = styled('table')`
  background-color: white;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0px 0px 50px 0px;
  width: 100%;
`;

const THead = styled('thead')`
  font-weight: 500;
  background-color: ${props =>
    props.theme.colors[props.selectedTheme].secondary};
`;

const Th = styled('th')`
  padding: 1rem;
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  display: table-cell;
  text-align: left;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 80px;
  min-width: 80px;
`;

const Tr = styled('tr')`
  ${props => {
    if (props.color === 'green') {
      return `
            border: 1px solid #52C41A;
            background: #ECF8E6;
            p, span {
              color: #52C41A !important;
            };
            `;
    } else if (props.color === 'red') {
      return `
          background: #FFEBEE;  
          border: 1px solid #F5222D;
          p, span {
            color: #F5222D !important;
          };
          `;
    } else if (props.color === 'gray') {
      return `border: 1px solid #F2F2F2;`;
    }
  }};
  th:last-child {
    text-align: center;
    max-width: 50px;
    min-width: 50px;
  }
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 80px;
  min-width: 80px;
`;

const StagingDataTableContainer = styled('div')`
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
            <TableCellText>{data[key] && data[key].toString()}</TableCellText>
          </Td>
        ))}
        <Td selectedTheme={appStore.theme}>
          {onDeleteStaging && (
            <div
              style={{
                textAlign: 'right',
                paddingRight: '10px',
              }}>
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
              This change request has been currupted, click here to remove.
            </span>
          </TableCellText>
        </Td>
        <Td selectedTheme={appStore.theme}>
          {onDeleteStaging && (
            <div
              style={{
                textAlign: 'right',
                paddingRight: '10px',
              }}>
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

const StagingDataTable = withTheme(({ headings, data, deleteStagingData }) => {
  const appStore = useSelector(state => state.app);
  const [getRecord, setRecord] = useState(null);
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setHeight(windowSize.height - ref.current.getBoundingClientRect().top - 20);
  }, [ref.current, windowSize.height]);

  const changeGroupIsValid = changeGroup => {
    if (!changeGroup.diff) return false;
    if (!changeGroup.diff.original || !changeGroup.diff.change) return false;
    if (changeGroup.diff.change.length === 1 && !changeGroup.diff.change[0])
      return false;
    if (
      changeGroup.diff.change.length === 2 &&
      (!changeGroup.diff.change[0] || !changeGroup.change[1])
    )
      return false;
    return true;
  };

  const onDeleteStaging = uuid => {
    if (!deleteStagingData) return null;
    return () => deleteStagingData(uuid);
  };

  return (
    <StagingDataTableContainer ref={ref}>
      <div style={{ height: `${height}px`, overflow: 'auto' }}>
        {data &&
          headings &&
          data.map((changeGroup, index) => (
            <Table selectedTheme={appStore.theme} key={index}>
              <ChangeGroupHeader headings={headings} appStore={appStore} />
              <tbody>
                {!changeGroupIsValid(changeGroup) && (
                  <InvalidChangeGroup
                    headings={headings}
                    appStore={appStore}
                    onDeleteStaging={onDeleteStaging(changeGroup.uuid)}
                  />
                )}
                {changeGroup.action === 'DELETE' &&
                  changeGroupIsValid(changeGroup) && (
                    <ChangeGroupItem
                      data={changeGroup.diff.original}
                      headings={headings}
                      appStore={appStore}
                      color={'red'}
                      onClick={() => setRecord(changeGroup.diff.original)}
                      onDeleteStaging={onDeleteStaging(changeGroup.uuid)}
                    />
                  )}
                {changeGroup.action === 'INSERT' &&
                  changeGroupIsValid(changeGroup) && (
                    <ChangeGroupItem
                      data={changeGroup.diff.change[0]}
                      headings={headings}
                      appStore={appStore}
                      color={'green'}
                      onClick={() => setRecord(changeGroup.diff.change[0])}
                      onDeleteStaging={onDeleteStaging(changeGroup.uuid)}
                    />
                  )}
                {changeGroup.action === 'UPDATE' &&
                  changeGroupIsValid(changeGroup) && (
                    <>
                      <ChangeGroupItem
                        data={changeGroup.diff.original}
                        headings={headings}
                        appStore={appStore}
                        color={'red'}
                        onClick={() => setRecord(changeGroup.diff.original)}
                        onDeleteStaging={onDeleteStaging(changeGroup.uuid)}
                      />
                      {changeGroup.diff.change.map((change, index) => (
                        <ChangeGroupItem
                          data={change}
                          headings={headings}
                          appStore={appStore}
                          color={'green'}
                          key={index}
                          onClick={() => setRecord(change)}
                        />
                      ))}
                    </>
                  )}
              </tbody>
            </Table>
          ))}
        <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
      </div>
    </StagingDataTableContainer>
  );
});

export { StagingDataTable };
