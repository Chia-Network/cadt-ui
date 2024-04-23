import { useState, useEffect } from 'react';
import { useGetProjectsQuery } from '@/api';
import { SelectOption } from '@/components';
import { Project } from '@/schemas/Project.schema';

export interface ProjectOptionsResult {
  projects: SelectOption[];
  isLoading: boolean;
}

const useGetProjectOptionsList = (orgUid: string | null | undefined) => {
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, error } = useGetProjectsQuery({ orgUid, page }, {
    skip: !orgUid || allDataFetched,
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (data && data.data.length > 0) {
      // @ts-ignore
      const newProjects: SelectOption[] = data.data.map((p: Project) => ({
        label: p.projectName,
        value: p.warehouseProjectId
      }));

      // Merge and filter duplicates
      setProjects(prev => {
        // @ts-ignore
        const existingValues = new Set(prev.map(p => p.value));
        // @ts-ignore
        const uniqueNewProjects = newProjects.filter(p => !existingValues.has(p.value));
        return [...prev, ...uniqueNewProjects];
      });

      // Update pagination if more data is available
      if (page < data.pageCount) {
        setPage(page + 1);
      } else {
        setAllDataFetched(true);
      }
    } else if (data) {
      setAllDataFetched(true);
    }
  }, [data, page]);

  return { projects, isLoading: isFetching || isLoading, error } as ProjectOptionsResult;
};

export { useGetProjectOptionsList };
