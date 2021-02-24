import { request } from '@/src/features/common'
import { IUser } from '../types/user';

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  is_steakholder: boolean;
  company: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
}

const signup = (data: RegisterData) => {
  return request<void>("POST", '/auth/users/', {
    ...data
  });
}

const login = (data: LoginData) => {
  return request<LoginResponse>("POST", '/auth/jwt/create/', {
    ...data
  });
}

const activate = (token: string) => {
  return request("POST", '/api/activate/', { token });
}

const getInfo = () => {
  return request<IUser>("GET", "/api/initiative/me/");
}

export const accountApi = {
  signup,
  login,
  activate,
  getInfo
}