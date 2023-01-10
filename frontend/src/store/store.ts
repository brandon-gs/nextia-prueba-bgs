import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import reducers, { storeMiddlewares } from "./reducers";

export function makeStore() {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(storeMiddlewares),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
