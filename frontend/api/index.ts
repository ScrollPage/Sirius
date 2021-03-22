import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookie from 'js-cookie';
import { parseCookies } from '@/utils/parseCookies';

export const instance = () => {
  const token = Cookie.get('token') ?? "";
  const headers = token ? {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  } : {};
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers
  })
}

export const instanceWithSSR = (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const token = parseCookies(ctx.req).token;
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}