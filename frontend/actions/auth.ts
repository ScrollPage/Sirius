import Cookie from 'js-cookie';
import Router from 'next/router';
import { AuthService } from '@/api/auth';

const initExpirationDate = () => {
  const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);
  Cookie.set('expirationDate', expirationDate);
  checkAuthTimeout(24 * 3600 * 1000)
}

export const login = async (username: string, password: string) => {
  return await
    AuthService
      .fingerprint()
      .then(({ visitorId }) => AuthService
        .login({ username, password, fingerprint: visitorId }))
      .then(({ access, refresh }) => {
        initExpirationDate()
        Cookie.set('accessToken', access);
        Cookie.set('refreshToken', refresh);
      })
      .then(() => authInfo())
};

const authInfo = async () => {
  return await AuthService
    .session()
    .then(({ id, username, email }) => {
      Cookie.set('userId', String(id));
      Cookie.set('userName', username);
      Cookie.set('email', email);
      Router.push({ pathname: '/main' }, undefined, { shallow: false });
      console.log('Информация успешно занесена в куки');
    })
}

export const logout = () => {
  Router.push({ pathname: '/' }, undefined, { shallow: false });
  Cookie.remove('accessToken');
  Cookie.remove('refreshToken');
  Cookie.remove('expirationDate');
  Cookie.remove('userId');
  Cookie.remove('userName');
  Cookie.remove('email');
};

const getNewAccessToken = async () => {
  const refresh = Cookie.get('refreshToken');
  await AuthService
    .fingerprint()
    .then(({ visitorId }) => AuthService
      .refresh({ refresh: refresh as string, fingerprint: visitorId }))
    .then(({ access }) => {
      Cookie.set('accessToken', access);
      initExpirationDate()
    })
    .catch(() => logout())
}

export const checkAuthTimeout = (expirationTime: number) =>
  setTimeout(() => getNewAccessToken(), expirationTime);

export const authCheckState = () => {
  const accessToken = Cookie.get('accessToken');

  if (accessToken === undefined) {
    logout();
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      getNewAccessToken();
    } else {
      checkAuthTimeout(expirationDate.getTime() - new Date().getTime());
    }
  }
};

