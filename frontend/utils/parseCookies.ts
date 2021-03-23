import cookie from 'cookie';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { IncomingMessage } from 'node:http';

export function parseCookies(req: IncomingMessage & { cookies: NextApiRequestCookies }) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}