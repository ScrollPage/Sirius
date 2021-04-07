import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { object, string } from "yup";
import { login } from "@/actions/auth";

interface FormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const validationSchema = object().shape({
    username: string().required("Поле пустое"),
    password: string().required("Поле пустое"),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await login(values.username, values.password);
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="lg"
              label={"Логин"}
              name="username"
              type="text"
              placeholder={"Введите логин"}
            />
            <MyField
              size="lg"
              label={"Пароль"}
              name="password"
              type="password"
              placeholder={"Введите пароль"}
            />
            <Flex justifyContent="center" w="100%">
              <Button
                type="submit"
                w="300px"
                mt="8"
                isLoading={props.isSubmitting}
                colorScheme="purple"
              >
                Войти
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
