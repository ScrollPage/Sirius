import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { MyField } from './MyField';
import { object, string, ref } from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';
import { authSignup } from '@/store/actions/auth';

interface FormValues {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    email: string()
      .email(t('register:incorrect-email-adress'))
      .required(t('register:enter-your-email-adress')),
    userName: string()
      .min(3, t('register:very-short-username'))
      .max(15, t('register:very-long-username'))
      .required(t('register:enter-your-username')),
    password: string()
      .matches(
        // @ts-ignore: Unreachable code error
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
        t('register:very-easy-password')
      )
      .required(t('register:enter-your-password')),
    confirmPassword: string()
      .required(t('register:enter-your-password'))
      .oneOf([ref('password'), ''], t('register:passwords-must-match')),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          email: '',
          userName: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(
            authSignup(values.email, values.userName, values.password)
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="sm"
              label={t('register:email-adress')}
              name="email"
              type="email"
              placeholder={t('register:enter-your-email-adress')}
            />
            <MyField
              size="sm"
              label={t('register:username')}
              name="userName"
              type="text"
              placeholder={t('register:enter-your-username')}
            />
            <MyField
              size="sm"
              label={t('register:password')}
              name="password"
              type="password"
              placeholder={t('register:enter-your-password')}
            />
            <MyField
              size="sm"
              label={t('register:confirm-password')}
              name="confirmPassword"
              type="password"
              placeholder={t('register:enter-your-password')}
            />
            <Button
              type="submit"
              w="full"
              mt="4"
              isLoading={props.isSubmitting}
              colorScheme="purple"
              size="sm"
            >
              {t('register:create-account')}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
