import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Body } from '..';
import { StyledItem } from '.';
import { MagnifyGlassIcon } from '../icons';
import { getMyOrgUid } from '../../utils/getMyOrgUid';

const StyledCursor = styled('div')`
  cursor: pointer;
`;

const DetailedViewIssuanceUnitTable = ({ issuance }) => {
  const navigate = useNavigate();
  const { organizations } = useSelector(store => store.climateWarehouse);
  const { units } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);

  const unitsBelongingToThisIssuance = useMemo(
    () =>
      units?.reduce((accumulator, currentUnit) => {
        if (currentUnit.issuanceId === issuance.id) {
          return [...accumulator, currentUnit];
        }
        return accumulator;
      }, []),
    [units, issuance],
  );

  return (
    <StyledItem>
      <Body size="Bold" width="100%">
        <FormattedMessage id="units-belonging-to-issuance" />
      </Body>
      {false &&
        unitsBelongingToThisIssuance?.length > 0 &&
        unitsBelongingToThisIssuance.map(unitItem => (
          <StyledCursor key={unitItem.warehouseUnitId}>
            <Body
              onClick={() =>
                navigate(
                  `/units?orgUid=${myOrgUid}&myRegistry=true&unitId=${unitItem.warehouseUnitId}`,
                )
              }
              color="#1890ff"
            >
              {unitItem.warehouseUnitId}
              <MagnifyGlassIcon height="15" width="30" />
            </Body>
          </StyledCursor>
        ))}
      <CustomizedTables
        unitsBelongingToThisIssuance={unitsBelongingToThisIssuance}
      />
      {unitsBelongingToThisIssuance?.length === 0 && '---'}
    </StyledItem>
  );
};

export { DetailedViewIssuanceUnitTable };

const CustomizedTables = ({ unitsBelongingToThisIssuance }) => {
  const intl = useIntl();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns] = useState([
    {
      unitObjectKey: 'serialNumberBlock',
      label: intl.formatMessage({ id: 'serial-number-block' }),
      minWidth: 170,
      align: 'right',
    },
    {
      unitObjectKey: 'unitCount',
      label: intl.formatMessage({ id: 'unit-count' }),
      minWidth: 50,
      align: 'right',
    },
    {
      unitObjectKey: 'unitOwner',
      label: intl.formatMessage({ id: 'units-owner' }),
      minWidth: 80,
      align: 'right',
    },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!unitsBelongingToThisIssuance?.length) return null;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.unitObjectKey}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {unitsBelongingToThisIssuance
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(unitItem => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={unitItem.warehouseUnitId}
                >
                  {columns.map(column => (
                    <TableCell key={column.unitObjectKey} align={column.align}>
                      {unitItem[column.unitObjectKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={unitsBelongingToThisIssuance.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
