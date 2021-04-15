import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
  examId: number;
  defaultExam?: IExam;
  onClose: () => void;
}

export const ExamForm: React.FC<Props> = ({ defaultExam, onClose, examId }) => {
  const leftEye = useMemo(() => defaultExam?.eyes_info[0], [defaultExam]);
  const RightEye = useMemo(() => defaultExam?.eyes_info[1], [defaultExam]);

  return (
    <Box width="full">
      <Formik
        initialValues={{
          sight_sharpness: [
            leftEye?.sight_sharpness,
            RightEye?.sight_sharpness,
          ],
          color: [leftEye?.dzn.color, RightEye?.dzn.color],
          border: [leftEye?.dzn.border, RightEye?.dzn.border],
          makula: [leftEye?.makula, RightEye?.makula],
          periphery: [leftEye?.periphery, RightEye?.periphery],
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await changeExam(values, examId);
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
              <Text fontSize="2xl">Остроа зрения</Text>
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
