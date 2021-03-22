import { ISub } from "@/types/sub";
import React from "react";
import { SubItem } from "./SubItem";
import { Table, Thead, Tbody, Tr, Th, Text, Td } from "@chakra-ui/react";
import useSWR from "swr";

interface Props {
  examId: number;
}

export const SubList: React.FC<Props> = ({ examId }) => {
  const { data: sub, error } = useSWR<ISub[]>(`/api/exam/${examId}/sub`);

  return (
    <>
      <Td></Td>
      {/* @ts-ignore */}
      <Td colSpan="4">
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <Th>Тип</Th>
              <Th>Версия</Th>
              <Th>Создано</Th>
              <Th>Изменено</Th>
            </Tr>
          </Thead>
          <Tbody>
            {error ? (
              <Text>Ошибка загрузки подисследований</Text>
            ) : !sub ? (
              <Sceleton />
            ) : sub.length === 0 ? (
              <Text>Нет подисследований</Text>
            ) : (
              sub.map((sub) => (
                <SubItem key={`sub__item__key__${sub.id}`} sub={sub} />
              ))
            )}
          </Tbody>
        </Table>
      </Td>
    </>
  );
};

const Sceleton = () => {
  return (
    <>
      {[0, 1].map((i) => (
        <Tr key={`sceleton__item__key__${i}`}>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      ))}
    </>
  );
};
