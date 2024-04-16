import { debounce } from 'lodash';
import React, { useState, useCallback } from 'react';
import { CompactUnitsTable, Spinner } from '@/components';
import { useGetUnitsQuery } from '@/api';
import { useNavigate } from 'react-router-dom';

const UnitSummary: React.FC<{ issuanceId: any }> = ({ issuanceId }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Retrieve the query hook including the abort function
  const {
    data: units,
    isLoading,
    isFetching,
  } = useGetUnitsQuery({
    filter: `issuanceId:${issuanceId}:eq`,
    page: currentPage,
  });

  const handlePageChange = useCallback(
    debounce((page) => {
      setCurrentPage(page);
    }, 800),
    [setCurrentPage],
  );

  const onRowClick = useCallback(
    (row: any) => {
      // Ensure the Unit type is defined or use any here
      navigate(`/units#unit-${row.warehouseUnitId}`);
    },
    [navigate],
  );

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (!units) {
    return <div>No units found</div>;
  }

  return (
    <>
      <CompactUnitsTable
        data={units?.data}
        onPageChange={handlePageChange}
        onRowClick={onRowClick}
        currentPage={currentPage}
        totalPages={units.pageCount}
        totalCount={units.pageCount * 10}
      />
    </>
  );
};

export { UnitSummary };
