import { IExam } from '@/types/exam';
import { GetServerSidePropsContext } from 'next';
import { request } from './'
import { createApiWithQuery, Obj } from '@/utils/queryCode';
interface ChangeData {
  diagnosis: string
}

const change = (examId: number, data: ChangeData) => {
  return request<void>('PATCH', `/api/exam/${examId}/`, data)
}

const getByPatientId = (patientId: string, data: Obj, ctx: GetServerSidePropsContext) => {
  return request<IExam[]>("GET", createApiWithQuery(`/api/patient/${patientId}/exam/`, data), {}, ctx)
}

export const ExamService = {
  change, getByPatientId
}