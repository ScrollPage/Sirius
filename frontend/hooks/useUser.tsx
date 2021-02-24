import Cookie from 'js-cookie';
import { IProtection } from '@/types/protection';

export const useUser = () => {
  const isAuth = Cookie.get('token') ? true : false;
  const userName = Cookie.get('userName') ?? '';
  const protection: IProtection = {
    isAuth,
    userName,
  };
  return protection;
};
