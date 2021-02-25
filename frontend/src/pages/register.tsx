import { RegisterContainer } from '@/src/containers/register';
import React from 'react';
import Head from 'next/head';
import { CommonContentTemplate, serializeScope } from '@/src/features/common';
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
  const { serializedScope } = await serializeScope(ctx);
  return {
    props: {
      initialState: serializedScope,
    },
  };
};
