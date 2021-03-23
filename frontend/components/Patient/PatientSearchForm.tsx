import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import { object, number } from "yup";
import { ParsedUrlQueryInput } from "node:querystring";

interface FormValues {
  name: string;
  lower?: number;
  greater?: number;
}

const validationSchema = object().shape({
  lower: number().min(0, "> 0").max(200, "< 200"),
  greater: number().min(0, "> 0").max(200, " < 200"),
});

export const PatientSearchForm = () => {
  const { query, push } = useRouter();

  const name = getAsString(query.name) || "";
  const lower = Number(getAsString(query.lower));
  const greater = Number(getAsString(query.greater));

  return (
    <Box width="full" mb="40px">
      <Formik
        initialValues={{
          name: name,
          lower: lower || undefined,
          greater: greater || undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let query: ParsedUrlQueryInput = {
            ...values,
          };
          if (!values.name) {
            delete query.name;
          }
          if (!values.lower) {
            delete query.lower;
          }
          if (!values.greater) {
            delete query.greater;
          }
          push(
            {
              pathname: `/main`,
              query,
            },
            undefined,
            { shallow: true }
          );
          setSubmitting(false);
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Flex justify="center">
              <Box mr="10px">
                <MyField
                  w="100"
                  size="lg"
                  label={"Поиск"}
                  name="name"
                  type="text"
                  placeholder={"Введите имя пациента"}
                />
              </Box>
              <Box mr="10px">
                <MyField
                  w="65px"
                  size="lg"
                  label={"От"}
                  name="lower"
                  type="number"
                  placeholder={"Лет"}
                />
              </Box>
              <Box mr="10px">
                <MyField
                  w="65px"
                  size="lg"
                  label={"До"}
                  name="greater"
                  type="number"
                  placeholder={"Лет"}
                />
              </Box>
              <Button
                mt="45px"
                h="48px"
                type="submit"
                isLoading={props.isSubmitting}
                colorScheme="purple"
              >
                <SearchIcon />
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
