import { app } from '@/src/features/common';
import { createFetching, Fetching } from '@/src/lib/fetching';
import { accountApi } from '@/src/api/account';
import { createForm } from 'effector-forms';
import { rules } from '@/src/lib/validate-rules';
import { forward } from 'effector';
import { loginProccesing } from '../login/model';
import { RegisterData } from '@/src/api/account';

export const registerProccesing = app.createEffect<
  RegisterData,
  void,
  Error
>();
export const registerFetching: Fetching<void, Error> = createFetching(
  registerProccesing
);

registerProccesing.use((data) => accountApi.signup(data));

registerProccesing.done.watch(() => {
  loginProccesing({
    email: registerForm.fields.email.$value.getState(),
    password: registerForm.fields.password.$value.getState()
  })
  registerForm.reset();
});

export const registerForm = createForm({
  domain: app,
  fields: {
    sex: {
      init: "" as string,
      rules: [
        rules.required(),
      ],
    },
    birth_date: {
      init: "" as string,
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

forward({ from: registerForm.formValidated, to: registerProccesing })