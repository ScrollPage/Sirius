import { tokenChanged } from '@/src/features/common';
import { app } from '@/src/features/common';
import { LoginResponse } from '@/src/api/account';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';
import { forward } from 'effector';
import Router from 'next/router'
import { alertCalled } from '@/src/features/alert/model';
import { createForm } from 'effector-forms';
import { rules } from '@/src/lib/validate-rules';

export interface LoginFormValues {
  email: string;
  password: string;
}

const loginProccesing = app.createEffect<
  LoginFormValues,
  LoginResponse,
  Error
>();
export const loginFetching: Fetching<LoginResponse, Error> = createFetching(
  loginProccesing
);

loginProccesing.use((data) => accountApi.login(data));

loginProccesing.done.watch(({ result: { access } }) => {
  tokenChanged(access);
  loginForm.reset();
  alertCalled({ kind: 'success', label: 'Вы успешно вошли!' })
  Router.push({ pathname: '/cabinet' }, undefined, { shallow: false });
});

loginProccesing.fail.watch(() => {
  loginForm.reset();
});

export const loginForm = createForm({
  domain: app,
  fields: {
    email: {
      init: "" as string,
      rules: [
        rules.required(),
      ],
    },
    password: {
      init: "" as string,
      rules: [
        rules.required(),
      ],
    },
  },
  validateOn: ["submit"],
})

forward({ from: loginForm.formValidated, to: loginProccesing })
