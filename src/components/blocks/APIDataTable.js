import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styled, { withTheme, css } from 'styled-components';

import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { TableDrawer, APIPagination } from '.';
import { EllipsisMenuIcon, BasicMenu } from '..';
import { useWindowSize } from '../hooks/useWindowSize';
import {
  EditUnitsForm,
  EditProjectsForm,
  SplitUnitForm,
  NotificationCard,
  Alert,
} from '..';
import { setGlobalErrorMessage } from '../../store/actions/app';

const Table = styled('table')`
  box-sizing: border-box;
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
  max-width: 100px;

  ${props =>
    props.columnId === 'orgUid' &&
    `
  text-align: center;
  `}
`;

const StyledPaginationContainer = styled('div')`
  box-sizing: border-box;
  background-color: white;
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

const APIDataTable = withTheme(({ headings, data, actions }) => {
  const [getRecord, setRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [unitToBeSplit, setUnitToBeSplit] = useState(null);
  const appStore = useSelector(state => state.app);
  const climateWarehouseStore = useSelector(state => state.climateWarehouse);
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const windowSize = useWindowSize();
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    setHeight(windowSize.height - ref.current.getBoundingClientRect().top - 20);
  }, [ref.current, windowSize.height]);

  return (
    <>
      <StyledRefContainer ref={ref}>
        <StyledScalableContainer height={`${height}px`}>
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
                      {heading === 'orgUid' && 'Organization'}
                      {heading !== 'orgUid' &&
                        convertPascalCaseToSentenceCase(heading)}
                    </TableCellHeaderText>
                  </Th>
                ))}
                {actions && (
                  <Th
                    start={false}
                    end={true}
                    selectedTheme={appStore.theme}
                    key={'action'}></Th>
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
                        columnId={key}
                        key={index}>
                        <TableCellText
                          tooltip={
                            record[key] &&
                            `${_.get(
                              climateWarehouseStore,
                              `organizations[${record[key]}].name`,
                            )}: ${record[key].toString()}`
                          }>
                          {key === 'orgUid' &&
                            climateWarehouseStore.organizations[
                              record[key]
                            ] && (
                              <img
                                src={
                                  climateWarehouseStore.organizations[
                                    record[key]
                                  ].icon
                                }
                              />
                            )}

                          {key !== 'orgUid' &&
                            record[key] &&
                            record[key].toString()}
                        </TableCellText>
                      </Td>
                    ))}
                    {actions === 'Units' && (
                      <Td
                        style={{ cursor: 'pointer' }}
                        selectedTheme={appStore.theme}>
                        <BasicMenu
                          options={[
                            {
                              label: intl.formatMessage({
                                id: 'edit-unit',
                              }),
                              action: () => {
                                setEditRecord(record);
                              },
                            },
                            {
                              label: intl.formatMessage({
                                id: 'split',
                              }),
                              action: () => setUnitToBeSplit(record),
                            },
                          ]}
                        />
                      </Td>
                    )}
                    {actions === 'Projects' && (
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditRecord(record);
                        }}
                        selectedTheme={appStore.theme}>
                        <EllipsisMenuIcon />
                      </Td>
                    )}
                  </Tr>
                </>
              ))}
            </tbody>
          </Table>
          {(actions === 'Projects' || actions === 'Units') && (
            <StyledPaginationContainer>
              <APIPagination actions={actions} />
            </StyledPaginationContainer>
          )}
        </StyledScalableContainer>
      </StyledRefContainer>
      <TableDrawer getRecord={getRecord} onClose={() => setRecord(null)} />
      {actions === 'Units' && editRecord && (
        <EditUnitsForm
          onClose={() => {
            setEditRecord(null);
          }}
          data={editRecord}
        />
      )}
      {actions === 'Projects' && editRecord && (
        <EditProjectsForm
          onClose={() => {
            setEditRecord(null);
          }}
          data={editRecord}
        />
      )}
      {unitToBeSplit && (
        <SplitUnitForm
          organizations={climateWarehouseStore.organizations}
          onClose={() => setUnitToBeSplit(null)}
          record={unitToBeSplit}
        />
      )}
      {appStore.errorMessage && (
        <NotificationCard>
          <Alert
            type="error"
            banner={false}
            alertTitle={intl.formatMessage({ id: 'something-went-wrong' })}
            alertBody={intl.formatMessage({
              id: 'unit-could-not-be-split',
            })}
            showIcon
            closeable
            onClose={() => dispatch(setGlobalErrorMessage(null))}
          />
        </NotificationCard>
      )}
    </>
  );
});

export { APIDataTable };
