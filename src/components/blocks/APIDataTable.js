import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styled, { withTheme, css } from 'styled-components';

import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import {
  APIPagination,
  ProjectDetailedViewModal,
  UnitsDetailViewModal,
} from '.';
import { BasicMenu, Modal, modalTypeEnum } from '..';
import { useWindowSize } from '../hooks/useWindowSize';
import { EditUnitsForm, EditProjectsForm } from '..';
import {
  deleteProject,
  deleteUnit,
} from '../../store/actions/climateWarehouseActions';
import { setForm, setValidateForm } from '../../store/actions/app';
import { SplitUnitFormik } from '../forms/SplitUnitFormik';

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
  :nth-child(1) {
    display: none;
  }
  ${props =>
    props.stick &&
    css`
      position: sticky;
      right: 0px;
      background-color: rgba(242, 242, 242);
    `}

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
  background-color: ${props => props.theme.colors.default.onButton};

  :hover {
    cursor: zoom-in;
    background-color: ${props =>
      props.theme.hexToRgba(
        props.theme.colors[props.selectedTheme].secondary,
        0.3,
      )};
  }
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 100px;
  :nth-child(1) {
    display: none;
  }
  ${props =>
    props.stick &&
    css`
      position: sticky;
      right: 0px;
      background-color: ${props.theme.colors.default.onButton};
    `}

  ${props =>
    props.columnId === 'orgUid' &&
    `
  text-align: center;
  `}
`;

export const StyledPaginationContainer = styled('div')`
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
  width: 100%;
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

const APIDataTable = withTheme(
  ({ headings, data, actions, modalSizeAndPosition, actionsAreDisplayed }) => {
    const [unitOrProjectFullRecord, setUnitOrProjectFullRecord] =
      useState(null);
    const [editRecord, setEditRecord] = useState(null);
    const [unitToBeSplit, setUnitToBeSplit] = useState(null);
    const { theme } = useSelector(state => state.app);
    const { organizations, projects, units } = useSelector(
      state => state.climateWarehouse,
    );
    const [confirmDeletionModal, setConfirmDeletionModal] = useState(null);
    const ref = React.useRef(null);
    const [height, setHeight] = React.useState(0);
    const windowSize = useWindowSize();
    const intl = useIntl();
    const dispatch = useDispatch();

    useEffect(() => {
      setHeight(
        windowSize.height - ref.current.getBoundingClientRect().top - 20,
      );
    }, [ref.current, windowSize.height]);

    const getFullRecord = partialRecord => {
      let fullRecord = null;

      if (actions === 'Projects') {
        fullRecord = projects.filter(
          project =>
            project.warehouseProjectId === partialRecord.warehouseProjectId,
        )[0];
      }

      if (actions === 'Units') {
        fullRecord = units.filter(
          unit => unit.warehouseUnitId === partialRecord.warehouseUnitId,
        )[0];
      }

      setUnitOrProjectFullRecord(fullRecord);
    };

    return (
      <>
        <StyledRefContainer ref={ref}>
          <StyledScalableContainer height={`${height}px`}>
            <Table selectedTheme={theme}>
              <THead selectedTheme={theme}>
                <tr>
                  {headings.map((heading, index) => (
                    <Th
                      start={index === 0 ? 1 : 0}
                      end={!actions && index === headings.length - 1 ? 1 : 0}
                      selectedTheme={theme}
                      key={index}
                    >
                      <TableCellHeaderText>
                        {heading === 'orgUid' && 'Organization'}
                        {heading !== 'orgUid' &&
                          convertPascalCaseToSentenceCase(heading)}
                      </TableCellHeaderText>
                    </Th>
                  ))}
                  {actionsAreDisplayed && actions && (
                    <Th
                      stick
                      start={0}
                      end={1}
                      selectedTheme={theme}
                      key={'action'}
                    ></Th>
                  )}
                </tr>
              </THead>
              <tbody style={{ position: 'relative' }}>
                {data.map((record, index) => (
                  <Tr index={index} selectedTheme={theme} key={index}>
                    {Object.keys(record).map((key, index) => (
                      <Td
                        onClick={() => getFullRecord(record)}
                        selectedTheme={theme}
                        columnId={key}
                        key={index}
                      >
                        <TableCellText
                          tooltip={
                            record[key] &&
                            `${convertPascalCaseToSentenceCase(key)}: ${record[
                              key
                            ].toString()}`
                          }
                        >
                          {key === 'orgUid' && organizations[record[key]] && (
                            <img src={organizations[record[key]].icon} />
                          )}

                          {key !== 'orgUid' &&
                            record[key] &&
                            record[key] !== 'null' &&
                            record[key].toString()}

                          {key !== 'orgUid' &&
                            (record[key] === 'null' ||
                              record[key] === '' ||
                              record[key] === null) &&
                            '--'}
                        </TableCellText>
                      </Td>
                    ))}

                    {actionsAreDisplayed && actions === 'Units' && (
                      <Td
                        stick
                        style={{ cursor: 'pointer' }}
                        selectedTheme={theme}
                      >
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
                            {
                              label: intl.formatMessage({
                                id: 'delete-unit',
                              }),
                              action: () =>
                                setConfirmDeletionModal({
                                  warehouseUnitId: record.warehouseUnitId,
                                }),
                            },
                          ]}
                        />
                      </Td>
                    )}

                    {actionsAreDisplayed && actions === 'Projects' && (
                      <Td
                        stick
                        style={{ cursor: 'pointer' }}
                        selectedTheme={theme}
                      >
                        <BasicMenu
                          options={[
                            {
                              label: intl.formatMessage({
                                id: 'edit-project',
                              }),
                              action: () => {
                                setEditRecord(record);
                                dispatch(setForm('project'));
                                dispatch(setValidateForm(false));
                              },
                            },
                            {
                              label: intl.formatMessage({
                                id: 'delete-project',
                              }),
                              action: () =>
                                setConfirmDeletionModal({
                                  warehouseProjectId: record.warehouseProjectId,
                                }),
                            },
                          ]}
                        />
                      </Td>
                    )}
                  </Tr>
                ))}
              </tbody>
            </Table>
            <StyledPaginationContainer>
              <APIPagination actions={actions} />
            </StyledPaginationContainer>
          </StyledScalableContainer>
        </StyledRefContainer>
        {unitOrProjectFullRecord && actions === 'Projects' && (
          <ProjectDetailedViewModal
            onClose={() => setUnitOrProjectFullRecord(null)}
            modalSizeAndPosition={modalSizeAndPosition}
            projectObject={unitOrProjectFullRecord}
          />
        )}
        {unitOrProjectFullRecord && actions === 'Units' && (
          <UnitsDetailViewModal
            onClose={() => setUnitOrProjectFullRecord(null)}
            modalSizeAndPosition={modalSizeAndPosition}
            unitObject={unitOrProjectFullRecord}
          />
        )}
        {actions === 'Units' && editRecord && (
          <EditUnitsForm
            onClose={() => {
              setEditRecord(null);
              dispatch(setForm(null));
              dispatch(setValidateForm(false));
            }}
            record={editRecord}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
        {actions === 'Projects' && editRecord && (
          <EditProjectsForm
            onClose={() => {
              setEditRecord(null);
              dispatch(setForm(null));
              dispatch(setValidateForm(false));
            }}
            record={editRecord}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
        {unitToBeSplit && (
          <SplitUnitFormik
            organizations={organizations}
            onClose={() => setUnitToBeSplit(null)}
            record={unitToBeSplit}
          />
        )}
        {confirmDeletionModal && (
          <Modal
            title={intl.formatMessage({
              id: 'notification',
            })}
            body={intl.formatMessage({
              id: 'confirm-deletion',
            })}
            modalType={modalTypeEnum.confirmation}
            onClose={() => setConfirmDeletionModal(null)}
            onOk={() => {
              if (confirmDeletionModal.warehouseProjectId) {
                dispatch(
                  deleteProject(confirmDeletionModal.warehouseProjectId),
                );
              } else if (confirmDeletionModal.warehouseUnitId) {
                dispatch(deleteUnit(confirmDeletionModal.warehouseUnitId));
              }
              setConfirmDeletionModal(null);
            }}
          />
        )}
      </>
    );
  },
);

export { APIDataTable };
