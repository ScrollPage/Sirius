import { AddDetectorForm } from '@/components/AddDetectorForm';
import { Layout } from '@/components/Layout';
import { ensureAuth } from '@/utils/ensureAuth';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';

interface AddProps {}

const Add = ({}: AddProps) => {
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
          py="8"
          px="4"
          borderRadius={6}
        >
          <Heading size="md" textAlign="center">
            {t('add:add-detector')}
          </Heading>
          <AddDetectorForm />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Add;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};
