import _ from 'lodash';

import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import ReactPaginate from 'react-paginate';
import { TableCellHeaderText, TableCellText } from '../typography';

import constants from '../../constants';

const Table = styled('table')`
  background-color: white;
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
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
  border-bottom: 1px solid rgba(224, 224, 224, 1);

  letter-spacing: 0.01071em;
  vertical-align: inherit;

  ${props =>
    props.start &&
    `
  border-top-left-radius: 0.25rem;
  `}

  ${props =>
    props.end &&
    `
  border-top-right-radius: 0.25rem;
  `}
`;

const Tr = styled('tr')`
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  background-color: ${props =>
    props.theme.hexToRgba(
      props.theme.colors[props.selectedTheme].secondary,
      0.3,
    )};

  ${props =>
    props.index % 2 !== 0 &&
    `
  background-color: white;
  `}
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

// React ReactPaginate cant be directly modified by styled-components
// so we create a wrapper that can select the sub classes within the component
const StyledPaginateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .pagination {
    padding: 0;
    color: ${props => props.theme.colors[props.selectedTheme].onSurface};
    list-style-type: none;
    display: flex;
  }
  .break-me {
    cursor: default;
  }
  .active {
    border-color: transparent;
    background-color: ${props =>
      props.selectedTheme === constants.THEME.DARK
        ? props.theme.colors[props.selectedTheme].onSurfacePrimaryVarient
        : props.theme.colors[props.selectedTheme].onSurfaceSecondaryVarient};

    color: ${props => props.theme.colors[props.selectedTheme].onSurface};
    border-radius: 0.25rem;
  }
  li {
    cursor: pointer;
    width: 1.5625rem;
    height: 1.5625rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DataTable = withTheme(({ headings, data, actions }) => {
  const [currentPage, setPage] = useState(0);
  const appStore = useSelector(state => state.app);

  const handlePageClick = event => {
    setPage(event.selected);
  };

  const paginatedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return _.chunk(data, constants.MAX_TABLE_SIZE);
  }, [data]);

  if (!data) {
    return null;
  }

  if (currentPage > paginatedData.length) {
    setPage(0);
    return null;
  }

  if (!paginatedData[currentPage]) {
    return null;
  }

  return (
    <>
      <StyledPaginateContainer selectedTheme={appStore.theme}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          forcePage={currentPage}
          pageRangeDisplayed={5}
          pageCount={(paginatedData && paginatedData.length) || 0}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          breakClassName="break-me"
        />
      </StyledPaginateContainer>
      <Table selectedTheme={appStore.theme}>
        <THead selectedTheme={appStore.theme}>
          <tr>
            {headings.map((heading, index) => (
              <Th
                start={index === 0}
                end={!actions && index === headings.length - 1}
                selectedTheme={appStore.theme}
                key={index}>
                <TableCellHeaderText>{heading}</TableCellHeaderText>
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
            <Tr index={index} selectedTheme={appStore.theme} key={index}>
              {Object.keys(record).map((key, index) => (
                <Td selectedTheme={appStore.theme} key={index}>
                  <TableCellText>{record[key].toString()}</TableCellText>
                </Td>
              ))}
              {actions && <Td electedTheme={appStore.theme}>{actions}</Td>}
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export { DataTable };
