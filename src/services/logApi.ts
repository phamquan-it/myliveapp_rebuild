// src/services/logApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

export const logApi = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLogs: builder.query<any, { keyword: string, pageIndex: number, pageSize: number }>({
      query: ({ keyword, pageIndex, pageSize }) => ({
        url: `/log/list?language=${navigator.language}`,
        params: {
          keyword,
          offset: (pageIndex - 1) * pageSize,
          limit: pageSize,
        },
      }),
    }),
  }),
});

export const { useGetLogsQuery } = logApi;
