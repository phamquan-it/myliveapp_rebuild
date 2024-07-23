import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTOLIVE_URL, WEBDOCK_URL } from "./constants/api.constant";
import { getToken } from "./auth.api";
import { PlatformModel } from "./models/platform.model";
import { WEBDOCK_TOKEN } from "../../../../WEBDOCK_PROVIDER/constant/Token";

export const serverScriptApi = createApi({
  reducerPath: 'serverScript',
  baseQuery: fetchBaseQuery({
    baseUrl: WEBDOCK_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", 'application/json;charset=UTF-8');
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${WEBDOCK_TOKEN}`);
      }
      return headers;
    }
  }),
  tagTypes: ['ScriptLibrary'],
  endpoints: (builder) => ({
    getPublicScriptList: builder.query<any, void>({
      query: () => ({
        url: "/v1/scripts",
        method: "GET",
      }),
      providesTags: ['ScriptLibrary'],
    }),
    
  })
});

// Export the auto-generated hook for the `getPlatformList` query endpoint
export const { 
    useGetPublicScriptListQuery
} = serverScriptApi;
