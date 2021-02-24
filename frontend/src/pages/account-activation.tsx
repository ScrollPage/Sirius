import React from 'react';
import Head from 'next/head';
import { ActivateContainer } from '@/src/containers/activate';

export default function Login() {
  return (
    <>
      <Head>
        <title>Активация</title>
      </Head>
      <ActivateContainer />
    </>
  );
}
