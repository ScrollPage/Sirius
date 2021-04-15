import { IExam } from "@/types/exam";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Error } from "../UI/Error";
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

        <ModalBody>
          <Main examId={examId} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface MainProps {
  examId: number;
  onClose: () => void;
}

const Main: React.FC<MainProps> = ({ examId, onClose }) => {
  const { data: exam, error } = useSWR<IExam>(`/api/exam/${examId}/`);

  if (error) {
    return <Error>Ошибка при получении информации об ислледовании</Error>;
  }

  return <ExamForm defaultExam={exam} onClose={onClose} examId={examId} />;
};
