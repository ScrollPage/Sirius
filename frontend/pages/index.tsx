import { LoginForm } from "@/components/Auth/LoginForm";
import { Layout } from "@/components/Layout/layout";
import { ensureAuth } from "@/utils/ensure";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Login() {
  return (
    <Layout title="Вход">
      <Head>
        <title>Вход</title>
      </Head>
      <LoginForm />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "auth");
  return {
    props: {},
  };
};
