import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTOLIVE_URL } from "./constants/api.constant";
import { getToken } from "./auth.api";
import { PlatformModel } from "./models/platform.model";

export const commonPlatformApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTOLIVE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", 'application/json;charset=UTF-8');
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Platform'],
  endpoints: (builder) => ({
    getPlatformList: builder.query<any, void>({
      query: () => ({
        url: "/platform/list",
        method: "GET",
      }),
      providesTags: ['Platform'],
    }),
    createPlatform: builder.mutation<PlatformModel, { name: string, rmtp: string }>({
        query: (newPlatform) => ({
          url: "/platform",
          method: "POST",
          body: newPlatform,
        }),
        invalidatesTags: ['Platform'],
      }),
      updatePlatform: builder.mutation<PlatformModel, { id: string, name: string, rmtp: string }>({
        query: ({ id, ...patch }) => ({
          url: `/platform/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ['Platform'],
      }),
      deletePlatform: builder.mutation<{ success: boolean }, { id: string }>({
        query: ({ id }) => ({
          url: `/platform/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Platform'],
      }),
  })
});

// Export the auto-generated hook for the `getPlatformList` query endpoint
export const { 
    useCreatePlatformMutation,
    useDeletePlatformMutation,
    useUpdatePlatformMutation,    
    useGetPlatformListQuery
} = commonPlatformApi;
