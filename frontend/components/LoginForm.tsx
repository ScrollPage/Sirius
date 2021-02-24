import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { MyField } from './MyField';
import { object, string } from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';
import { authLogin } from '@/store/actions/auth';

interface FormValues {
  userName: string;
  password: string;
}

export const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    userName: string().required(t('login:enter-your-username')),
    password: string()
      .matches(
        // @ts-ignore: Unreachable code error
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
        t('login:very-easy-password')
      )
      .required(t('login:enter-your-password')),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(authLogin(values.userName, values.password));
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="lg"
              label={t('login:username')}
              name="userName"
              type="text"
              placeholder={t('login:enter-your-username')}
            />
            <MyField
              size="lg"
              label={t('login:password')}
              name="password"
              type="password"
              placeholder={t('login:enter-your-password')}
            />
            <Button
              type="submit"
              w="full"
              mt="8"
              isLoading={props.isSubmitting}
              colorScheme="purple"
            >
              {t('login:submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
