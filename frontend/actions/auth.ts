import { IUser } from './../types/user';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { instance } from '@/api';

const initExpirationDate = () => {
  const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);
  Cookie.set('expirationDate', expirationDate);
  checkAuthTimeout(24 * 3600 * 1000)
}

export const login = async (userName: string, password: string) => {
  await instance()
    .post('/auth/jwt/create/', {
      username: userName,
      password,
    })
    .then(res => {
      initExpirationDate()
      Cookie.set('accessToken', res.data.access);
      Cookie.set('refreshToken', res.data.refresh);
      authInfo()
      Router.push({ pathname: '/main' }, undefined, { shallow: true });
      console.log('Вы успешно вошли!');
    })
    .catch(() => {
      console.log('Неверный логин или пароль, перепроверьте данные!');
    });
};

const authInfo = async () => {
  await instance()
    .get('/auth/users/me/')
    .then(res => {
      const { id, username, email } = res.data as IUser;
      Cookie.set('userId', String(id));
      Cookie.set('userName', username);
      Cookie.set('email', email);
      console.log('Информация успешно занесена в куки');
    })
    .catch(() => {
      console.log('Ошибка при взятии информации о пользователе!');
    });
}

export const logout = () => {
  Router.push({ pathname: '/' }, undefined, { shallow: true });
  Cookie.remove('accessToken');
  Cookie.remove('refreshToken');
  Cookie.remove('expirationDate');
  Cookie.remove('userId');
  Cookie.remove('userName');
  Cookie.remove('email');
};

const getNewAccessToken = async () => {
  const refreshToken = Cookie.get('refreshToken');
  await instance()
    .post('/auth/jwt/refresh/', {
      refresh: refreshToken
    })
    .then((res) => {
      Cookie.set('accessToken', res.data.access);
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