import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { parseCookies } from './parseCookies';

type typeOfRoutes = 'public' | 'auth' | 'private';

export const ensureAuth = (ctx: GetServerSidePropsContext<ParsedUrlQuery>, route: typeOfRoutes) => {
  if (route === 'public') {
    return;
  }
  const token = parseCookies(ctx.req).accessToken;
  if (route === 'private') {
    if (!token) {
      ctx.res.writeHead(302, { Location: '/?redirected=true' });
      ctx.res.end();
    }
  }
  if (route === 'auth') {
    if (token) {
      ctx.res.writeHead(302, { Location: '/main?redirected=true' });
      ctx.res.end();
    }
  }
  return;
}
