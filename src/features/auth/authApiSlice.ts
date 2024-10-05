import { apiSlice } from "../../app/api/apiSlice";
import { LoginCredentials } from "../../models/loginCredentials";
import { RegisterCredentials } from "../../models/reegisterCredentials";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (loginCredentials: LoginCredentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...loginCredentials }
            })
        }),
        demoLogin: builder.mutation({
            query: () => ({
                url: '/auth/login/demo',
                method: 'POST',
            })
        }),
        register: builder.mutation({
            query: (registerCredentials: RegisterCredentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...registerCredentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            })
        })
    })
});

export const {
    useLoginMutation,
    useDemoLoginMutation,
    useRegisterMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice;
