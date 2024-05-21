import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { usersApi } from "../apis/users.api";
import counterReducer from "../features/counter/counterSlice";
import auth from "../slices/auth.slice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    counter: counterReducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;