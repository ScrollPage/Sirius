import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import React, { useMemo } from "react";
import { IExam } from "@/types/exam";
import { DataSelect } from "../UI/DataSelect";
import { NumberInput } from "../UI/NumberInput";
import { changeExam } from "@/actions/exam";

interface FormKey {
  label: string;
  key: keyof Omit<ExamFormValues, "sight_sharpness">;
}

const formKeys: FormKey[] = [
  { label: "Цвет ДЗН", key: "color" },
  { label: "Границы ДЗН", key: "border" },
  { label: "Макула", key: "makula" },
  { label: "Периферия", key: "periphery" },
];

type stringAndU = string | undefined;
type numberAndU = number | undefined;
export interface ExamFormValues {
  sight_sharpness: numberAndU[];
  color: stringAndU[];
  border: stringAndU[];
  makula: stringAndU[];
  periphery: stringAndU[];
}
interface Props {
  defaultExam: IExam;
  onClose: () => void;
}

export const ExamForm: React.FC<Props> = ({ defaultExam, onClose }) => {
  const toast = useToast();

  const leftEye = useMemo(() => defaultExam.eyes_info[0], [defaultExam]);
  const rightEye = useMemo(() => defaultExam.eyes_info[1], [defaultExam]);

  return (
    <Box width="full">
      <Formik
        initialValues={{
          sight_sharpness: [leftEye.sight_sharpness, rightEye.sight_sharpness],
          color: [leftEye.dzn.color, rightEye.dzn.color],
          border: [leftEye.dzn.border, rightEye.dzn.border],
          makula: [leftEye.makula, rightEye.makula],
          periphery: [leftEye.periphery, rightEye.periphery],
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            await changeExam(values, leftEye.id, rightEye.id);
          } catch (e) {
            toast({
              title: "Ошибка сохранения данных",
              status: "error",
              isClosable: true,
            });
          }
          console.log(values);
          onClose();
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          handleChange,
          isSubmitting,
          setFieldValue,
        }: FormikProps<ExamFormValues>) => (
          <Form>
            <Box mb="10">
              <Text fontSize="2xl">Острота зрения</Text>
              <Flex justifyContent="space-between">
                <FieldArray
                  name="color"
                  render={() =>
                    values.sight_sharpness.map((value, idx) => (
                      <NumberInput
                        key={idx}
                        step={0.1}
                        name={`sight_sharpness.${idx}`}
                        label={chooseEye(idx)}
                        size="lg"
                        width="300px"
                        value={value}
                        placeholder={"Введите"}
                        onChange={(value) =>
                          setFieldValue(`sight_sharpness.${idx}`, value)
                        }
                      />
                    ))
                  }
                />
              </Flex>
            </Box>
            {formKeys.map(({ label, key }) => (
              <Box key={key} mb="10">
                <Text fontSize="2xl">{label}</Text>
                <Flex justifyContent="space-between">
                  <FieldArray
                    name="color"
                    render={() =>
                      values?.[key].map((value, idx) => (
                        <DataSelect
                          key={idx}
                          urlKey={key}
                          label={chooseEye(idx)}
                          name={`${key}.${idx}`}
                          size="lg"
                          width="300px"
                          value={value}
                          placeholder={"Выберите значение"}
                          onChange={handleChange}
                        />
                      ))
                    }
                  />
                </Flex>
              </Box>
            ))}
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

const chooseEye = (idx: number) => {
  if (idx === 0) {
    return "OS";
  }
  return "OD";
};
