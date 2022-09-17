import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getApi = createApi({
  reducerPath: 'getApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getFullPost: builder.query({
      query: (id) => `articles/${id}`,
    }),
    addNewUser: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const { useGetFullPostQuery, useAddNewUserMutation } = getApi;
