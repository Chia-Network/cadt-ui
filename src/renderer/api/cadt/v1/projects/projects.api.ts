import {cadtApi, projectsTag} from "../";

const host: string = 'http://localhost:31310'

interface GetProjectsParams {
  page: number;
  orgUid?: string;
  search?: string;
}

const projectsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<any, GetProjectsParams>({
      query: ({ page, orgUid, search }) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams & {limit: number} = { page, limit: 10 };

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        return {
          url: `${host}/v1/projects`,
          params, // Use the constructed params object
          method: 'GET',
        };
      },
      providesTags: [projectsTag],
    })
  })
});

export const {
  useGetProjectsQuery
} = projectsApi;