import _ from 'lodash';
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import constants from '../../constants';
import { Pagination, TableDrawer } from './';
import { BasicMenu } from '..';
import { useWindowSize } from '../hooks/useWindowSize';
import { UnitEditModal, ProjectEditModal } from '..';

const Table = styled('table')`
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.default.onButton};
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
  background-color: ${props.theme.colors.default.onButton};
  `}
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 100px;
`;

const StyledPaginationContainer = styled('div')`
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.default.onButton};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  width: 100%;
  max-height: 70px;
  margin: 25px 0px 25px 0px;
`;

const StyledRefContainer = styled('div')`
  height: 100%;
  position: relative;
`;

const StyledScalableContainer = styled('div')`
  overflow: auto;
  position: relative;
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

const DataTable = withTheme(({ headings, data, actions }) => {
  const [currentPage, setPage] = useState(0);
  const [getRecord, setRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [editUnits, setEditUnits] = useState(false);
  const [editProjects, setEditProjects] = useState(false);
  const appStore = useSelector(state => state.app);
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setHeight(windowSize.height - ref.current.getBoundingClientRect().top - 20);
  }, [ref.current, windowSize.height]);

  const handlePageClick = page => {
    setPage(page);
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
      <StyledRefContainer ref={ref}>
        <StyledScalableContainer height={`${height}px`}>
          <Table selectedTheme={appStore.theme}>
            <THead selectedTheme={appStore.theme}>
              <tr>
                {headings.map((heading, index) => (
                  <Th
                    start={index === 0 ? 1 : 0}
                    end={!actions && index === headings.length - 1 ? 1 : 0}
                    selectedTheme={appStore.theme}
                    key={index}
                  >
                    <TableCellHeaderText>
                      {convertPascalCaseToSentenceCase(heading)}
                    </TableCellHeaderText>
                  </Th>
                ))}
                {actions && (
                  <Th
                    start={0}
                    end={1}
                    selectedTheme={appStore.theme}
                    key={'action'}
                  >
                    <TableCellHeaderText>Action</TableCellHeaderText>
                  </Th>
                )}
              </tr>
            </THead>
            <tbody style={{ position: 'relative' }}>
              {paginatedData[currentPage].map((record, index) => (
                <>
                  <Tr index={index} selectedTheme={appStore.theme} key={index}>
                    {Object.keys(record).map((key, index) => (
                      <Td
                        onClick={() => setRecord(record)}
                        selectedTheme={appStore.theme}
                        key={index}
                      >
                        <TableCellText
                          tooltip={record[key] && record[key].toString()}
                        >
                          {record[key] && record[key].toString()}
                        </TableCellText>
                      </Td>
                    ))}

                    {actions === 'Units' && (
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditUnits(true);
                          setEditRecord(record);
                        }}
                        selectedTheme={appStore.theme}
                      >
                        <BasicMenu />
                      </Td>
                    )}
                    {actions === 'Projects' && (
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditProjects(true);
                          setEditRecord(record);
                        }}
                        selectedTheme={appStore.theme}
                      >
                        <BasicMenu />
                      </Td>
                    )}
                  </Tr>
                </>
              ))}
            </tbody>
          </Table>
          <StyledPaginationContainer>
            <Pagination
              pages={(paginatedData && paginatedData.length) || 0}
              current={currentPage}
              callback={handlePageClick}
              showLast
            />
          </StyledPaginationContainer>
        </StyledScalableContainer>
      </StyledRefContainer>
      <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
      {editUnits && (
        <UnitEditModal
          onClose={() => {
            setEditUnits(false);
            setEditRecord(null);
          }}
        />
      )}
      {editProjects && (
        <ProjectEditModal
          onClose={() => {
            setEditProjects(false);
            setEditRecord(null);
          }}
          data={editRecord}
        />
      )}
    </>
  );
});

export { DataTable };
