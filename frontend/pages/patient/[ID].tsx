import deepEqual from "fast-deep-equal";
import { instance } from "@/api";
import { ExamList } from "@/components/Exam/ExamList";
import { ExamSearchForm } from "@/components/Exam/ExamSearchForm";
import { Layout } from "@/components/Layout/layout";
import { PatientCard } from "@/components/Patient/PatientCard";
import { IExam } from "@/types/exam";
import { IPatient } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { createApiWithQuery } from "@/utils/queryCode";
import { ExamService } from "@/api/exam";
import { PatientService } from "@/api/patient";
import { ConditionalList } from "@/components/UI/ConditionalList";

interface Props {
  patient: IPatient | null;
  exams: IExam[] | null;
}

export default function Patient({ exams, patient }: Props) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  const patientId = Number(getAsString(query.ID));
  const diagnosis = getAsString(query.diagnosis) || "";
  const type = getAsString(query.type) || "";

  const queries = useMemo(
    () => ({
      diagnosis__contains: diagnosis,
      sub_exams__check_type: type,
    }),
    [query]
  );

  const { data: examsData, error } = useSWR(
    createApiWithQuery(`/api/patient/${patientId}/exam/`, queries),
    {
      initialData: deepEqual(query, serverQuery) ? exams : undefined,
    }
  );

  return (
    <Layout title="Исследования пациента">
      <Head>
        <title>Пациент</title>
      </Head>
      {patient && <PatientCard patient={patient} />}
      <ExamSearchForm />
      <ConditionalList<IExam>
        list={examsData}
        error={error}
        renderError={() => <Text>Ошибка загрузки исследований</Text>}
        renderLoading={() => (
          <Flex justifyContent="center" h="400px" align="center">
            <Spinner size="xl" />
          </Flex>
        )}
        renderEmpty={() => <Text>Нет исследований по вашему запросу</Text>}
        renderExists={(list) => <ExamList exams={list} />}
      />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");
  const patientId = getAsString(ctx.query.ID);
  const diagnosis = getAsString(ctx.query.diagnosis);
  const type = getAsString(ctx.query.type);

  const queries = {
    diagnosis__contains: diagnosis,
    sub_exams__check_type: type,
  };

  let exams: IExam[] | null = null;
  await ExamService.getByPatientId(patientId as string, queries, ctx)
    .then((response) => (exams = response))
    .catch((error: AxiosError) => {
      console.log(error);
    });

  let patient: IPatient | null = null;
  await PatientService.getById(patientId as string, ctx)
    .then((response) => (patient = response))
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return {
    props: {
      patient,
      exams,
    },
  };
};
