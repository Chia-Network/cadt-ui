import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { getUpdatedUrl } from '../../utils/urlUtils';
import { getUnits } from '../../store/actions/climateWarehouseActions';

const StyledTableRow = styled(TableRow)(() => ({
  '& td, & th': {
    cursor: 'zoom-in',
  },
}));

const Spacing = styled('div')({
  paddingTop: '17px',
});

const DetailedViewIssuanceUnitTable = ({ issuance }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { units } = useSelector(store => store.climateWarehouse);
  const intl = useIntl();
  const [page, setPage] = React.useState(0);
  const rowsPerPageOptions = [7, 14, 21];
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  let location = useLocation();
  const [columns] = useState([
    {
      unitObjectKey: 'serialNumberBlock',
      label: intl.formatMessage({ id: 'serial-number-block' }),
      minWidth: 170,
      align: 'left',
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

  useEffect(() => {
    dispatch(getUnits({ useMockedResponse: false, useApiMock: false }));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const unitsBelongingToThisIssuance = useMemo(
    () =>
      units
        ?.reduce((accumulator, currentUnit) => {
          const isStagingCurrentlyDisplayed =
            typeof issuance?.id?.original === 'string';
          const issuanceId = isStagingCurrentlyDisplayed
            ? issuance.id?.original
            : issuance.id;
          if (currentUnit.issuanceId === issuanceId) {
            return [...accumulator, currentUnit];
          }
          return accumulator;
        }, [])
        .sort(function (x, y) {
          let a = x.serialNumberBlock,
            b = y.serialNumberBlock;
          return a == b ? 0 : a > b ? 1 : -1;
        }),
    [units, issuance],
  );

  return (
    <StyledItem>
      <Body size="Bold" width="100%">
        <FormattedMessage id="units-belonging-to-issuance" />
      </Body>
      <Spacing />
      {unitsBelongingToThisIssuance?.length > 0 && (
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
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={unitItem.warehouseUnitId}
                      onClick={() =>
                        navigate(
                          `/units?${getUpdatedUrl(
                            location.search,
                            {
                              param: 'unitId',
                              value: unitItem.warehouseUnitId,
                            },
                            {
                              param: 'projectId',
                              value: null,
                            },
                          )}`,
                          { replace: true },
                        )
                      }
                    >
                      {columns.map(column => (
                        <TableCell
                          key={column.unitObjectKey}
                          align={column.align}
                        >
                          {unitItem[column.unitObjectKey]}
                        </TableCell>
                      ))}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {unitsBelongingToThisIssuance.length > rowsPerPage && (
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={unitsBelongingToThisIssuance.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
      {unitsBelongingToThisIssuance?.length === 0 && '---'}
    </StyledItem>
  );
};

export { DetailedViewIssuanceUnitTable };
