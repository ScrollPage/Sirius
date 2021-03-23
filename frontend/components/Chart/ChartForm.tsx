import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { object, number } from "yup";

interface FormValues {
  xaxis: number;
  yaxis: number;
}

export const ChartForm = () => {
  const validationSchema = object().shape({
    xaxis: number().required("Поле пустое").integer("Введите целове число"),
    yaxis: number().required("Поле пустое").integer("Введите целове число"),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          xaxis: 0,
          yaxis: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // await login(values.userName, values.password);
          console.log(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="lg"
              label={"X"}
              name="xaxis"
              type="number"
              placeholder={"Введите X"}
            />
            <MyField
              size="lg"
              label={"Y"}
              name="yaxis"
              type="number"
              placeholder={"Введите Y"}
            />
            <Flex justifyContent="center" w="100%">
              <Button
                type="submit"
                w="300px"
                mt="8"
                isLoading={props.isSubmitting}
                colorScheme="purple"
              >
                Добавить значение
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
