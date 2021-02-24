import axios from "axios";
import { $token } from '@/src/features/common'

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const instance = axios.create({
  // baseURL: process.env.DB_HOST,
  baseURL: "http://localhost:8000",
})

export const request = <T,>(method: Method, url: string, data: any = {}) => {
  const token = $token.getState()
  const headers = token ? {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  } : {};

  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method,
      data: { ...data },
      headers
    }).then((response) => {
      resolve(response.data)
    }).catch(err => {
      reject(err.message);
    })
  })
}
