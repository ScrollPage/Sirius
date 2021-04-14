import { login } from "@/actions/auth";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Layout } from "@/components/Layout/layout";
import { ensureAuth } from "@/utils/ensure";
import { Container } from "@chakra-ui/layout";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { LoginFormValues } from "@/components/Auth/LoginForm";
import { useToast } from "@chakra-ui/toast";

export default function Login() {
  const toast = useToast();
  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.username, values.password);
    } catch (e) {
      if (e.status === 401) {
        toast({
          title: "Вы ввели неверные данные",
          status: "warning",
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Ошибка входа",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Layout title="Вход">
      <Head>
        <title>Вход</title>
      </Head>
      <Container maxW="container.sm">
        <LoginForm handleSubmit={onSubmit} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "auth");
  return {
    props: {},
  };
};
