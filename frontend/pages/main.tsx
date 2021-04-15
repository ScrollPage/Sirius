import deepEqual from "fast-deep-equal";
import { PatientService } from "@/api/patient";
import { Layout } from "@/components/Layout/layout";
import { Paginator } from "@/components/Patient/Paginator";
import { PatientList } from "@/components/Patient/PatientList";
import { PatientSearchForm as SearchForm } from "@/components/Patient/PatientSearchForm";
import { IPatient, PatientPagination } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { Text } from "@chakra-ui/layout";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { createApiWithQuery, createClearObject } from "@/utils/queryCode";
import { ConditionalList } from "@/components/UI/ConditionalList";

interface Props {
  patientPagination: PatientPagination | null;
}

export default function Main({ patientPagination }: Props) {
  const { query, push } = useRouter();
  const [serverQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(getAsString(query.page ?? "1"))
  );
  const [pagesQuantity, setPagesQuantity] = useState(
    patientPagination?.page_num ?? 0
  );
  const name = getAsString(query.name);
  const lower = getAsString(query.lower);
  const greater = getAsString(query.greater);
  const diagnosis = getAsString(query.diagnosis);
  const type = getAsString(query.type);

  useEffect(() => {
    push(
      {
        pathname: `/main`,
        query: createClearObject({
          page: currentPage,
          name,
          lower,
          greater,
          diagnosis,
          type,
        }),
      },
      undefined,
      { shallow: true }
    );
  }, [currentPage]);

  const queriesForApi = useMemo(
    () => ({
      page: currentPage,
      name__contains: name,
      birth_date__lte: lower,
      birth_date__gte: greater,
      exams__diagnosis__description__contains: diagnosis,
      exams__sub_exams__check_type__contains: type,
    }),
    [query]
  );

  const { data: patientsData, error } = useSWR(
    createApiWithQuery("/api/patient/", queriesForApi),
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

  const memSetCurrentPage = useCallback(
    (page: number) => setCurrentPage(page),
    [currentPage, setCurrentPage]
  );

  return (
    <Layout title="Пациенты">
      <Head>
        <title>Пациенты</title>
      </Head>
      <SearchForm />
      <Paginator
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        setCurrentPage={memSetCurrentPage}
      >
        <ConditionalList<IPatient>
          list={patientsData?.data}
          error={error}
          renderError={() => <Text>Ошибка загрузки пациентов</Text>}
          renderEmpty={() => <Text>Нет пациентов по вашему запросу</Text>}
          renderExists={(list) => <PatientList patients={list} />}
        />
      </Paginator>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");

  const queriesForApi = {
    page: getAsString(ctx.query.page),
    name__contains: getAsString(ctx.query.name),
    birth_date__lte: getAsString(ctx.query.lower),
    birth_date__gte: getAsString(ctx.query.greater),
    exams__diagnosis__description__contains: getAsString(ctx.query.diagnosis),
    exams__sub_exams__check_type__contains: getAsString(ctx.query.type),
  };

  let patientPagination: PatientPagination | null = null;
  await PatientService.getAll(queriesForApi, ctx)
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
