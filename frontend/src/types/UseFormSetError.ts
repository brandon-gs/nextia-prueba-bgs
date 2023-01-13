import { FieldValues, FieldPath, ErrorOption } from "react-hook-form";

export type UseFormSetError<TFieldValues extends FieldValues> = (
  name: FieldPath<TFieldValues>,
  error: ErrorOption,
  options?: {
    shouldFocus: boolean;
  }
) => void;
