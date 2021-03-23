import { instanceWithSSR } from "@/api";
import { Layout } from "@/components/Layout/layout";
import { Paginator } from "@/components/Patient/Paginator";
import { PatientList } from "@/components/Patient/PatientList";
import { IPatient, PatientPagination } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

interface Props {
  patientPagination: PatientPagination | null;
}

export default function Main({ patientPagination }: Props) {
  const { query, push } = useRouter();
  const currentPage = Number(getAsString(query.page) || 1);

  const setCurrentPage = (nextPage: number) => {
    push(
      {
        pathname: `/main`,
        query: {
          page: nextPage,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const { data: patientsData, error } = useSWR(
    `/api/patient/?page=${currentPage}`,
    {
      initialData: patientPagination,
    }
  );

  const pagesQuantity = patientPagination?.page_num ?? 0;

  return (
    <Layout title="Пациенты">
      <Head>
        <title>Пациенты</title>
      </Head>
      <Paginator
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {(!patientsData || error) && "Ошибка сервера"}
      {patientsData && <PatientList patients={patientsData.data} />}
      <Paginator
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");

  const currentPage = getAsString(ctx.query.page) || 1;

  let patientPagination: PatientPagination | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/patient/?page=${currentPage}`)
    .then((response: AxiosResponse) => {
      patientPagination = response?.data ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return {
    props: {
      patientPagination,
    },
  };
};
