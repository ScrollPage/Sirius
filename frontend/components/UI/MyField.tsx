import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface MyFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  size: string;
  w?: string;
}

export const MyField: React.FC<MyFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  size,
  w,
}) => {
  const [field, meta] = useField(name);
  const isShowError = meta.touched && !!meta.error;

  return (
    <FormControl mt="4" isInvalid={isShowError}>
      <FormLabel w={w}>
        <Text fontSize="sm">{label}</Text>
      </FormLabel>
      <Input
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
