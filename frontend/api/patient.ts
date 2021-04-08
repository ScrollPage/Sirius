import { Obj } from '@/utils/queryCode';
import { GetServerSidePropsContext } from 'next';
import { IPatient, PatientPagination } from '@/types/patient';
import { createApiWithQuery } from '@/utils/queryCode';
import { request } from './';

const getAll = (data: Obj, ctx?: GetServerSidePropsContext) => {
  return request<PatientPagination>("GET", createApiWithQuery("/api/patient/", data), {}, ctx)
}

const getById = (patientId: string, ctx?: GetServerSidePropsContext) => {
  return request<IPatient>("GET", `/api/patient/${patientId}/`, {}, ctx)
}

export const PatientService = {
  getAll, getById
}
