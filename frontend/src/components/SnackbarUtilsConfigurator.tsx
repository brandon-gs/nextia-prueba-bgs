import React from "react";
import { useSnackbar, OptionsObject, WithSnackbarProps } from "notistack";

let useSnackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const SnackbarUtils = {
  success(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: "success" });
  },
  warning(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: "warning" });
  },
  info(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: "info" });
  },
  error(msg: string, options: OptionsObject = {}) {
    this.toast(msg, { ...options, variant: "error" });
  },
  toast(msg: string, options: OptionsObject = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
  close(key: string) {
    useSnackbarRef.closeSnackbar(key);
  },
};
