import { request } from '@/src/features/common'

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  sex: string | number;
}

export interface Register extends RegisterData {
  id: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
}

const signup = (data: RegisterData) => {
  return request<void>("POST", '/auth/users/', data);
}

const login = (data: LoginData) => {
  return request<LoginResponse>("POST", '/auth/jwt/create/', data);
}

const getInfo = () => {
  return request<Register>("GET", "/auth/users/me/");
}

export const accountApi = {
  signup,
  login,
  getInfo
}