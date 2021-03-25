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
import { useState } from "react";
import { examUrl } from "@/utils/examUrl";

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

  const { data: examsData, error } = useSWR(
    examUrl(patientId, diagnosis, type),
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
      {error ? (
        <Text>Ошибка загрузки исследований</Text>
      ) : !examsData ? (
        <Flex justifyContent="center" h="400px" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : examsData.length === 0 ? (
        <Text>Нет исследований по вашему запросу</Text>
      ) : (
        <ExamList exams={examsData} />
      )}
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");
  const patientId = Number(getAsString(ctx.query.ID));

  const diagnosis = getAsString(ctx.query.diagnosis) || "";
  const type = getAsString(ctx.query.type) || "";

  let exams: IExam[] | null = null;
  await instance(ctx)
    .get(examUrl(patientId, diagnosis, type))
    .then((response: AxiosResponse) => {
      exams = response?.data ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  let patient: IPatient | null = null;
  await instance(ctx)
    .get(`/api/patient/${patientId}/`)
    .then((response: AxiosResponse) => {
      patient = response?.data ?? null;
    })
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
