import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { MyField } from "@/components/UI/MyField";
import { object, string } from "yup";
import { changeExam } from "@/actions/exam";

interface FormValues {
  diagnosis: string;
}

interface Props {
  defaultExam: string;
  examId: number;
  onClose: () => void;
}

export const ExamForm: React.FC<Props> = ({ defaultExam, examId, onClose }) => {
  const validationSchema = object().shape({
    diagnosis: string().required("Поле пустое"),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          diagnosis: defaultExam,
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await changeExam(examId, values.diagnosis);
          onClose();
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="lg"
              label={"Диагноз"}
              name="diagnosis"
              type="text"
              placeholder={"Введите диагноз"}
              isTextArea
            />
            <Flex justifyContent="center" w="100%">
              <Button
                type="submit"
                w="300px"
                mt="8"
                isLoading={props.isSubmitting}
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
