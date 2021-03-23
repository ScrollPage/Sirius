import { instanceWithSSR } from "@/api";
import { Layout } from "@/components/Layout/layout";
import { PatientList } from "@/components/Patient/PatientList";
import { IPatient } from "@/types/patient";
import { ensureAuth } from "@/utils/ensure";
import { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface Props {
  patients: IPatient[] | null;
}

export default function Main({ patients }: Props) {
  return (
    <Layout title="Пациенты">
      <Head>
        <title>Пациенты</title>
      </Head>
      {!patients && "Ошибка сервера"}
      {patients && <PatientList patients={patients} />}
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  ensureAuth(ctx, "private");

  let patients: IPatient[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/patient`)
    .then((response: AxiosResponse) => {
      patients = response?.data ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return {
    props: {
      patients,
    },
  };
};
