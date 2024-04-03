import {cadtApi, auditTag} from "../";

const host: string = 'http://localhost:31310'

interface GetAuditParams {
  page: number;
  orgUid: string;
  search?: string;
  order?: string;
}

interface GetAuditResponse {
  page: number,
  pageCount: number,
  data: any[]
}

const auditApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAudit: builder.query<GetAuditResponse, GetAuditParams>({
      query: ({ page, orgUid, search, order }: GetAuditParams) => {
        // Initialize the params object with page and limit
        const params: GetAuditParams & {limit: number} = { orgUid, page, limit: 10 };

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `${host}/v1/audit`,
          params, // Use the constructed params object
          method: 'GET',
        };
      },
      providesTags: (_response, _error, {orgUid}) => [{type: auditTag, id: orgUid}],
    })
  })
});

export const {
  useGetAuditQuery
} = auditApi;