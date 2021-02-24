import { IUser } from "@/src/types/user";
import { request } from '@/src/features/common'

const getAll = () => {
  return request<IUser[]>("GET", '/api/test/');
}

export const userApi = {
  getAll
}