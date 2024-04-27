import { partial } from 'lodash';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { DebouncedFunc } from 'lodash';
import {
  Column,
  DataTable,
  PageCounter,
  Pagination,
  ProjectAndUnitActions,
  Tooltip,
  UpsertProjectModal,
} from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Badge } from 'flowbite-react';
import { useWildCardUrlHash, useUrlHash } from '@/hooks';

interface TableProps {
  data: Project[];
  isEditable: boolean;
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  onRowClick?: (row: any) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const ProjectsListTable: React.FC<TableProps> = ({
  data,
  isEditable,
  isLoading,
  currentPage,
  onPageChange,
  onRowClick,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  const [, editProjectModalActive, setEditProjectModalActive] = useWildCardUrlHash('edit-project');
  const [createProjectModalActive, setCreateProjectModalActive] = useUrlHash('create-project');

  const handleCloseUpsertModal = () => {
    setCreateProjectModalActive(false);
    setEditProjectModalActive(false);
  };

  const columns = useMemo(() => {
    const editColumn: Column[] = [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        ignoreOrderChange: true,
        render: (row: Project) => (
          <ProjectAndUnitActions
            type="project"
            warehouseId={row?.warehouseProjectId || ''}
            openEditModal={partial(setEditProjectModalActive, true)}
          />
        ),
      },
    ];

    const staticColumns: Column[] = [
      {
        title: <FormattedMessage id={'current-registry'} />,
        key: 'currentRegistry',
        render: (row: Project) => <span className="font-bold">{row.currentRegistry || '-'}</span>,
      },
      {
        title: <FormattedMessage id={'project-id'} />,
        key: 'projectId',
        render: (row: Project) => (
          <div className="m-1 p-3 bg-white rounded-lg border shadow-sm dark:border-gray-500 dark:bg-transparent text-center overflow-hidden">
            <Tooltip content={row.projectId}>
              <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-50">{row.projectId}</h5>
            </Tooltip>
          </div>
        ),
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
        render: (row: Project) => (
          <Badge color="green" style={{ display: 'inline-flex' }}>
            {row.unitMetric || '-'}
          </Badge>
        ),
      },
      {
        title: <FormattedMessage id={'validation-body'} />,
        key: 'validationBody',
      },
      {
        title: <FormattedMessage id={'project-tags'} />,
        key: 'projectTags',
      },
    ];

    return isEditable ? editColumn.concat(staticColumns) : staticColumns;
  }, [isEditable]);

  return (
    <>
      <div className="relative">
        <DataTable
          columns={columns}
          onChangeOrder={setOrder}
          onRowClick={onRowClick}
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
      {(createProjectModalActive || editProjectModalActive) && <UpsertProjectModal onClose={handleCloseUpsertModal} />}
    </>
  );
};

export { ProjectsListTable };
