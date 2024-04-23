import { cadtApi, projectsTag } from '../';
import { Project } from '@/schemas/Project.schema';

interface GetProjectsParams {
  page: number;
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
      query: ({ page, orgUid, search, order }: GetProjectsParams) => {
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

        return {
          url: `/v1/projects`,
          params,
          method: 'GET',
        };
      },
      providesTags: (_response, _error, { orgUid }) => [{ type: projectsTag, id: orgUid }],
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
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery, useDeleteProjectMutation } = projectsApi;
