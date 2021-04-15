import { IExam } from '@/types/exam';
import { GetServerSidePropsContext } from 'next';
import { request } from './'

interface EyeData {
  makula?: string;
  periphery?: string;
  sight_sharpness?: number;
}
interface DznData {
  color?: string;
  border?: string;
}

const changeEye = (eyeId: number, data: EyeData) => {
  return request<void>('PATCH', `/api/info/${eyeId}/`, data)
}

const changeDzn = (dznId: number, data: DznData) => {
  return request<void>('PATCH', `/api/dzn/${dznId}/`, data)
}

const getByPatientId = (patientId: string, ctx: GetServerSidePropsContext) => {
  return request<IExam[]>("GET", `/api/patient/${patientId}/exam/`, {}, ctx)
}

export const ExamService = {
  changeEye,
  changeDzn,
  getByPatientId
}