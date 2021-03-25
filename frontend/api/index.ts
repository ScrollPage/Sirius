import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookie from 'js-cookie';
import { parseCookies } from '@/utils/parseCookies';

export const instance = (ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
  let token
  if (ctx) {
    token = parseCookies(ctx.req).accessToken
  } else {
    token = Cookie.get('accessToken') ?? "";
  }
  const headers = token ? {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  } : {};
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers
  })
}
