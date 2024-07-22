import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTOLIVE_URL } from './constants/api.constant';
import { Login, Register } from './models/auth.model';

const prepareHeadersWithToken = (headers:any) => {
    const token = localStorage.getItem('token'); // Adjust the key if your token is stored under a different key
    if (token) {
        headers.set('Content-Type', 'application/json;charset=UTF-8');
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};
interface UserProfile{
    data: any
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTOLIVE_URL,
        prepareHeaders: (headers) => prepareHeadersWithToken(headers),
    }),
    tagTypes:['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string }, Login>({
            query: (credentials) => ({
                url: '/auth/login?language=vi',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<{ token: string }, Register>({
            query: (register) => ({
                url: '/auth/register?language=vi',
                method: 'POST',
                body: register,
            }),
        }),
        forgot: builder.mutation<{ value: string }, { email: string }>({
            query: (forgot) => ({
                url: '/auth/forgot?language=vi',
                method: 'POST',
                body: forgot,
            }),
        }),
        refreshToken: builder.mutation<{ value: string }, { email: string }>({
            query: (refresh) => ({
                url: '/auth/refresh?language=vi',
                method: 'POST',
                body: refresh,
            }),
        }),
        getUserProfile: builder.query<UserProfile, { language: string; }>({
            query: ({ language}) => ({
              url: '/platform/list',
              params: {
                language
              },
            }),
          }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotMutation,
    useRefreshTokenMutation,
    useGetUserProfileQuery
} = authApi;
