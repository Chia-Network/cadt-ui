import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc } from 'lodash';
import { DataTable, PageCounter, Pagination } from '@/components';

interface TableProps {
  data: any[];
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const ProjectsListTable: React.FC<TableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  

  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id={'current-registry'} />,
        key: 'currentRegistry',
      },
      {
        title: <FormattedMessage id={'project-id'} />,
        key: 'projectId',
      },
      {
        title: <FormattedMessage id={'project-name'} />,
        key: 'projectName',
      },
      {
        title: <FormattedMessage id={'project-developer'} />,
        key: 'projectDeveloper',
      },
      {
        title: <FormattedMessage id={'sector'} />,
        key: 'sector',
      },
      {
        title: <FormattedMessage id={'project-type'} />,
        key: 'projectType',
      },
      {
        title: <FormattedMessage id={'project-tags'} />,
        key: 'projectTags',
      },
      {
        title: <FormattedMessage id={'covered-by-ndc'} />,
        key: 'coveredByNdc',
      },
      {
        title: <FormattedMessage id={'project-status'} />,
        key: 'projectStatus',
      },
      {
        title: <FormattedMessage id={'unit-metric'} />,
        key: 'unitMetric',
      },
      {
        title: <FormattedMessage id={'validation-body'} />,
        key: 'validationBody',
      },
    ],
    [],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        onChangeOrder={setOrder}
        order={order}
        data={data}
        primaryKey="warehouseProjectId"
        isLoading={isLoading}
        footer={
          <>
            <PageCounter currentPage={currentPage} totalCount={totalCount} />
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={onPageChange}
              showIcons={true}
              totalPages={totalPages || 1}
            />
          </>
        }
      />
    </div>
  );
};

export { ProjectsListTable };
