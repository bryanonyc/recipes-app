import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { AuthResponse, setCredentials } from '../../features/auth/authSlice';
import { isNotNil } from 'ramda';

const BASE_URL = isNotNil(process.env.API_ENDPOINT_BASE_URL) ? process.env.API_ENDPOINT_BASE_URL : process.env.REACT_APP_API_ENDPOINT_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log((extraOptions)) // custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        // console.log('sending refresh token');

        // send refresh token to get new access toekn
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions) as any;

        if (refreshResult?.data) {
            // store the new token
            api.dispatch(setCredentials( refreshResult.data as AuthResponse ));

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 401) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult;
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Recipe' as const,
        'User' as const,
    ],
    endpoints: builder => ({})
});
