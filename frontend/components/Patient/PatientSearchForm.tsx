import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import { object, number } from "yup";
import { createClearObject } from "@/utils/queryCode";
import { yearsToDate } from "@/utils/yearsToDate";
import { Select } from "../UI/CastomSelect";

const TYPES = [
  { id: 1, name: "VEP" },
  { id: 2, name: "ERG" },
  { id: 3, name: "MERG" },
  { id: 4, name: "EOG" },
  { id: 5, name: "SweepVEP" },
  { id: 6, name: "MVEP" },
];
interface FormValues {
  name?: string;
  lower?: string;
  greater?: string;
  diagnosis?: string;
  type?: string;
}

const validationSchema = object().shape({
  lower: number().min(0, ">= 0").max(200, "< 200"),
  greater: number().min(0, ">= 0").max(200, " < 200"),
});

export const PatientSearchForm = () => {
  const { query, push } = useRouter();

  const name = getAsString(query.name);
  const lower = getAsString(query.lower);
  const greater = getAsString(query.greater);
  const diagnosis = getAsString(query.diagnosis);
  const type = getAsString(query.type);

  return (
    <Box width="full" mb="40px">
      <Formik
        initialValues={{
          name: name,
          lower: lower,
          greater: greater,
          diagnosis: diagnosis,
          type: type,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          push(
            {
              pathname: `/main`,
              query: createClearObject({
                ...values,
                lower: yearsToDate(values.lower),
                greater: yearsToDate(values.greater),
              }),
            },
            undefined,
            { shallow: true }
          );
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, isSubmitting }: FormikProps<FormValues>) => (
          <Form>
            <Flex justify="center" flexDirection={["column", "column", "row"]}>
              <Box mr="10px">
                <MyField
                  // @ts-ignore
                  w={["100%", "100%", "200px"]}
                  size="lg"
                  label={"Пациент"}
                  name="name"
                  type="text"
                  placeholder={"Введите"}
                />
              </Box>
              <Box mr="10px">
                <MyField
                  // @ts-ignore
                  w={["100%", "100%", "65px"]}
                  size="lg"
                  label={"От"}
                  name="lower"
                  type="number"
                  placeholder={"Лет"}
                />
              </Box>
              <Box mr="10px">
                <MyField
                  // @ts-ignore
                  w={["100%", "100%", "65px"]}
                  size="lg"
                  label={"До"}
                  name="greater"
                  type="number"
                  placeholder={"Лет"}
                />
              </Box>
              <Box mr="10px">
                <MyField
                  // @ts-ignore
                  w={["100%", "100%", "200px"]}
                  size="lg"
                  label={"Диагноз"}
                  name="diagnosis"
                  type="text"
                  placeholder={"Введите"}
                />
              </Box>
              <Box mr="10px">
                <Select
                  label="Тип"
                  name="type"
                  size="lg"
                  value={values.type}
                  placeholder="Выберите"
                  onChange={handleChange}
                  data={TYPES}
                />
              </Box>
              <Button
                mt="50px"
                h="48px"
                type="submit"
                isLoading={isSubmitting}
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
