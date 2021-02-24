import Router from 'next/router';
import { app } from '@/src/features/common';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';
import { createForm } from 'effector-forms';
import { rules } from '@/src/lib/validate-rules';
import { alertCalled } from '@/src/features/alert';
import { attach, forward } from 'effector';

export interface RegisterFormValues {
  company: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

export const registerProccesing = app.createEffect<
  RegisterFormValues,
  void,
  Error
>();
export const registerFetching: Fetching<void, Error> = createFetching(
  registerProccesing
);

const formatRegister = attach({
  effect: registerProccesing,
  mapParams: (values) => {
    const { role, ...data } = values;
    const is_steakholder = values.role === "1" || values.role === "2";
    return { ...data, is_steakholder }
  }
})

formatRegister.use((data) => accountApi.signup(data));

registerProccesing.done.watch(() => {
  alertCalled({ kind: 'success', label: 'Подтверидите E-mail для активации аккаунта' })
  Router.push({ pathname: '/cabinet' }, undefined, { shallow: false });
});

export const registerForm = createForm({
  domain: app,
  fields: {
    phone_number: {
      init: 0 as number,
      rules: [
        rules.required(),
        rules.minLength(11),
        rules.maxLength(11)
      ],
    },
    role: {
      init: "1" as string,
      rules: [
        rules.required(),
      ],
    },
    first_name: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.minLength(3)
      ],
    },
    last_name: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.minLength(3)
      ],
    },
    name: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.minLength(3)
      ],
    },
    company: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.minLength(3)
      ],
    },
    email: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.email()
      ],
    },
    password: {
      init: "" as string,
      rules: [
        rules.required(),
        rules.strongPassword()
      ],
    },
  },
  validateOn: ["submit"],
})



