import React, { useState, useCallback } from 'react';
import { Modal, Spinner, PageCounter, Pagination } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetUnitsQuery } from '@/api';

interface UnitsModalProps {
  issuanceId: string;
  onClose: () => void;
}

const UnitsModal: React.FC<UnitsModalProps> = ({ issuanceId, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: units, isLoading: isUnitsLoading } = useGetUnitsQuery(
    {
      filter: `issuanceId:${issuanceId}:eq`,
      page: currentPage,
    },
    {
      skip: !issuanceId,
    },
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleUnitClick = useCallback(
    (warehouseUnitId: string) => {
      // Include page=1 query parameter as it's required for the units page to load correctly
      // Add tab=issuance to force the issuance tab to be active since we're coming from an issuance context
      window.location.href = `/units?page=1&tab=issuance#unit-${warehouseUnitId}`;
      onClose(); // Close the modal after navigation
    },
    [onClose],
  );

  return (
    <Modal onClose={onClose} show={true} size={'6xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage
          id="units-belonging-to-issuance"
          defaultMessage="Units Belonging to Issuance {id}"
          values={{ id: issuanceId.substring(0, 8) }}
        />
      </Modal.Header>
      <Modal.Body>
        <div>
          {isUnitsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FormattedMessage id={'serial-number-block'} />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FormattedMessage id={'unit-count'} />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FormattedMessage id={'unit-owner'} />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {units?.data?.map((unit: any) => (
                      <tr
                        key={unit.warehouseUnitId}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleUnitClick(unit.warehouseUnitId)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {unit.serialNumberBlock || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.unitCount || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <span className="font-bold break-words">{unit.unitOwner || '-'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {units && units.pageCount > 1 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <PageCounter currentPage={currentPage} totalCount={units.pageCount * 10} />
                    <Pagination
                      currentPage={currentPage}
                      layout="pagination"
                      onPageChange={handlePageChange}
                      showIcons={true}
                      totalPages={units.pageCount}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UnitsModal };
