import deepEqual from "fast-deep-equal";
import { PatientService } from "@/api/patient";
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
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import {
  createApiWithQuery,
  encodeQueryObjectToString,
} from "@/utils/queryCode";

interface Props {
  patientPagination: PatientPagination | null;
}

export default function Main({ patientPagination }: Props) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(getAsString(query.page) ?? "1")
  );
  const [pagesQuantity, setPagesQuantity] = useState(
    patientPagination?.page_num ?? 0
  );
  const name = getAsString(query.name);
  const lower = yearsToDate(getAsString(query.lower));
  const greater = yearsToDate(getAsString(query.greater));

  useEffect(() => {
    window.history.replaceState(
      null,
      "Change current page",
      encodeQueryObjectToString({
        page: currentPage,
        name,
        lower,
        greater,
      })
    );
  }, [currentPage]);

  const queries = useMemo(
    () => ({
      page: currentPage,
      name__contains: name,
      birth_date__lte: lower,
      birth_date__gte: greater,
    }),
    [query]
  );

  const { data: patientsData, error } = useSWR(
    createApiWithQuery("/api/patient/", queries),
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
        currentPage={currentPage}
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

  const queries = {
    page: currentPage,
    name__contains: name,
    birth_date__lte: lower,
    birth_date__gte: greater,
  };

  let patientPagination: PatientPagination | null = null;
  await PatientService.getAll(queries, ctx)
    .then((response) => (patientPagination = response))
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      patientPagination,
    },
  };
};
