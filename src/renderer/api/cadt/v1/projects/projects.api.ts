import {cadtApi, projectsTag,} from "../";
import {Project} from "@/schemas/Project.schema";

const host: string = 'http://localhost:31310'

interface GetProjectsParams {
  page: number;
  orgUid?: string;
  search?: string;
  order?: string;
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
          url: `${host}/v1/projects`,
          params, // Use the constructed params object
          method: 'GET',
        };
      },
      providesTags: (_response, _error, {orgUid}) => [{type: projectsTag, id: orgUid}],
    })
  })
});

export const {
  useGetProjectsQuery
} = projectsApi;