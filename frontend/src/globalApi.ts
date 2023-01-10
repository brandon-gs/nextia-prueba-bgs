import { SerializedError } from "@reduxjs/toolkit";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { Path } from "react-hook-form";

export type IErrorResponse = {
  message: string;
  field: string;
};

export type IApiErrors = {
  data: IErrorResponse; // Add other type of errors
};

export type IValidationErrors<ISchema> = {
  data: {
    validationErrors: Array<{
      path: [string, Path<ISchema>];
      message: string;
    }>;
  };
};

export type IGlobalApiErrors<IValidation = any> =
  | SerializedError
  | IApiErrors
  | IValidationErrors<IValidation>
  | undefined;

export const globalApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
    mode: "cors",
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, IGlobalApiErrors, {}>,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
