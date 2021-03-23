import { ISub } from "@/types/sub";
import React from "react";
import { SubItem } from "./SubItem";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Td,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import useSWR from "swr";

interface Props {
  examId: number;
}

export const SubList: React.FC<Props> = ({ examId }) => {
  const { data: subs, error } = useSWR<ISub[]>(`/api/exam/${examId}/sub`);

  if (error) {
    return <Text>Ошибка загрузки подисследований</Text>;
  }

  if (!subs) {
    return (
      <>
        {/* @ts-ignore */}
        <Td colSpan="5">
          <Flex justifyContent="center" h="113.6px" align="center">
            <Spinner size="xl" />
          </Flex>
        </Td>
      </>
    );
  } else {
    return (
      <>
        <Td />
        {/* @ts-ignore */}
        <Td colSpan="4">
          <Table variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th>Диаграмма</Th>
                <Th>Тип</Th>
                <Th>Версия</Th>
                <Th>Создано</Th>
                <Th>Изменено</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subs.map((sub) => (
                <SubItem key={`sub__item__key__${sub.id}`} sub={sub} />
              ))}
            </Tbody>
          </Table>
        </Td>
      </>
    );
  }
};
