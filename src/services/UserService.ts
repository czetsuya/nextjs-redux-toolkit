// Need to use the React-specific entry point to import createApi
import {BaseService} from "./BaseService";
import {UserType} from "./types/UserType";
import {createSlice} from "@reduxjs/toolkit";

interface Pagination {
  offset: number,
  limit: number
}

export const UsersService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserType[], Pagination>({
      query: (param: Pagination) => `/users?offset=${param.offset}&limit=${param.limit}`,
      providesTags: [{type: "User", id: "LIST"}]
    }),
    getUser: build.query<UserType, number>({
      query: (id) => ({
        url: `/users/${id}`,
      })
    }),
    createUser: build.mutation<UserType, UserType>({
      query: (body: UserType) => ({
        url: `/users`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{type: "User", id: "LIST"}]
    }),
    updateUser: build.mutation<UserType, Pick<UserType, 'id'> & Partial<UserType>>({
      query: ({id, ...body}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [{type: "User", id: "LIST"}]
    }),
    deleteUser: build.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetUsersQuery, useGetUserQuery,
  useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation
} = UsersService;