/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';

const Table = styled('table')`
  box-sizing: border-box;
  background-color: white;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 50px 0px;
  overflow-x: scroll;
  width: calc(100% - 1px); ;
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
`;

const Tr = styled('tr')`
  ${props => {
    if (props.color === 'green') {
      return `
            border: 1px solid #52C41A;
            background: #ECF8E6;
            color: #52C41A !important;`;
    } else if (props.color === 'red') {
      return `
          background: #FFEBEE;  
          border: 1px solid #F5222D;
          color: #F5222D !important;`;
    }
  }};
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 100px;
`;

const StyledPaginationContainer = styled('div')`
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -1rem;
  min-height: 60px;
  padding-bottom: 10px;
`;

const ChangeGroupHeader = ({ headings, appStore }) => {
  return (
    <THead selectedTheme={appStore.theme}>
      <tr>
        {headings &&
          headings.map((heading, index) => (
            <Th selectedTheme={appStore.theme} key={index}>
              <TableCellHeaderText>
                {convertPascalCaseToSentenceCase(heading)}
              </TableCellHeaderText>
            </Th>
          ))}
      </tr>
    </THead>
  );
};

const ChangeGroupItem = ({ headings, data, appStore, color }) => {
  return (
    <>
      <Tr
        onClick={() => setRecord(record)}
        color={color}
        selectedTheme={appStore.theme}>
        {headings.map((key, index) => (
          <Td selectedTheme={appStore.theme} key={index}>
            <TableCellText>{data[key] && data[key].toString()}</TableCellText>
          </Td>
        ))}
      </Tr>
      <Tr>
        <td></td>
      </Tr>
    </>
  );
};

const StagingDataTable = withTheme(({ headings, data }) => {
  const appStore = useSelector(state => state.app);

  console.log('data: ', data);

  return (
    <div>
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
                />
              )}
              {changeGroup.action === 'INSERT' && (
                <ChangeGroupItem
                  data={changeGroup.diff.change[0]}
                  headings={headings}
                  appStore={appStore}
                  color={'green'}
                />
              )}
              {changeGroup.action === 'UPDATE' && (
                <>
                  <ChangeGroupItem
                    data={changeGroup.diff.original}
                    headings={headings}
                    appStore={appStore}
                    color={'red'}
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[0]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
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
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[0]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
                  />
                  <ChangeGroupItem
                    data={changeGroup.diff.change[1]}
                    headings={headings}
                    appStore={appStore}
                    color={'green'}
                  />
                </>
              )}
            </tbody>
          </Table>
        ))}
    </div>
  );
});

export { StagingDataTable };

/*         "action": "UPDATE",
    <div style={{ height: 'calc(100% - 116px)' }}>
      <div style={{ overflowX: 'scroll', overflowY: 'hidden', height: '100%' }}>
        <Table selectedTheme={appStore.theme}>
          <THead selectedTheme={appStore.theme}>
            <tr>
              {headings.map((heading, index) => (
                <Th
                  start={index === 0}
                  end={!actions && index === headings.length - 1}
                  selectedTheme={appStore.theme}
                  key={index}>
                  <TableCellHeaderText>
                    {convertPascalCaseToSentenceCase(heading)}
                  </TableCellHeaderText>
                </Th>
              ))}
              {actions && (
                <Th
                  start={false}
                  end={true}
                  selectedTheme={appStore.theme}
                  key={'action'}>
                  <TableCellHeaderText>Action</TableCellHeaderText>
                </Th>
              )}
            </tr>
          </THead>
          <tbody>
            {paginatedData[currentPage].map((record, index) => (
              <Tr
                onClick={() => setRecord(record)}
                index={index}
                selectedTheme={appStore.theme}
                key={index}>
                {Object.keys(record).map((key, index) => (
                  <Td selectedTheme={appStore.theme} key={index}>
                    <TableCellText>
                      {record[key] && record[key].toString()}
                    </TableCellText>
                  </Td>
                ))}
                {actions && <Td electedTheme={appStore.theme}>{actions}</Td>}
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <StyledPaginationContainer>
        <Pagination
          pages={(paginatedData && paginatedData.length) || 0}
          current={currentPage}
          callback={handlePageClick}
          showLast
        />
      </StyledPaginationContainer>
      <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
    </div>
*/
