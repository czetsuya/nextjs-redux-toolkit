// Need to use the React-specific entry point to import createApi
import {BaseService} from "./BaseService";
import {UserPayload} from "./types/UserPayload";

export const UsersService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserPayload[], void>({
      query: () => '/users',
      providesTags: [{type: "User", id: "LIST"}]
    }),
    getUser: build.query<UserPayload, number>({
      query: (id) => ({
        url: `/users/${id}`,
      })
    }),
    createUser: build.mutation<UserPayload, UserPayload>({
      query: (body: UserPayload) => ({
        url: `/users`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{type: "User", id: "LIST"}]
    }),
    updateUser: build.mutation<UserPayload, Partial<UserPayload>>({
      query: ({id, ...body}) => ({
        url: `/users/${id}`,
        method: 'PUT',
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
  useCreateUserMutation, useDeleteUserMutation
} = UsersService;