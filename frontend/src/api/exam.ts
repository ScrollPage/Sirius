import { request } from '@/src/features/common'

export interface ExamData {
  name: string;
  diagnosis: string;
  check_type: string;
  clinic: string;
}

export interface Exam extends ExamData {
  id: number;
  created: Date;
  updated: Date;
}

export const addExam = (data: ExamData) => {
  return request('POST', `/api/exam/`, data)
}

export const getExam = (examId: number) => {
  return request<Exam[]>('GET', `/api/exam/${examId}/`)
}

export const changeExam = (examId: number, data: ExamData) => {
  return request('PATCH', `/api/exam/${examId}/`, data)
}

export const deleteExam = (examId: number) => {
  return request('DELETE', `/api/exam/${examId}/`)
}

export const getPatientExams = (patientId: number) => {
  return request<Exam[]>('GET', `/api/patient/${patientId}/exam/`)
}





