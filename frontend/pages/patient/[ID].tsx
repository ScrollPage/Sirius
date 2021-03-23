import { instanceWithSSR } from "@/api";
import { ExamList } from "@/components/Exam/ExamList";
import { Layout } from "@/components/Layout/layout";
import { PatientCard } from "@/components/Patient/PatientCard";
import { IExam } from "@/types/exam";
import { IPatient } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { getAsString } from "@/utils/getAsString";
import { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

interface Props {
  patient: IPatient | null;
  exams: IExam[] | null;
}

export default function Patient({ exams, patient }: Props) {
  const { query } = useRouter();
  const patientId = getAsString(query.ID);

  const { data: examsData, error } = useSWR(`/api/patient/${patientId}/exam/`, {
    initialData: exams,
  });

  return (
    <Layout title="Исследования пациента">
      <Head>
        <title>Пациент</title>
      </Head>
      {patient && <PatientCard patient={patient} />}
      {(!examsData || error) && "Ошибка сервера"}
      {examsData && <ExamList exams={examsData} />}
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");
  const patientId = getAsString(ctx.query.ID);

  let exams: IExam[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/patient/${patientId}/exam/`)
    .then((response: AxiosResponse) => {
      exams = response?.data ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  let patient: IPatient | null = null;
  await instanceWithSSR(ctx)
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
