import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PasswordIcon from "@mui/icons-material/Password";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput, Link } from "../../../../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoverPasswordMutation } from "../../Auth.Api";
import useListenFormErrors from "../../../../hook/useListenFormErrors";
import Button from "@mui/material/Button";
import {
  IResetPasswordSchema,
  resetPasswordSchema,
} from "./ResetPasswordSchema";

const ResetPassword = () => {
  const router = useRouter();

  const [recover, { isLoading, isError, error, isSuccess }] =
    useRecoverPasswordMutation();

  const methods = useForm<IResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { handleSubmit, setError } = methods;

  const onSubmitHandler: SubmitHandler<IResetPasswordSchema> = (values) => {
    const token = router.query.token;
    if (!token || typeof token !== "string") return;
    recover({ token, from: "reset-password", password: values.password });
  };

  useListenFormErrors<IResetPasswordSchema>({ error, isError, setError });

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

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
          <Typography component="h1" variant="h5">
            Nueva contraseña
          </Typography>
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
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
              />
              <FormInput
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                id="confirmPassword"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Actualizar contraseña
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    {"Iniciar sesión"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/forgot-password" variant="body2">
                    {"¿Quiere reenviar el correo?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Grid>
    </AuthLayout>
  );
};

export default ResetPassword;
