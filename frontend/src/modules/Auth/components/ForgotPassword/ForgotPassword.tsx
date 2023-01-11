import React from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { useForgotPasswordMutation } from "../../Auth.Api";
import {
  IForgotPasswordSchema,
  forgotPasswordSchema,
} from "./ForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Link } from "../../../../components";
import useListenFormErrors from "../../../../hook/useListenFormErrors";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();

  const methods = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { handleSubmit, setError } = methods;

  const onSubmitHandler: SubmitHandler<IForgotPasswordSchema> = (values) => {
    forgotPassword(values);
  };

  useListenFormErrors<IForgotPasswordSchema>({ error, isError, setError });

  return (
    <AuthLayout>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Recuperar contraseña
          </Typography>
          <Typography component="p" variant="body2" sx={{ mb: 2 }}>
            {isSuccess
              ? "Ya puedes cerrar está pestaña y continuar con el proceso en tu correo electrónico"
              : "Se enviará un correo electrónico a tu cuenta para que puedas restablecer tu contraseña."}
          </Typography>
          {!isSuccess && (
            <FormProvider {...methods}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmitHandler)}
                sx={{ mt: 1 }}
              >
                <FormInput
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  Recuperar contraseña
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"¿No tienes una cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <Typography></Typography>
            </FormProvider>
          )}
        </Box>
      </Grid>
    </AuthLayout>
  );
};

export default ForgotPassword;
