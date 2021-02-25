import { RegisterContainer } from '@/src/containers/register';
import React from 'react';
import Head from 'next/head';
import { fork, serialize } from 'effector';
import { app, CommonContentTemplate } from '@/src/features/common';
import { ensureAuth } from '@/src/features/common/lib/ensure';

export default function Register() {
  return (
    <CommonContentTemplate>
      <Head>
        <title>Регистрация</title>
      </Head>
      <RegisterContainer />
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
