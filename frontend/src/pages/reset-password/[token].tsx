import Head from "next/head";
import ResetPassword from "../../modules/Auth/components/ResetPassword/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResetPassword />
    </>
  );
}
