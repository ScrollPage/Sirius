import React from 'react';
import Head from 'next/head';
import { CabinetContainer } from '@/src/containers/cabinet';
import { allSettled, fork, serialize } from 'effector';
import {
  $token,
  app,
  CommonContentTemplate,
  loadSession,
  TOKEN_ID,
} from '@/src/features/common';
import { parseCookies } from '@/src/features/common/lib/parseCookies';
import { GetServerSideProps } from 'next';
import { ensureAuth } from '@/src/features/common/lib/ensure';

export default function Cabinet() {
  return (
    <CommonContentTemplate>
      <Head>
        <title>Кабинет</title>
      </Head>
      <CabinetContainer />
    </CommonContentTemplate>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialState: any;
}> = async (ctx) => {
  ensureAuth(ctx, 'private');
  const scope = fork(app, {
    values: new Map([[$token, parseCookies(ctx.req)?.[TOKEN_ID]]]),
  });
  await allSettled(loadSession, { scope });
  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
