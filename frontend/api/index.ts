import axios, { AxiosError, AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookie from 'js-cookie';
import { parseCookies } from '@/utils/parseCookies';

export const instance = (ctx?: GetServerSidePropsContext) => {
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

type Methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"

type Obj = { [key: string]: any };

export const request = <T,>(method: Methods, url: string, data: Obj, ctx?: GetServerSidePropsContext) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    console.debug('Request Successful!', response);
    return response.data;
  }

  const onError = (error: AxiosError) => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  return instance(ctx)
    .request({
      url,
      method,
      data
    })
    .then(onSuccess)
    .catch(onError);
}
