import { createSelector, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import type { Recipe } from "../../models/recipe";
import { isEmpty } from 'ramda';

const recipesAdapter = createEntityAdapter<Recipe>();

const initialState = recipesAdapter.getInitialState();

const getRecipesUrl = (searchText: {}) => {
    if (isEmpty(searchText)) {
        return '/recipes'
    } else {
        const queryParam = new URLSearchParams(searchText);
        return `/recipes/?${queryParam}`
    }
}

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecipes: builder.query<EntityState<Recipe, number>, {}>({
            query: (queryParams) => ({
                url: getRecipesUrl(queryParams),
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData: Recipe[]) => {
                return recipesAdapter.setAll(initialState, responseData)
              },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'Recipe' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Recipe' as const, id }))

                    ]
                } else {
                    return [{ type: 'Recipe' as const, id: 'LIST' }];
                }
            }
        }),
        addNewRecipe: builder.mutation({
            query: recipeData => ({
                url: '/recipes',
                method: 'POST',
                body: {
                    ...recipeData
                }
            }),
            invalidatesTags: [
                { type: 'Recipe' as const, id: 'LIST' }
            ]
        }),
        updateRecipe: builder.mutation({
            query: (patch) => ({
                url: '/recipes',
                method: 'PATCH',
                body: {
                    ...patch
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe' as const, id: arg.id }
            ]
        }),
        publishRecipe: builder.mutation({
            query: (patch) => ({
                url: '/recipes/publish',
                method: 'PATCH',
                body: { ...patch }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe' as const, id: 'LIST' }
            ]
        }),
        deleteRecipe: builder.mutation({
            query: ({ id }) => ({
                url: `/recipes/${id}/delete`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe' as const, id: arg.id }
            ]
        }),
        addFavorite: builder.mutation({
            query: ({ recipeId, username }) => ({
                url: `/recipes/${recipeId}/favorite`,
                method: 'POST',
                body: { username }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe' as const, id: 'LIST' }
            ]
        }),
        deleteFavorite: builder.mutation({
            query: ({ recipeId, username }) => ({
                url: `/recipes/${recipeId}/favorite`,
                method: 'DELETE',
                body: { username }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe' as const, id: arg.id }
            ]
        }),
    }),
});

// Export the hooks
export const {
    useGetRecipesQuery,
    useAddNewRecipeMutation,
    useUpdateRecipeMutation,
    usePublishRecipeMutation,
    useDeleteRecipeMutation,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation
} = recipesApiSlice;

// returns the query result object
const selectRecipesResult = recipesApiSlice
    .endpoints
    .getRecipes
    .select({});

// creates memozed selectr
const selectRecipesData = createSelector(
    selectRecipesResult,
    recipesResult => recipesResult.data // normalized state object with ids and entities
);

export const {
    selectAll: selectAllRecipes,
    selectById: selectRecipesById,
    selectIds: selectRecipesId
} = recipesAdapter.getSelectors((state: any) => selectRecipesData(state) ?? initialState);
