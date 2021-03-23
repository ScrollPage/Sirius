import { IExam } from "@/types/exam";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Tr, Td, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { SubList } from "../Sub/SubList";
import { toDate } from "@/utils/toDate";
import { ExamModal } from "./ExamModal";

interface Props {
  exam: IExam;
}

export const ExamItem: React.FC<Props> = ({ exam }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Tr>
        <Td>
          <SettingButtons
            examId={exam.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Td>
        <Td>{exam.diagnosis ?? "Отсутствует"}</Td>
        <Td>{exam.clinic}</Td>
        <Td>{toDate(exam.created)}</Td>
        <Td>{toDate(exam.updated)}</Td>
      </Tr>
      {isOpen && <SubList examId={exam.id} />}
    </>
  );
};

interface SettingsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  examId: number;
}

const SettingButtons: React.FC<SettingsProps> = ({
  setIsOpen,
  isOpen,
  examId,
}) => {
  const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    setIsOpen((e) => !e);
  };

  return (
    <>
      <Flex>
        <Button variant="ghost" mr="10px" onClick={onOpen}>
          <EditIcon />
        </Button>
        <Button onClick={handleOpen}>
          {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
        </Button>
      </Flex>
      <ExamModal onClose={onClose} isOpen={isOpenModal} examId={examId} />
    </>
  );
};
