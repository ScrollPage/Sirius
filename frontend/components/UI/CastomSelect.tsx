import React from "react";
import { Select as ChakraSelect, SelectProps } from "@chakra-ui/select";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";

interface IData {
  id: number;
  name: string;
}

interface Props extends SelectProps {
  data?: IData[];
  label: string;
}

export const Select: React.FC<Props> = ({ data, label, ...props }) => {
  return (
    <FormControl mt="4" w="100">
      <FormLabel>
        <Text fontSize="sm">{label}</Text>
      </FormLabel>
      <ChakraSelect {...props}>
        {data?.map((type) => (
          <option key={`type__item__key__${type.id}`} value={type.name}>
            {type.name}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};
