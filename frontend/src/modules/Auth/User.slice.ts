import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./Auth.Api";

export interface UserState {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  department: number;
}

const initialState: UserState = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  department: -1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        return payload.user;
      }
    );
  },
});
