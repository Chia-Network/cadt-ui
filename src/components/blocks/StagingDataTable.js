/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { MinusIcon } from '..';
import { TableDrawer } from './';

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
  overflow-x: scroll;
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
          <TableCellHeaderText>
            <MinusIcon width={16} height={16} />
          </TableCellHeaderText>
        </Th>
      </Tr>
      <Tr />
    </THead>
  );
};

const ChangeGroupItem = ({ headings, data, appStore, color, onClick }) => {
  return (
    <>
      <Tr color={color} selectedTheme={appStore.theme} onClick={onClick}>
        {headings.map((key, index) => (
          <Td selectedTheme={appStore.theme} key={index}>
            <TableCellText>{data[key] && data[key].toString()}</TableCellText>
          </Td>
        ))}
        <Td selectedTheme={appStore.theme}></Td>
      </Tr>
      <Tr>
        <td></td>
      </Tr>
    </>
  );
};

const StagingDataTable = withTheme(({ headings, data }) => {
  const appStore = useSelector(state => state.app);
  const [getRecord, setRecord] = useState(null);

  return (
    <StagingDataTableContainer>
      {data &&
        headings &&
        data.map((changeGroup, index) => (
          <Table selectedTheme={appStore.theme} key={index}>
            <ChangeGroupHeader headings={headings} appStore={appStore} />
            <tbody>
              {changeGroup.action === 'DELETE' && (
                <ChangeGroupItem
                  data={changeGroup.diff.original}
                  headings={headings}
                  appStore={appStore}
                  color={'red'}
                  onClick={() => setRecord(changeGroup.diff.original)}
                />
              )}
              {changeGroup.action === 'INSERT' && (
                <ChangeGroupItem
                  data={changeGroup.diff.change[0]}
                  headings={headings}
                  appStore={appStore}
                  color={'green'}
                  onClick={() => setRecord(changeGroup.diff.change[0])}
                />
              )}
              {changeGroup.action === 'UPDATE' && (
                <>
                  <ChangeGroupItem
                    data={changeGroup.diff.original}
                    headings={headings}
                    appStore={appStore}
                    color={'red'}
                    onClick={() => setRecord(changeGroup.diff.original)}
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[0]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
                    onClick={() => setRecord(changeGroup.diff.change[0])}
                  />
                </>
              )}
              {changeGroup.action === 'SPLIT' && (
                <>
                  <ChangeGroupItem
                    data={changeGroup.diff.original}
                    headings={headings}
                    appStore={appStore}
                    color={'red'}
                    onClick={() => setRecord(changeGroup.diff.original)}
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[0]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
                    onClick={() => setRecord(changeGroup.diff.change[0])}
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[1]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
                    onClick={() => setRecord(changeGroup.diff.change[1])}
                  />
                </>
              )}
            </tbody>
          </Table>
        ))}
      <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
    </StagingDataTableContainer>
  );
});

export { StagingDataTable };
