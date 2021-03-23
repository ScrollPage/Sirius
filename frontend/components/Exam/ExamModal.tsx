import { IExam } from "@/types/exam";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useSWR from "swr";
import { ExamForm } from "./ExamForm";

interface Props {
  examId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ExamModal: React.FC<Props> = ({ examId, isOpen, onClose }) => {
  const { data: exam, error } = useSWR<IExam>(`/api/exam/${examId}/`);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="20px">
        <ModalHeader>Редактирование</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <ExamForm
            examId={examId}
            defaultExam={!error && exam && exam.diagnosis ? exam.diagnosis : ""}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
