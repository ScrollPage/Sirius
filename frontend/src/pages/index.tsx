import { fork, serialize } from 'effector';
import { app, CommonContentTemplate } from '@/src/features/common';
import { ensureAuth } from '@/src/features/common/lib/ensure';
import Head from 'next/head';
import { HomeContainer } from '../containers/home';

export default function Home() {
  return (
    <CommonContentTemplate>
      <Head>
        <title>Главная</title>
        <meta
          name="description"
          content="Наш сайт готов предложить вам лучший сервис по заходу в личный кабнет и выходе из него"
        />
      </Head>
      <HomeContainer />
    </CommonContentTemplate>
  );
}

export const getServerSideProps = async (ctx) => {
  ensureAuth(ctx, 'public');
  const scope = fork(app);
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
