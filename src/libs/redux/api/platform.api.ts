import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { AUTOLIVE_URL } from "./constants/api.constant";
import { headers } from "next/headers";
import { getToken } from "./auth.api";

export const commonPlatformApi = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTOLIVE_URL,
        prepareHeaders: headers=>{
            headers.set("Authorization", 'application/json;charset=UTF-8');
            const token = getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Platform'],
    endpoints: _ => ({})
})