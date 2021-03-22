import { ISub } from "@/types/sub";
import React from "react";
import { Tr, Td } from "@chakra-ui/react";

interface Props {
  sub: ISub;
}

export const SubItem: React.FC<Props> = ({ sub }) => {
  return (
    <>
      <Tr>
        <Td>{sub.check_type}</Td>
        <Td>{sub.check_version}</Td>
        <Td>{sub.created}</Td>
        <Td>{sub.updated}</Td>
      </Tr>
    </>
  );
};
