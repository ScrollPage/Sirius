import { ErrorContainer } from '@/src/containers/error';
import React from 'react';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <ErrorContainer />
    </>
  );
}
