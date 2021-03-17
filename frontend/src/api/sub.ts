import { request } from '@/src/features/common'

export interface SubData {
  check_type: string;
  exam: number;
}

export interface Sub extends SubData {
  id: number;
  created: Date;
  updated: Date;
}

export const addSub = (data: SubData) => {
  return request('POST', `/api/sub/`, data)
}

export const getSub = (subId: number) => {
  return request<Sub[]>('GET', `/api/sub/${subId}/`)
}

export const changeSub = (subId: number, data: SubData) => {
  return request('PATCH', `/api/sub/${subId}/`, data)
}

export const deleteSub = (subId: number) => {
  return request('DELETE', `/api/sub/${subId}/`)
}

export const getExamSubs = (examId: number) => {
  return request<Sub[]>('GET', `/api/exam/${examId}/sub/`)
}
