import Head from "next/head";
import React from "react";
import InvitationLayout from "../../../components/InvitationLayout/InvitationLayout";
import { useRouter } from "next/router";
import InvitationDetails from "../../../modules/Invitation/components/InvitationDetails/InvitationDetails";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvitationLayout title="Detalles de invitación">
        {typeof router.query.id === "string" && (
          <InvitationDetails id={router.query.id} />
        )}
      </InvitationLayout>
    </>
  );
}
