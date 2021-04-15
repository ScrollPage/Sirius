import React from "react";
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
  FormLabel,
  FormControl,
  Text,
} from "@chakra-ui/react";

interface Props extends NumberInputProps {
  label: string;
}

export const NumberInput: React.FC<Props> = ({ label, ...props }) => {
  return (
    <FormControl mt="4" w="100">
      <FormLabel>
        <Text fontSize="sm">{label}</Text>
      </FormLabel>
      <ChakraNumberInput {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </FormControl>
  );
};
