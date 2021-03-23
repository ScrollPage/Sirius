import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useMemo } from "react";

interface MyFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  size: string;
  w?: string;
  isTextArea?: boolean;
}

export const MyField: React.FC<MyFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  size,
  w,
  isTextArea,
}) => {
  const [field, meta] = useField(name);
  const isShowError = meta.touched && !!meta.error;

  const Target = useMemo(() => (isTextArea ? Textarea : Input), [isTextArea]);

  return (
    <FormControl mt="4" isInvalid={isShowError}>
      <FormLabel w={w}>
        <Text fontSize="sm">{label}</Text>
      </FormLabel>
      <Target
        {...field}
        size={size}
        w={w}
        type={type}
        placeholder={placeholder}
      />
      {isShowError && (
        <FormErrorMessage fontSize="xs">{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};
