import React from 'react';
import { useQueryParamState } from '@/hooks';
import { useGetProjectsImmediateMutation } from '@/api';

const DownloadProjectXlsButton: React.FC = () => {
  const [getProjects, { isLoading: projectsLoading }] = useGetProjectsImmediateMutation();
  const [currentPage] = useQueryParamState('page', '1');
  const [orgUid] = useQueryParamState('orgUid', undefined);
  const [search] = useQueryParamState('search', undefined);
  const [order] = useQueryParamState('order', undefined);

  const handleDownload = (data: any) => {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects-data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleClick = async () => {
    try {
      const result = await getProjects({ page: Number(currentPage), orgUid, search, order }).unwrap();
      handleDownload(result);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={projectsLoading}>
        {projectsLoading ? 'Loading...' : 'Download Projects'}
      </button>
    </div>
  );
};

export { DownloadProjectXlsButton };
