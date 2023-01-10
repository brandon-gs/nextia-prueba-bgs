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
        state._id = payload._id;
        state.department = payload.department;
        state.email = payload.email;
        state.firstname = payload.firstname;
        state.lastname = payload.lastname;
      }
    );
  },
});
