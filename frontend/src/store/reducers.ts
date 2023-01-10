import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../modules/Auth/Auth.Api";
import { userSlice } from "../modules/Auth/User.slice";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const storeMiddlewares = [authApi.middleware];

export default reducers;
