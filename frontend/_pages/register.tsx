import { Text, Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { RegisterForm } from '../components/RegisterForm';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import useTranslation from 'next-translate/useTranslation';
import { ensureRedirectToData } from '@/utils/ensureAuth';
import { GetServerSideProps } from 'next';

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Flex
        minWidth="full"
        alignItems="center"
        justifyContent="center"
        height="full"
      >
        <Box
          mt="70px"
          width="500px"
          borderWidth={1}
          boxShadow="xl"
          p="4"
          borderRadius={6}
        >
          <Heading textAlign="center" size="md" py="1">
            {t('register:register-your-account')}
          </Heading>
          <Flex justifyContent="center">
            <Link href="/login">
              <ChakraLink fontSize="xs" mt="2" textAlign="center">
                <Text color="purple.500">{t('register:or-log-in-now')}</Text>
              </ChakraLink>
            </Link>
          </Flex>
          <RegisterForm />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  ensureRedirectToData(ctx);
  return {
    props: {},
  };
};
