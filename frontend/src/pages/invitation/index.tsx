import Head from "next/head";
import React from "react";
import InvitationList from "../../modules/Invitation/components/InvitationList/InvitationList";
import InvitationLayout from "../../components/InvitationLayout/InvitationLayout";
import { useGetUserQuery } from "../../modules/Auth/Auth.Api";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

export default function ListInvitationsPage() {
  useGetUserQuery();
  const { user } = useSelector((state: AppState) => state);

  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvitationLayout
        title={`Lista de invitaciones de ${user.firstname || "..."}`}
      >
        <InvitationList />
      </InvitationLayout>
    </>
  );
}
