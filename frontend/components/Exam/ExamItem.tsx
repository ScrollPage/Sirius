import { IExam } from "@/types/exam";
import React, { useState } from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { SubList } from "../Sub/SubList";

interface Props {
  exam: IExam;
}

export const ExamItem: React.FC<Props> = ({ exam }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((e) => !e);
  };
  return (
    <>
      <Tr>
        <Td>
          <Button onClick={handleOpen}>
            {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </Button>
        </Td>
        <Td>{exam.diagnosis ?? "Отсутствует"}</Td>
        <Td>{exam.clinic}</Td>
        <Td>{exam.created}</Td>
        <Td>{exam.updated}</Td>
      </Tr>
      {isOpen && <SubList examId={exam.id} />}
    </>
  );
};
