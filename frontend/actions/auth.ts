import Cookie from 'js-cookie';
import Router from 'next/router';
import { instance } from '@/api';

export const login = async (userName: string, password: string) => {
  await instance()
    .post('/auth/jwt/create/', {
      username: userName,
      password,
    })
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);

      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);
      authInfo()

      checkAuthTimeout(24 * 3600 * 1000)
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
      const { id, username, email } = res.data;

      Cookie.set('userId', id);
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
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('userId');
  Cookie.remove('userName');
  Cookie.remove('email');
};

export const checkAuthTimeout = (expirationTime: number) =>
  setTimeout(() => logout(), expirationTime);

export const authCheckState = () => {
  const token = Cookie.get('token');

  if (token === undefined) {
    logout();
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      logout();
    } else {
      checkAuthTimeout(expirationDate.getTime() - new Date().getTime());
    }
  }
};