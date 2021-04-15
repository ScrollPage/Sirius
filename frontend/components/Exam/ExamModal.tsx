import { IDiagnosis } from "@/types/diagnosis";
import { IExam } from "@/types/exam";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Error } from "../UI/Error";
import { ExamDiagnosForm } from "./ExamDiagnosForm";
import { ExamForm } from "./ExamForm";

interface Props {
  examId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ExamModal: React.FC<Props> = ({ examId, isOpen, onClose }) => {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="20px">
        <ModalHeader>
          <Heading size="lg">Редактирование</Heading>
        </ModalHeader>
        <ModalCloseButton />

        <Main examId={examId} onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};

interface MainProps {
  examId: number;
  onClose: () => void;
}

const Main: React.FC<MainProps> = ({ examId, onClose }) => {
  const { data: exam, error: examError } = useSWR<IExam>(
    `/api/exam/${examId}/`
  );
  const { data: diagnosis, error: diagnosisError } = useSWR<IDiagnosis[]>(
    `/api/exam/${examId}/diagnosis/`
  );

  if (examError || diagnosisError) {
    return <Error>Ошибка при получении информации об ислледовании</Error>;
  }

  if (!exam || !diagnosis) {
    return (
      <Flex justifyContent="center" h="113.6px" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <ModalBody>
      <ExamDiagnosForm examId={examId} />
      <ExamForm defaultExam={exam} onClose={onClose} />
    </ModalBody>
  );
};
