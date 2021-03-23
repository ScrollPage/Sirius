import deepEqual from "fast-deep-equal";
import { instanceWithSSR } from "@/api";
import { Layout } from "@/components/Layout/layout";
import { Paginator } from "@/components/Patient/Paginator";
import { PatientList } from "@/components/Patient/PatientList";
import { SearchForm } from "@/components/UI/Search";
import { PatientPagination } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { yearsToDate } from "@/utils/yearsToDate";
import { SpinnerIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
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
  const [serverQuery] = useState(query);
  const currentPage = Number(getAsString(query.page || "1"));
  const name = getAsString(query.name) || "";
  const lower = yearsToDate(Number(getAsString(query.lower) || "0"));
  const greater = yearsToDate(Number(getAsString(query.greater) || "200"));

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
    patientUrl(currentPage, name, lower, greater),
    {
      initialData: deepEqual(query, serverQuery)
        ? patientPagination
        : undefined,
    }
  );

  const pagesQuantity = patientsData?.page_num ?? 0;

  return (
    <Layout title="Пациенты">
      <Head>
        <title>Пациенты</title>
      </Head>
      <SearchForm />
      <Paginator
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {error ? (
        <Text>Ошибка загрузки пациентов</Text>
      ) : !patientsData ? (
        <Flex justifyContent="center" h="400px" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : patientsData.data.length === 0 ? (
        <Text>Нет пациентов по вашему запросу</Text>
      ) : (
        <PatientList patients={patientsData.data} />
      )}
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

  const currentPage = Number(getAsString(ctx.query.page || "1"));
  const name = getAsString(ctx.query.name) || "";
  const lower = yearsToDate(Number(getAsString(ctx.query.lower) || "0"));
  const greater = yearsToDate(Number(getAsString(ctx.query.greater) || "200"));

  let patientPagination: PatientPagination | null = null;
  await instanceWithSSR(ctx)
    .get(patientUrl(currentPage, name, lower, greater))
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

const patientUrl = (
  currentPage: number,
  name: string,
  lower: string,
  greater: string
) =>
  `/api/patient/?page=${currentPage}${
    name ? `&name__contains=${name}` : ""
  }&birth_date__lte=${lower}&birth_date__gte=${greater}`;
