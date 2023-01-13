import React, { useEffect } from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  IRegisterSchema,
  IRegisterSchemaFormated,
  registerSchema,
} from "./RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Link } from "../../../../components";
import Button from "@mui/material/Button";
import { useRegisterMutation } from "../../Auth.Api";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const methods = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, setError } = methods;

  const onSubmitHandler: SubmitHandler<IRegisterSchema> = (values) => {
    const numberDepartment = parseInt(values.department);
    if (isNaN(numberDepartment)) {
      setError("department", { message: "Debes ingresar un número válido" });
      return;
    }
    const newUser: IRegisterSchemaFormated = {
      ...values,
      department: parseInt(values.department),
    };
    register(newUser);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/invitation");
    }
  }, [isSuccess, router]);

  return (
    <AuthLayout>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 3,
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
            Crear cuenta
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
                id="firstname"
                label="Nombre(s)"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />
              <FormInput
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Apellido(s)"
                name="lastname"
                autoComplete="lastname"
              />
              <FormInput
                margin="normal"
                required
                fullWidth
                id="department"
                label="Número de departamento"
                name="department"
                autoComplete="department"
              />
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
                Registrarse
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"¿Ya tienes una cuenta? Inicia sesión"}
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

export default RegisterForm;
