import Head from "next/head";
import RegisterForm from "../modules/Auth/components/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <>
      <Head>
        <title>Brandon GS Nextia</title>
        <meta name="description" content="Login nextia brandon gs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterForm />
    </>
  );
}
