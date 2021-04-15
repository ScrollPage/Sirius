import { Alert, AlertIcon } from "@chakra-ui/alert";
import React from "react";

interface Props {
  children: string;
}

export const Error: React.FC<Props> = ({ children }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {children}
    </Alert>
  );
};
