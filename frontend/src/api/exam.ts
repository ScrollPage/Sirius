import { request } from '@/src/features/common'

export interface ExamData {
  name: string;
  diagnosis: string;
  check_type: string;
  clinic: string;
}

export interface Exam extends ExamData {
  id: number;
  created: string;
  updated: string;
}

const addExam = (data: ExamData) => {
  return request('POST', `/api/exam/`, data)
}

const getExam = (examId: number) => {
  return request<Exam[]>('GET', `/api/exam/${examId}/`)
}

const changeExam = (examId: number, data: ExamData) => {
  return request('PATCH', `/api/exam/${examId}/`, data)
}

const deleteExam = (examId: number) => {
  return request('DELETE', `/api/exam/${examId}/`)
}

const getPatientExams = (patientId: number) => {
  return request<Exam[]>('GET', `/api/patient/${patientId}/exam/`)
}

export const examApi = {
  addExam,
  getExam,
  changeExam,
  deleteExam,
  getPatientExams,
}




