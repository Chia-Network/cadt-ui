import { isEmpty, isNil, omit } from 'lodash';
import { cadtApi, projectsTag, stagedProjectsTag } from '../';
import { Project } from '@/schemas/Project.schema';

interface GetProjectsParams {
  page?: number;
  orgUid?: string | null;
  search?: string | null;
  order?: string | null;
  xls?: boolean | null;
}

interface DownloadProjectParams {
  orgUid?: string;
  search?: string;
  order?: string;
}

interface GetProjectParams {
  warehouseProjectId: string;
}

interface DeleteProjectParams {
  warehouseProjectId: string;
}

interface GetProjectsResponse {
  page: number;
  pageCount: number;
  data: Project[];
}

const projectsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsParams>({
      query: ({ page, orgUid, search, order, xls }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams & { limit: number } = { page, limit: 10 };

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        if (xls) {
          params.xls = xls;
          if (!orgUid) {
            params.orgUid = 'all';
          }
        }

        return {
          url: `/v1/projects`,
          params,
          method: 'GET',
        };
      },
    }),

    getProjectsImmediate: builder.mutation<GetProjectsResponse, GetProjectsParams>({
      query: ({ orgUid, search, order, xls }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams = {};

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        if (xls) {
          params.xls = xls;
          if (!orgUid) {
            params.orgUid = 'all';
          }
        }

        return {
          url: `/v1/projects`,
          params,
          method: 'GET',
        };
      },
    }),

    getProject: builder.query<Project, GetProjectParams>({
      query: ({ warehouseProjectId }: GetProjectParams) => ({
        url: `/v1/projects`,
        params: { warehouseProjectId },
        method: 'GET',
      }),
      providesTags: (_response, _error, { warehouseProjectId }) => [{ type: projectsTag, id: warehouseProjectId }],
    }),

    deleteProject: builder.mutation<any, DeleteProjectParams>({
      query: ({ warehouseProjectId }: GetProjectParams) => ({
        url: `/v1/projects`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { warehouseProjectId },
      }),
      invalidatesTags: (_response, _error, { warehouseProjectId }) => [{ type: projectsTag, id: warehouseProjectId }],
    }),

    stageCreateProject: builder.mutation<any, Project>({
      query: (project) => {
        delete project.orgUid;

        if (isNil(project.projectLocations) || isEmpty(project.projectLocations)) {
          delete project.projectLocations;
        }

        if (isNil(project.labels) || isEmpty(project.labels)) {
          delete project.labels;
        }

        if (isNil(project.relatedProjects) || isEmpty(project.relatedProjects)) {
          delete project.relatedProjects;
        }

        if (isNil(project.projectRatings) || isEmpty(project.projectRatings)) {
          delete project.projectRatings;
        }

        if (isNil(project.estimations) || isEmpty(project.estimations)) {
          delete project.estimations;
        }

        if (isNil(project.issuances) || isEmpty(project.issuances)) {
          delete project.issuances;
        }

        if (isNil(project.coBenefits) || isEmpty(project.coBenefits)) {
          delete project.coBenefits;
        }

        return {
          url: `/v1/projects`,
          method: 'POST',
          body: omit(project, ['orgUid', 'timeStaged', 'createdBy', 'updatedBy']),
        };
      },
      invalidatesTags: [stagedProjectsTag],
    }),

    stageUpdateProject: builder.mutation<any, Project>({
      query: (project) => {
        if (isNil(project.projectLocations) || isEmpty(project.projectLocations)) {
          delete project.projectLocations;
        }

        if (isNil(project.labels) || isEmpty(project.labels)) {
          delete project.labels;
        }

        if (isNil(project.relatedProjects) || isEmpty(project.relatedProjects)) {
          delete project.relatedProjects;
        }

        if (isNil(project.projectRatings) || isEmpty(project.projectRatings)) {
          delete project.projectRatings;
        }

        if (isNil(project.estimations) || isEmpty(project.estimations)) {
          delete project.estimations;
        }

        if (isNil(project.issuances) || isEmpty(project.issuances)) {
          delete project.issuances;
        }

        if (isNil(project.coBenefits) || isEmpty(project.coBenefits)) {
          delete project.coBenefits;
        }

        return {
          url: `/v1/projects`,
          method: 'PUT',
          body: omit(project, ['orgUid', 'timeStaged', 'createdBy', 'updatedBy']),
        };
      },
      invalidatesTags: [stagedProjectsTag],
    }),

    uploadProjectsXls: builder.mutation<any, { xlsx: File }>({
      query: ({ xlsx }) => {
        const formData: FormData = new FormData();
        formData.append('xlsx', xlsx);

        return {
          url: `/v1/projects/xlsx`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: [stagedProjectsTag],
    }),

    downloadProjectsXlsImmediate: builder.mutation<any, DownloadProjectParams>({
      query: ({ orgUid, search, order }: DownloadProjectParams) => {
        const params: DownloadProjectParams & { xls: boolean } = { xls: true };

        if (orgUid) {
          params.orgUid = orgUid;
        } else {
          params.orgUid = 'all';
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `/v1/projects`,
          params,
          method: 'GET',
          responseHandler: (response: any) => response.blob(),
        };
      },
    }),
  }),
});

export const invalidateProjectApiTag = projectsApi.util.invalidateTags;

export const {
  useGetProjectsQuery,
  useGetProjectsImmediateMutation,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useStageCreateProjectMutation,
  useStageUpdateProjectMutation,
  useUploadProjectsXlsMutation,
  useDownloadProjectsXlsImmediateMutation,
} = projectsApi;
