import { Layout } from "@/components/Layout/layout";
import { ensureAuth } from "@/utils/ensure";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Login() {
  return (
    <Layout title="Главная">
      <Head>
        <title>Главная</title>
      </Head>
      Mina
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");
  return {
    props: {},
  };
};
