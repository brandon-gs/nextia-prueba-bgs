import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, loginSchema } from "./LoginFormSchema";
import { FormInput } from "../../../../components";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useLoginMutation } from "../../Auth.Api";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<ILoginSchema> = (values) => {
    login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/protected");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
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
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <FormInput
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Grid>
    </AuthLayout>
  );
}
