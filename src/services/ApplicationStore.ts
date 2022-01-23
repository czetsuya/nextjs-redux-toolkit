import {configureStore} from '@reduxjs/toolkit';
import {UsersService} from "./UserService";

export function makeStore() {
  return configureStore({
    reducer: {
      [UsersService.reducerPath]: UsersService.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            UsersService.middleware
        ),
  })
}

const store = makeStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;