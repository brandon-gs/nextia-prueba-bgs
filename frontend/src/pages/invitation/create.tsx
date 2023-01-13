import Head from "next/head";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";
import NavigationTabs from "../../components/NavigationTabs/NavigationTabs";
import InvitationLayout from "../../components/InvitationLayout/InvitationLayout";
import InvitationCreateForm from "../../modules/Invitation/components/InvitationCreateFom/InvitationCreateForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvitationLayout title="Crear invitación">
        <InvitationCreateForm />
      </InvitationLayout>
    </>
  );
}
