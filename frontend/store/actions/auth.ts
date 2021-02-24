import { Dispatch, SetStateAction } from 'react';
import { instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';
import Cookie from 'js-cookie';
import { show } from './alert';
import Router from 'next/router';

export const authSignup = (
  email: string,
  userName: string,
  password: string,
): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/users/', {
      email,
      username: userName,
      password,
    })
    .then(() => {
      dispatch(show('Вы успешно создали аккаунт, войдите!', 'success'));
    })
    .catch(() => {
      dispatch(show('Пользователь с такими данными уже существует!', 'warning'));
    });
};

export const authLogin = (userName: string, password: string): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/jwt/create/', {
      username: userName,
      password,
    })
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);

      Cookie.set('userName', userName);
      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);

      dispatch(checkAuthTimeout(24 * 3600 * 1000));
      Router.push({ pathname: '/data' }, undefined, { shallow: true });
      dispatch(show('Вы успешно вошли!', 'success'));
    })
    .catch(() => {
      dispatch(show('Неверный логин или пароль, перепроверьте данные!', 'warning'));
    });
};

export const logout = (): ThunkType => () => {
  Router.push({ pathname: '/' }, undefined, { shallow: true });
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('userName');
};

export const checkAuthTimeout = (expirationTime: number): ThunkType => dispatch =>
  setTimeout(() => dispatch(logout()), expirationTime);

export const authCheckState = (): ThunkType => dispatch => {
  const token = Cookie.get('token');

  if (token === undefined) {
    dispatch(logout());
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};

export const authCheckActivate = (
  setStep: Dispatch<SetStateAction<number>>
): ThunkType => async dispatch => {
  const email = Cookie.get('email') as string;
  await instanceWithOutHeaders
    .get(`/api/activity/${email}/`)
    .then(res => {
      if (res.data?.is_active === true) {
        const password = Cookie.get('password') as string;
        dispatch(authLogin(email, password));
        setStep(e => e + 1);
        dispatch(show('Ваш аккаунт подтвержден!', 'success'));
      }
      dispatch(show('Ваш аккаунт не подтвержден!', 'warning'));
    })
    .catch(() => {
      dispatch(show('Ошибка в подтверждении аккаунта!', 'warning'));
    });
};




