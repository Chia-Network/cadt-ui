import {cadtApi, projectsTag, stagedProjectsTag} from "../";
import {Project} from "@/schemas/Project.schema";

interface GetProjectsParams {
  page: number;
  orgUid?: string | null;
  search?: string | null;
  order?: string | null;
}

interface GetProjectParams {
  warehouseProjectId: string;
}

interface GetProjectsResponse {
  page: number,
  pageCount: number,
  data: Project[]
}

const projectsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsParams>({
      query: ({ page, orgUid, search, order }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams & {limit: number} = { page, limit: 10 };

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
      // @ts-ignore
      providesTags: (_response, _error, {orgUid}) => [{type: projectsTag, id: orgUid}],
    }),
    getProject: builder.query<Project, GetProjectParams>({
      query: ({ warehouseProjectId }: GetProjectParams) => ({
        url: `/v1/projects`,
        params: { warehouseProjectId },
        method: 'GET',
      }),
      providesTags: (_response, _error, {warehouseProjectId}) => [{type: projectsTag, id: warehouseProjectId}],
    }),
    stageProject: builder.mutation<any, Project>({
      query: (project) => ({
        url: `/v1/projects`,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: [stagedProjectsTag],
    }),
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useStageProjectMutation,
} = projectsApi;