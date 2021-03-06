import { IPatient } from "@/types/patient";
import { toDate } from "@/utils/toDate";
import { Flex, Box, Text, Container, Heading } from "@chakra-ui/layout";
import React from "react";

interface Props {
  patient: IPatient;
}

export const PatientCard: React.FC<Props> = ({ patient }) => {
  return (
    <Box pb="20px">
      <Container maxW="container.sm">
        <Box boxShadow="outline" borderRadius="10px" py="15px" px="25px">
          <Flex justifyContent="space-between">
            <Heading as="h6" size="sm">
              Имя:
            </Heading>
            <Text fontSize="md">{patient.name}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Heading as="h6" size="sm">
              Дата рождения:
            </Heading>
            <Text fontSize="md">{patient.birth_date}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Heading as="h6" size="sm">
              Пол:
            </Heading>
            <Text fontSize="md">{patient.sex ? "М" : "Ж"}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Heading as="h6" size="sm">
              Создано:
            </Heading>
            <Text fontSize="md">{toDate(patient.created)}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Heading as="h6" size="sm">
              Изменено:
            </Heading>
            <Text fontSize="md">{toDate(patient.updated)}</Text>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
