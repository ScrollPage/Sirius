import { IPatient } from "@/types/patient";
import React from "react";
import { Tr, Td, Link } from "@chakra-ui/react";
import { toDate } from "@/utils/toDate";

interface Props {
  patient: IPatient;
}

export const PatientItem: React.FC<Props> = ({ patient }) => {
  return (
    <>
      <Tr>
        <Td>
          <Link href={`/patient/${patient.id}`}>
            <a>{patient.name}</a>
          </Link>
        </Td>
        <Td>{patient.birth_date}</Td>
        <Td>{patient.sex ? "М" : "Ж"}</Td>
        <Td>{toDate(patient.created)}</Td>
        <Td>{toDate(patient.updated)}</Td>
      </Tr>
    </>
  );
};
