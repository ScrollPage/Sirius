import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookie from 'js-cookie';
import { parseCookies } from '@/utils/parseCookies';

export const instance = (ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
  let accessToken
  if (ctx) {
    accessToken = parseCookies(ctx.req).accessToken
  } else {
    accessToken = Cookie.get('accessToken') ?? "";
  }
  const headers = accessToken ? {
    'Content-Type': 'application/json',
    Authorization: `Token ${accessToken}`
  } : {};
  return axios.create({
    baseURL: process.env.DB_HOST,
    headers
  })
}
