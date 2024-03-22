import React, {useCallback} from "react";
import {useGetProjectsQuery} from "@/api";
import {useQueryParamState} from "@/hooks";
import {debounce} from 'lodash';
import {
  OrganizationSelector,
  IndeterminateProgressOverlay,
  SkeletonTable,
  ProjectsListTable,
  SearchBox
} from "@/components";

const ProjectsList: React.FC = () => {

  const [currentPage, setCurrentPage] = useQueryParamState("page", '1');
  const [orgUid, setOrgUid] = useQueryParamState("orgUid", undefined);
  const [search, setSearch] = useQueryParamState("search",undefined);


  const {
    data: projectsData,
    isLoading: projectsLoading,
    isFetching: projectsFetching,
    error: projectsError,
  } = useGetProjectsQuery({page: Number(currentPage), orgUid, search});

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  const handleOrganizationSelected = useCallback((organization: any) => {
    setOrgUid(organization.orgUid);
  }, [setOrgUid]);


  const handleSearchChange = useCallback(
    debounce((event: any) => {setSearch(event.target.value)}, 800),
    [setSearch, debounce]
  );

  if (projectsLoading) {
    return <SkeletonTable />;
  }

  if (projectsError) {
    return <span>cant load</span>;
  }

  if (!projectsData){
    return <span>No Projects Found</span>;
  }

  return (
    <>
      <SearchBox defaultValue={search} onChange={handleSearchChange}/>
      <OrganizationSelector onSelect={handleOrganizationSelected}/>
      <ProjectsListTable
        data={projectsData?.data || []}
        isLoading={projectsLoading}
        currentPage={Number(currentPage)}
        onPageChange={handlePageChange}
        totalPages={projectsData.pageCount}
        totalCount={projectsData.pageCount * 10}
      />
      {projectsFetching && <IndeterminateProgressOverlay/>}
    </>
  );
};

export { ProjectsList };
