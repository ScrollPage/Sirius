import { LoginContainer } from '@/src/containers/login';
import React from 'react';
import Head from 'next/head';
import { fork, serialize } from 'effector';
import { app, CommonContentTemplate } from '@/src/features/common';
import { ensureAuth } from '@/src/features/common/lib/ensure';

export default function Login() {
  return (
    <CommonContentTemplate>
      <Head>
        <title>Логин</title>
      </Head>
      <LoginContainer />
    </CommonContentTemplate>
  );
}

export const getServerSideProps = async (ctx) => {
  ensureAuth(ctx, 'auth');
  const scope = fork(app);
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
