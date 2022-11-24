import _ from 'lodash';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styled, { withTheme, css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUpdatedUrl } from '../../utils/urlUtils';
import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { APIPagination } from '.';
import { useWindowSize } from '../hooks/useWindowSize';
import {
  BasicMenu,
  Modal,
  modalTypeEnum,
  ProjectTransferModal,
  UnitEditModal,
  ProjectEditModal,
} from '../../components';
import {
  deleteProject,
  deleteUnit,
  getStagingData,
} from '../../store/actions/climateWarehouseActions';
import { UnitSplitFormModal } from '../forms/UnitSplitFormModal';

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
  background-color: ${props => props.theme.colors[props.selectedTheme].shade4};
  color: white;
`;

const Th = styled('th')`
  padding: 1rem;
  color: ${props => props.theme.colors[props.selectedTheme].shade4};
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
      background-color: ${props.theme.colors[props.selectedTheme].shade4};
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
        props.theme.colors[props.selectedTheme].shade6,
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
    let navigate = useNavigate();
    let location = useLocation();
    const [editRecord, setEditRecord] = useState(null);
    const [projectToTransfer, setProjectToTransfer] = useState(null);
    const [isProjectTransferConfirmed, setIsProjectTransferConfirmed] =
      useState(false);
    const [unitToBeSplit, setUnitToBeSplit] = useState(null);
    const { theme, readOnlyMode } = useSelector(state => state.app);
    const { organizations, projects, units, stagingData, myOrgUid } =
      useSelector(state => state.climateWarehouse);
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

    const getFullRecord = useCallback(
      partialRecord => {
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

        return fullRecord;
      },
      [units, projects],
    );

    const openDetailedViewModalForRecord = useCallback(
      record => {
        let urlParam = null;
        let urlParamValue = null;

        if (actions === 'Projects') {
          urlParam = 'projectId';
          urlParamValue = record.warehouseProjectId;
        } else if (actions === 'Units') {
          urlParam = 'unitId';
          urlParamValue = record.warehouseUnitId;
        }

        if (urlParam && urlParamValue) {
          navigate(
            `${location.pathname}?${getUpdatedUrl(location.search, {
              param: urlParam,
              value: urlParamValue,
            })}`,
            { replace: true },
          );
        }
      },
      [location, navigate],
    );

    useEffect(() => {
      if (!actionsAreDisplayed && actions === 'Projects') {
        dispatch(getStagingData({ useMockedResponse: false }));
      }
    }, [actionsAreDisplayed, actions]);

    const isTransferPossible = useMemo(
      () =>
        _.isEmpty(stagingData?.projects?.staging) &&
        _.isEmpty(stagingData?.projects?.pending),
      [stagingData],
    );

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

                  <Th
                    stick
                    start={0}
                    end={1}
                    selectedTheme={theme}
                    key={'action'}
                  ></Th>
                </tr>
              </THead>
              <tbody style={{ position: 'relative' }}>
                {data.map((record, index) => (
                  <Tr index={index} selectedTheme={theme} key={index}>
                    {Object.keys(record).map((key, index) => (
                      <Td
                        onClick={() => openDetailedViewModalForRecord(record)}
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

                    {!actionsAreDisplayed &&
                      actions === 'Projects' &&
                      myOrgUid !== getFullRecord(record)?.orgUid &&
                      !readOnlyMode &&
                      getFullRecord(record)?.projectStatus !==
                        'Transitioned' && (
                        <Td
                          stick
                          style={{ cursor: 'pointer' }}
                          selectedTheme={theme}
                        >
                          <BasicMenu
                            options={[
                              {
                                label: intl.formatMessage({
                                  id: 'transfer-project',
                                }),
                                action: () => {
                                  setProjectToTransfer(record);
                                },
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
        {actions === 'Units' && editRecord && (
          <UnitEditModal
            onClose={() => {
              setEditRecord(null);
            }}
            record={editRecord}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
        {actions === 'Projects' && editRecord && (
          <ProjectEditModal
            onClose={() => {
              setEditRecord(null);
            }}
            record={editRecord}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
        {unitToBeSplit && (
          <UnitSplitFormModal
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
        {projectToTransfer && (
          <Modal
            title={intl.formatMessage({
              id: isTransferPossible
                ? 'confirm-transfer'
                : 'transfer-not-possible',
            })}
            body={intl.formatMessage({
              id: isTransferPossible
                ? 'confirm-transfer-details'
                : 'clear-staging-pending-table',
            })}
            modalType={modalTypeEnum.confirmation}
            onClose={() => setProjectToTransfer(null)}
            onOk={() => {
              if (isTransferPossible) {
                setIsProjectTransferConfirmed(true);
              } else {
                setProjectToTransfer(null);
              }
            }}
          />
        )}
        {isProjectTransferConfirmed && projectToTransfer && (
          <ProjectTransferModal
            onClose={() => {
              setIsProjectTransferConfirmed(false);
              setProjectToTransfer(null);
            }}
            record={projectToTransfer}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
      </>
    );
  },
);

export { APIDataTable };
