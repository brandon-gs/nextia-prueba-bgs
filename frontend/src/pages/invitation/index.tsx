import Head from "next/head";
import React from "react";
import InvitationList from "../../modules/Invitation/components/InvitationList/InvitationList";
import InvitationLayout from "../../components/InvitationLayout/InvitationLayout";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvitationLayout title="Lista de invitaciones">
        <InvitationList />
      </InvitationLayout>
    </>
  );
}
