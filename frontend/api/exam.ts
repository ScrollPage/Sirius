import { IExam } from '@/types/exam';
import { GetServerSidePropsContext } from 'next';
import { request } from './'
interface ChangeData {
  diagnosis: string
}

const change = (examId: number, data: ChangeData) => {
  return request<void>('PATCH', `/api/exam/${examId}/`, data)
}

const getByPatientId = (patientId: string, ctx: GetServerSidePropsContext) => {
  return request<IExam[]>("GET", `/api/patient/${patientId}/exam/`, {}, ctx)
}

export const ExamService = {
  change, getByPatientId
}