import { globalApi } from "../../globalApi";
import { UserState } from "./User.slice";
import { ILoginSchema } from "./components/LoginForm/LoginFormSchema";
import { IRegisterSchemaFormated } from "./components/RegisterForm/RegisterFormSchema";

export const authApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserState, IRegisterSchemaFormated>({
      query: (newUser) => ({
        url: "/auth/login",
        method: "POST",
        body: newUser,
        credentials: "include",
      }),
    }),
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

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;

export const {
  endpoints: { login, logout, register },
} = authApi;
