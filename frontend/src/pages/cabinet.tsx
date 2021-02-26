import React from 'react';
import Head from 'next/head';
import { CabinetContainer } from '@/src/containers/cabinet';
import { CommonContentTemplate, useCheckAuth } from '@/src/features/common';
import { serializeScope } from '@/src/features/common';
import { GetServerSideProps } from 'next';
import { ensureAuth } from '@/src/features/common/lib/ensure';
import { loadExamsHandler } from '../containers/cabinet/model';

export default function Cabinet() {
  useCheckAuth();
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
  const { serializedScope } = await serializeScope(ctx, [
    { unit: loadExamsHandler },
  ]);
  return {
    props: {
      initialState: serializedScope,
    },
  };
};
