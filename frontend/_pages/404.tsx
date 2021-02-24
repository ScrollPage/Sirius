import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import useTranslation from 'next-translate/useTranslation';

export default function Custom404() {
  const { push } = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: '/' }, undefined, {
        shallow: true,
      });
    }, 3000);
  }, []);

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" h="full" w="full">
        <Head>
          <title>{t('error:error')}</title>
        </Head>
        <Box>
          <Heading>{t('error:page-not-found')}</Heading>
          <Text mt="5">
            {t('error:you-will-be-redirected-to-the-home-page')}
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
}
