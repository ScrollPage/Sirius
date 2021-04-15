import { Box, Button, Flex, Text, toast, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  examId: number;
}

interface FormValues {
  confirmed: string;
  unconfirmed: string;
}

export const ExamDiagnosForm: React.FC<Props> = ({ examId }) => {
  const toast = useToast();
  return (
    <Box width="full" mb="40px">
      <Formik
        initialValues={{
          confirmed: "",
          unconfirmed: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            console.log(values, examId);
          } catch (e) {
            toast({
              title: "Ошибка сохранения данных",
              status: "error",
              isClosable: true,
            });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: FormikProps<FormValues>) => (
          <Form>
            <Box mb="10px">
              <Text fontSize="2xl">Диагноз</Text>
              <MyField
                w="100%"
                size="lg"
                label={"Неподтвержденный диагноз"}
                type="text"
                name="greater"
                placeholder={"Введите диагноз"}
                isTextArea
              />
            </Box>
            <Box mb="10px">
              <MyField
                w="100%"
                size="lg"
                label={"Заключительный диагноз"}
                name="diagnosis"
                type="text"
                placeholder={"Введите диагноз"}
                isTextArea
              />
            </Box>
            <Flex justifyContent="center" w="100%">
              <Button
                type="submit"
                w="300px"
                mt="8"
                isLoading={isSubmitting}
                colorScheme="purple"
              >
                Подтвердить
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
