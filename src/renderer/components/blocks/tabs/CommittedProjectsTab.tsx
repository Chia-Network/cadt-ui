import { FormattedMessage } from 'react-intl';
import { ProjectModal, ProjectsListTable, SkeletonTable } from '@/components';
import React, { useCallback, useEffect } from 'react';
import { useGetProjectsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';

interface PageTabProps {
  orgUid: string;
  search: string;
  setIsLoading: (isLoading: boolean) => void;
}

const CommittedProjectsTab: React.FC<PageTabProps> = ({ orgUid, search, setIsLoading }: PageTabProps) => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const [projectDetailsFragment, projectDetailsModalActive, setProjectModalActive] = useWildCardUrlHash('project');
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetProjectsQuery({ page: Number(currentPage), orgUid, search, order });

  useEffect(() => {
    setIsLoading(projectsLoading);
  }, [projectsLoading, setIsLoading]);

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  if (projectsLoading) {
    return <SkeletonTable />;
  }

  if (projectsError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {projectsLoading ? (
        <SkeletonTable />
      ) : (
        <ProjectsListTable
          data={projectsData?.data || []}
          isEditable={true}
          isLoading={projectsLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          onRowClick={(row) => setProjectModalActive(true, row.warehouseProjectId)}
          setOrder={handleSetOrder}
          order={order}
          totalPages={projectsData.pageCount}
          totalCount={projectsData.pageCount < 10 ? projectsData.data.length : projectsData.pageCount * 10}
        />
      )}
      {projectDetailsModalActive && (
        <ProjectModal
          onClose={() => setProjectModalActive(false)}
          warehouseProjectId={projectDetailsFragment.replace('project-', '')}
        />
      )}
    </>
  );
};

export { CommittedProjectsTab };
