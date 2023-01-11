import { FieldValues, UseFormSetError } from "react-hook-form";
import { IGlobalApiErrors } from "../globalApi";
import { useEffect } from "react";

type IUseListenFormErrors<ISchema> = {
  error: IGlobalApiErrors<ISchema>;
  isError: boolean;
  setError: UseFormSetError<ISchema & FieldValues>;
};

function useListenFormErrors<ISchema>({
  error,
  isError,
  setError,
}: IUseListenFormErrors<ISchema>) {
  useEffect(() => {
    if (
      isError &&
      error &&
      "data" in error &&
      "validationErrors" in error.data
    ) {
      error.data.validationErrors.forEach((issue, index) => {
        setError(
          issue.path[0],
          { message: issue.message },
          {
            shouldFocus: index === 0,
          }
        );
      });
    }
  }, [isError, error, setError]);
}

export default useListenFormErrors;
