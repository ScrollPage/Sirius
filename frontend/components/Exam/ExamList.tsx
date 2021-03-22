import { IExam } from "@/types/exam";
import React from "react";
import { ExamItem } from "./ExamItem";
import { Table, Thead, Tbody, Tfoot, Tr, Th } from "@chakra-ui/react";

interface Props {
  exams: IExam[];
}

export const ExamList: React.FC<Props> = ({ exams }) => {
  return (
    <Table variant="striped" colorScheme="purple">
      <Thead>
        <Tr>
          <Th>Открыть</Th>
          <Th>Диагноз</Th>
          <Th>Клиника</Th>
          <Th>Создано</Th>
          <Th>Изменено</Th>
        </Tr>
      </Thead>
      <Tbody>
        {exams.map((exam) => (
          <ExamItem key={`exam__item__key__${exam.id}`} exam={exam} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Открыть</Th>
          <Th>Диагноз</Th>
          <Th>Клиника</Th>
          <Th>Создано</Th>
          <Th>Изменено</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};
