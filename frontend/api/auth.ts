import { IUser } from '@/types/user'
import { request } from './'

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string
}

export interface RefreshData {
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}

const login = (data: LoginData) => {
  return request<LoginResponse>("POST", '/auth/jwt/create/', data)
}

const session = () => {
  return request<IUser>("GET", '/auth/users/me/', {})
}

const refresh = (data: RefreshData) => {
  return request<RefreshResponse>("POST", '/auth/jwt/refresh/', data)
}

export const AuthService = {
  login, session, refresh
}