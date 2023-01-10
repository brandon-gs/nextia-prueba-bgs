import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import reducers, { storeMiddlewares } from "./reducers";
import { rtkQueryErrorLogger } from "./middleware";

export function makeStore() {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({})
        .concat(rtkQueryErrorLogger)
        .concat(storeMiddlewares),
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
