// Need to use the React-specific entry point to import createApi
import {BaseService} from "./BaseService";

// Define a type for the slice state
interface UserState {
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  birthDate?: Date
}

// Define the initial state using that type
const INITIAL_STATE: UserState = {}

export const UsersService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '/users'
    }),
  }),
  overrideExisting: false,
})

export const {useGetUsersQuery} = UsersService;