import { globalApi } from "../../globalApi";
import { UserState } from "./User.slice";
import { ILoginSchema } from "./components/LoginForm/LoginFormSchema";

export const authApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserState, ILoginSchema>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

export const {
  endpoints: { login, logout },
} = authApi;
