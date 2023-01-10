import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../modules/Auth/Auth.Api";
import { userSlice } from "../modules/Auth/User.slice";
import { globalApi } from "../globalApi";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const storeMiddlewares = [globalApi.middleware, authApi.middleware];

export default reducers;
