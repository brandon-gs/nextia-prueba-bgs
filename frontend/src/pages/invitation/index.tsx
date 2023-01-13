import Head from "next/head";
import React from "react";
import InvitationList from "../../modules/Invitation/components/InvitationList/InvitationList";
import { Container, Grid, Typography } from "@mui/material";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ height: "100%", py: 5 }}>
        <Grid container>
          <Grid item xs>
            <Typography component="h1" variant="h4" sx={{ pb: 4 }}>
              Lista de invitaciones
            </Typography>
          </Grid>
          <Grid item>
            <ButtonLogout />
          </Grid>
        </Grid>
        <InvitationList />
      </Container>
    </>
  );
}