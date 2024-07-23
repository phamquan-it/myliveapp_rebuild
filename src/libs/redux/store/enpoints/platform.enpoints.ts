import { PlatformModel } from "../../api/models/platform.model";
import { commonPlatformApi } from "../../api/platform.api";


interface PlatformResponse {
  message: string;
  total: number;
  data: PlatformModel[];
}

export const platformApi = commonPlatformApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlatformList: build.query<PlatformResponse, { language: string; keyword: string; offset: number }>({
          query: ({ language, keyword, offset }) => ({
            url: '/platform/list',
            params: {
              language,
              keyword,
              offset
            },
          }),
          providesTags: (result) => (result ? [{ type: 'Platform', id: 'List' }] : []),
        }),
      }),
    overrideExisting: false,
});