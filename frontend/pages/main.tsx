import deepEqual from "fast-deep-equal";
import { instance } from "@/api";
import { Layout } from "@/components/Layout/layout";
import { Paginator } from "@/components/Patient/Paginator";
import { PatientList } from "@/components/Patient/PatientList";
import { PatientSearchForm as SearchForm } from "@/components/Patient/PatientSearchForm";
import { PatientPagination } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { yearsToDate } from "@/utils/yearsToDate";
import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { createApiWithQuery, createClearObject } from "@/utils/queryCode";

interface Props {
  patientPagination: PatientPagination | null;
}

export default function Main({ patientPagination }: Props) {
  const { query, push } = useRouter();
  const [serverQuery] = useState(query);
  const [pagesQuantity, setPagesQuantity] = useState(
    patientPagination?.page_num ?? 0
  );
  const currentPage = getAsString(query.page);
  const name = getAsString(query.name);
  const lower = yearsToDate(getAsString(query.lower));
  const greater = yearsToDate(getAsString(query.greater));

  const setCurrentPage = (nextPage: number) => {
    console.log(query);
    const clearObject = createClearObject({
      page: nextPage,
      name,
      lower,
      greater,
    });
    push(
      {
        pathname: `/main`,
        query: clearObject,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const { data: patientsData, error } = useSWR(
    createApiWithQuery("/api/patient/", {
      page: currentPage,
      name__contains: name,
      birth_date__lte: lower,
      birth_date__gte: greater,
    }),
    {
      initialData: deepEqual(query, serverQuery)
        ? patientPagination
        : undefined,
    }
  );

  useEffect(() => {
    if (patientsData?.page_num !== undefined) {
      setPagesQuantity(patientsData?.page_num ?? 0);
    }
  }, [patientsData?.page_num]);

  return (
    <Layout title="Пациенты">
      <Head>
        <title>Пациенты</title>
      </Head>
      <SearchForm />
      <Paginator
        pagesQuantity={pagesQuantity}
        currentPage={Number(currentPage ?? 1)}
        setCurrentPage={setCurrentPage}
      >
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
      </Paginator>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");

  const currentPage = getAsString(ctx.query.page);
  const name = getAsString(ctx.query.name);
  const lower = yearsToDate(getAsString(ctx.query.lower));
  const greater = yearsToDate(getAsString(ctx.query.greater));

  let patientPagination: PatientPagination | null = null;
  await instance(ctx)
    .get(
      createApiWithQuery("/api/patient/", {
        page: currentPage,
        name__contains: name,
        birth_date__lte: lower,
        birth_date__gte: greater,
      })
    )
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
