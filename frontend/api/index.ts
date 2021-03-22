import { ParsedUrlQuery } from 'querystring';
import cookies from 'next-cookies';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookie from 'js-cookie';

export const instanceWithOutHeaders = axios.create({
  baseURL: process.env.DB_HOST,
  headers: undefined
})

export const instance = () => {
  const token = Cookie.get('token') ?? "";
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export const instanceWithSSR = (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const token = cookies(ctx)?.token ?? "";
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
} 