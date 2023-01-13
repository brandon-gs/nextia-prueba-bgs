import { useRef, type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  MobileDateTimePicker,
  type MobileDateTimePickerProps,
} from "@mui/x-date-pickers";
import { TextField, buttonBaseClasses } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import { add, format } from "date-fns";

type IFormInputDateProps = {
  name: string;
} & Partial<Omit<MobileDateTimePickerProps<any, any>, "onChange">>;

const FormInputDate: FC<IFormInputDateProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const date = new Date();
  const hoursAfter = add(date, { hours: name === "endDate" ? 1 : 0 });
  // const today = useRef(format(hoursAfter, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
  const minDate = useRef(hoursAfter);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={hoursAfter}
      render={({ field }) => (
        <LocalizationProvider
          adapterLocale={es}
          dateAdapter={AdapterDateFns}
          localeText={{
            cancelButtonLabel: "Cancelar",
            okButtonLabel: "Seleccionar",
          }}
        >
          <MobileDateTimePicker
            {...otherProps}
            {...field}
            minDateTime={minDate.current}
            renderInput={(params) => (
              <TextField
                margin="normal"
                required
                fullWidth
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "día/mes/año",
                }}
                error={!!errors[name]}
                helperText={
                  errors[name] ? (errors[name]?.message as string) : ""
                }
              />
            )}
            DialogProps={{
              PaperProps: {
                sx: {
                  pb: 1,
                  [`& .${buttonBaseClasses.root}`]: {
                    mt: 2,
                    lineHeight: "1.5rem",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
export default FormInputDate;
