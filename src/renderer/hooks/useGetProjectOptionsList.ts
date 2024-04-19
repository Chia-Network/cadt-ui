import { useState, useEffect } from 'react';
import { useGetProjectsQuery } from '@/api';
import { SelectOption } from '@/components';
import { Project } from '@/schemas/Project.schema';

const useGetProjectOptionsList = (orgUid: string | null | undefined) => {
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, error } = useGetProjectsQuery({ orgUid, page }, {
    skip: !orgUid || allDataFetched,
    refetchOnMountOrArgChange: false,
  });

  console.log(data);

  useEffect(() => {
    if (data && data.data.length > 0) {
      const newProjects: SelectOption[] = data.data.map((p: Project) => ({
        label: p.projectName,
        value: p.warehouseProjectId
      } as SelectOption));
      setProjects(prev => [...prev, ...newProjects]);
      if (page < data.pageCount) {
        setPage(page + 1);
      } else {
        setAllDataFetched(true);
      }
    } else if (data) {
      setAllDataFetched(true);
    }
  }, [data, page]);

  return { projects, isLoading: isFetching || isLoading, error };
};

export { useGetProjectOptionsList };
