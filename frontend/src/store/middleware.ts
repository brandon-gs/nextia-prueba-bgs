import Router from "next/router";
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import { SnackbarUtils } from "../components/SnackbarUtilsConfigurator";

const SNACKBAR_RTK_MIDDLEWARE = {
  success: "rtk_middleware_api_success_message",
  error: "rtk_middleware_api_error_message",
};
/**
 * Show snackbar message and
 * Also clear the user session if the api response with a 401 code
 */
export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line no-unused-vars
  () => (next) => async (action) => {
    const { payload } = action;
    // Handle sucess request
    if (isFulfilled(action)) {
      if (!payload) return next(action);
      const sucessMessage = payload.message ?? payload.data?.message;
      if (typeof sucessMessage === "string") {
        SnackbarUtils.close(SNACKBAR_RTK_MIDDLEWARE.success);
        SnackbarUtils.success(sucessMessage, {
          preventDuplicate: true,
          key: SNACKBAR_RTK_MIDDLEWARE.success,
        });
      }
    }

    // handle api errors
    if (isRejectedWithValue(action)) {
      if (!payload || !payload.data) return next(action);

      SnackbarUtils.close(SNACKBAR_RTK_MIDDLEWARE.error);
      // redirect to login page
      if (payload.originalStatus === 401) {
        await Router.push("/");
        return;
      }

      const errorMessage =
        typeof payload.data === "string"
          ? payload.data
          : payload.data?.message
          ? payload.data.message
          : payload.data.validationErrors
          ? "Verifica que los datos sean correctos"
          : "Error al conectar con el servidor";

      SnackbarUtils.error(errorMessage, {
        preventDuplicate: true,
        key: SNACKBAR_RTK_MIDDLEWARE.error,
      });
    }

    return next(action);
  };
