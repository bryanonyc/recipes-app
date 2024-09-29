import { createSelector, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import type { Recipe } from "../../models/recipe";

const recipesAdapter = createEntityAdapter<Recipe>();

const initialState = recipesAdapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecipes: builder.query<EntityState<Recipe, number>, void>({
            query: () => ({
                url: '/recipes',
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
    }),
});

// Export the hooks
export const {
    useGetRecipesQuery,
    useAddNewRecipeMutation,
    useUpdateRecipeMutation,
    usePublishRecipeMutation,
    useDeleteRecipeMutation,
} = recipesApiSlice;

// returns the query result object
export const selectRecipesResult = recipesApiSlice
    .endpoints
    .getRecipes
    .select();

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
