import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { TableDrawer, APIPagination } from '.';
import { EllipseIcon } from '..';
import { useWindowSize } from '../hooks/useWindowSize';

import { EditUnitsForm, EditProjectsForm } from '..';

const Table = styled('table')`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 70px;
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
  max-width: 100px;
`;

const APIDataTable = withTheme(({ headings, data, actions }) => {
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

  return (
    <>
      <div ref={ref} style={{ height: '100%', position: 'relative' }}>
        <div
          style={{
            height: `${height}px`,
            overflow: 'auto',
            position: 'relative',
          }}>
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
            <tbody style={{ position: 'relative' }}>
              {data.map((record, index) => (
                <>
                  <Tr index={index} selectedTheme={appStore.theme} key={index}>
                    {Object.keys(record).map((key, index) => (
                      <Td
                        onClick={() => setRecord(record)}
                        selectedTheme={appStore.theme}
                        key={index}>
                        <TableCellText>
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
                        electedTheme={appStore.theme}>
                        <div
                          style={{
                            transform: 'rotate(0.25turn)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                          }}>
                          <EllipseIcon height={'5'} width={'5'} />
                          <EllipseIcon height={'5'} width={'5'} />
                          <EllipseIcon height={'5'} width={'5'} />
                        </div>
                      </Td>
                    )}
                    {actions === 'Projects' && (
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditProjects(true);
                          setEditRecord(record);
                        }}
                        electedTheme={appStore.theme}>
                        <div
                          style={{
                            transform: 'rotate(0.25turn)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                          }}>
                          <EllipseIcon height="5" width="5" />
                          <EllipseIcon height="5" width="5" />
                          <EllipseIcon height="5" width="5" />
                        </div>
                      </Td>
                    )}
                  </Tr>
                </>
              ))}
            </tbody>
          </Table>
          {(actions === 'Projects' || actions === 'Units') && (
            <APIPagination actions={actions} />
          )}
        </div>
      </div>
      <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
      {editUnits && (
        <EditUnitsForm
          onClose={() => {
            setEditUnits(false);
            setEditRecord(null);
          }}
          data={editRecord}
        />
      )}
      {editProjects && (
        <EditProjectsForm
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

export { APIDataTable };
