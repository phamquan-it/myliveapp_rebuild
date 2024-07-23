import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTOLIVE_URL } from './constants/api.constant';
import { Login, Register } from './models/auth.model';
export const getToken = () => {
    return localStorage.getItem("authToken");
  };
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: AUTOLIVE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
        forgot: builder.mutation<{ value: string }, {email: string}>({
            query: (forgot) => ({
                url: '/auth/forgot?language=vi',
                method: 'POST',
                body: forgot,
            }),
        }),
        refreshToken: builder.mutation<{ value: string }, {email: string}>({
            query: (refresh) => ({
                url: '/auth/refresh?language=vi',
                method: 'POST',
                body: refresh,
            }),
        }),
        getUserInfo: builder.query<any, void>({
            query: ()=>({
                url:"/auth/profile",
                method:"GET",
                
            })
        }),
        logout: builder.mutation<void, void>({
            queryFn: () => {
                localStorage.removeItem('authToken');
                return { data: undefined };
            },
        }),
    }),
});

export const { 
    useLoginMutation,  
    useRegisterMutation, 
    useForgotMutation, 
    useRefreshTokenMutation,
    useGetUserInfoQuery,
    useLogoutMutation
} = authApi;