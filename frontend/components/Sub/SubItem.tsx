import { ISub } from "@/types/sub";
import React from "react";
import { Tr, Td, Button, useDisclosure } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { toDate } from "@/utils/toDate";
import { SubModal } from "./SubModal";

interface Props {
  sub: ISub;
}

export const SubItem: React.FC<Props> = ({ sub }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr>
        <Td>
          <Button onClick={onOpen}>
            <InfoIcon />
          </Button>
        </Td>
        <Td>{sub.check_type}</Td>
        <Td>{sub.check_version}</Td>
        <Td>{toDate(sub.created)}</Td>
        <Td>{toDate(sub.updated)}</Td>
      </Tr>
      <SubModal subId={sub.id} onClose={onClose} isOpen={isOpen} />
    </>
  );
};
