import { IUser } from '@/types/user'
import { request } from './'
import FingerprintJS, { GetResult } from "@fingerprintjs/fingerprintjs";
export interface LoginData {
  username: string;
  password: string;
  fingerprint: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshData {
  refresh: string;
  fingerprint: string;
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

const fingerprint = () => {
  return FingerprintJS
    .load()
    .then((fp) => fp.get())
}

export const AuthService = {
  login, session, refresh, fingerprint
}