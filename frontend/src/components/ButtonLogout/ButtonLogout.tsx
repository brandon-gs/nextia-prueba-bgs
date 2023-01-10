import { Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useLogoutMutation } from "../../modules/Auth/Auth.Api";
import { useRouter } from "next/router";

const ButtonLogout = () => {
  const router = useRouter();
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  return (
    <Button onClick={handleLogout} disabled={isLoading} variant="contained">
      Cerrar sesión
    </Button>
  );
};

export default ButtonLogout;
