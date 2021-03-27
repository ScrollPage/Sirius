import { request } from './'

interface ChangeData {
  diagnosis: string
}

const change = (examId: number, data: ChangeData) => {
  return request<void>('PATCH', `/api/exam/${examId}/`, data)
}

export const ExamServece = {
  change
}