import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'
import { User } from '../../models/user'

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

const RESOURCE_URL = '/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<EntityState<User, number>, void>({
            query: () => ({
                url: RESOURCE_URL,
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData: User[]) => {
                return usersAdapter.setAll(initialState, responseData)
              },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'User' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User' as const, id }))

                    ]
                } else {
                    return [{ type: 'User' as const, id: 'LIST' }];
                }
            }
        }),
        updateUser: builder.mutation({
            query: (patch) => ({
                url: RESOURCE_URL,
                method: 'PATCH',
                body: { ...patch }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User' as const, id: arg.id }
            ]
        })
    })
});

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
} = usersApiSlice;

const selectUsersResult = usersApiSlice
    .endpoints
    .getUsers
    .select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids and entities
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectIds: selectUsersId
} = usersAdapter.getSelectors((state: any) => selectUsersData(state) ?? initialState);
