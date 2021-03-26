import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import { object, number } from "yup";
import { createClearObject } from "@/utils/queryCode";

interface FormValues {
  name?: string;
  lower?: string;
  greater?: string;
}

const validationSchema = object().shape({
  lower: number().min(1, "> 0").max(200, "< 200"),
  greater: number().min(1, "> 0").max(200, " < 200"),
});

export const PatientSearchForm = () => {
  const { query, push } = useRouter();

  const name = getAsString(query.name);
  const lower = getAsString(query.lower);
  const greater = getAsString(query.greater);

  return (
    <Box width="full" mb="40px">
      <Formik
        initialValues={{
          name: name,
          lower: lower,
          greater: greater,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          push(
            {
              pathname: `/main`,
              query: createClearObject(values),
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
