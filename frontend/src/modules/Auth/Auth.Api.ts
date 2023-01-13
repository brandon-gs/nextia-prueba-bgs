import { globalApi } from "../../globalApi";
import { IMessageResponse } from "../../types/MessageResponse";
import { UserState } from "../../types/User";
import { IForgotPasswordSchema } from "./components/ForgotPassword/ForgotPasswordSchema";
import { ILoginSchema } from "./components/LoginForm/LoginFormSchema";
import { IRegisterSchemaFormated } from "./components/RegisterForm/RegisterFormSchema";

export const authApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<UserState, IRegisterSchemaFormated>({
      query: (newUser) => ({
        url: "/auth/register",
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
    forgotPassword: builder.mutation<IMessageResponse, IForgotPasswordSchema>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),
    recoverPassword: builder.mutation<
      IMessageResponse | void,
      { token: string; from: string; password: string }
    >({
      query: ({ token, from, password }) => ({
        url: `/auth/recover-password?token=${token}&from=${from}`,
        method: "POST",
        body: { password },
      }),
    }),
    getUser: builder.query<{ user: UserState }, void>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useGetUserQuery,
} = authApi;

export const {
  endpoints: {
    login,
    logout,
    register,
    forgotPassword,
    recoverPassword,
    getUser,
  },
} = authApi;
