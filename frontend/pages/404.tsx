import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout/layout";

export default function Custom404() {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: "/" }, undefined, {
        shallow: true,
      });
    }, 3000);
  }, []);

  return (
    <Layout title="Страница не найдена">
      <Flex justifyContent="center" alignItems="center" h="full" w="full">
        <Head>
          <title>404</title>
        </Head>
        <Box>
          <Text mt="5">Вы будуте перенаправлены на главную страницу</Text>
        </Box>
      </Flex>
    </Layout>
  );
}
