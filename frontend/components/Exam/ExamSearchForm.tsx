import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import { ParsedUrlQueryInput } from "node:querystring";
import { createClearObject } from "@/utils/queryCode";

const types = ["VEP", "ERG", "MERG", "EOG", "SweepVEP", "MVEP"];

interface FormValues {
  diagnosis: string;
  type?: string;
}

export const ExamSearchForm = () => {
  const { query, push } = useRouter();

  const patientId = getAsString(query.ID);
  const diagnosis = getAsString(query.diagnosis) || "";
  const type = getAsString(query.type);

  return (
    <Box width="full" mb="40px">
      <Formik
        initialValues={{
          diagnosis: diagnosis,
          type: type,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          push(
            {
              pathname: `/patient/${patientId}`,
              query: createClearObject(values),
            },
            undefined,
            { shallow: true }
          );
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }: FormikProps<FormValues>) => (
          <Form>
            <Flex justify="center">
              <Box mr="10px">
                <MyField
                  w="100"
                  size="lg"
                  label={"Поиск"}
                  name="diagnosis"
                  type="text"
                  placeholder={"Введите диагноз"}
                />
              </Box>
              <Box mr="10px">
                <FormControl mt="4" w="100">
                  <FormLabel>
                    <Text fontSize="sm">Тип</Text>
                  </FormLabel>
                  <Select
                    size="lg"
                    value={values.type}
                    placeholder="Выберите"
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    {types.map((type, idx) => (
                      <option key={`type__item__key__${idx}`} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                mt="45px"
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
