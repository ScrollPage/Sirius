import { IPatient } from "@/types/patient";
import React from "react";
import { PatientItem } from "./PatientItem";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";

interface Props {
  patients: IPatient[];
}

export const PatientList: React.FC<Props> = ({ patients }) => {
  return (
    <Table variant="striped" colorScheme="purple">
      <Thead>
        <Tr>
          <Th>Пациент</Th>
          <Th>Дата рождения</Th>
          <Th>Пол</Th>
          <Th>Создано</Th>
          <Th>Изменено</Th>
        </Tr>
      </Thead>
      <Tbody>
        {patients.map((patient) => (
          <PatientItem
            key={`patient__item__key__${patient.id}`}
            patient={patient}
          />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Пациент</Th>
          <Th>Дата рождения</Th>
          <Th>Пол</Th>
          <Th>Создано</Th>
          <Th>Изменено</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};
