import { Rule } from 'effector-forms/dist';

export const rules = {
  required: (): Rule<any> => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'Заполните поле',
    }),
  }),
  email: (): Rule<string> => ({
    name: 'email',
    validator: (value) => ({
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorText: 'Некорректный email',
    }),
  }),
  strongPassword: (): Rule<string> => ({
    name: 'strongPassword',
    validator: (value) => ({
      isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value),
      errorText: 'Слишком легкий пароль',
    }),
  }),
  minLength: (min: number): Rule<string> => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length >= min,
      errorText: `Ввведите еще ${min - value.length} символов`,
    }),
  }),
  maxLength: (max: number): Rule<string> => ({
    name: 'maxLength',
    validator: (value) => ({
      isValid: value.length <= max,
      errorText: `Уберите ${value.length - max} символов`,
    }),
  }),
};
