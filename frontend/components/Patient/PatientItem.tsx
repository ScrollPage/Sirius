import { IPatient } from "@/types/patient";
import React from "react";
import { Tr, Td, Link } from "@chakra-ui/react";

interface Props {
  patient: IPatient;
}

export const PatientItem: React.FC<Props> = ({ patient }) => {
  return (
    <>
      <Tr>
        <Td>
          <Link href={`/patient/${patient.id}`}>
            <a>
              {patient.first_name} {patient.last_name}
            </a>
          </Link>
        </Td>
        <Td>{patient.birth_date}</Td>
        <Td>{patient.sex ? "М" : "Ж"}</Td>
        <Td>{patient.created}</Td>
        <Td>{patient.updated}</Td>
      </Tr>
    </>
  );
};
