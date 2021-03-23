import { ISequence } from "@/types/sequence";
import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { ChartForm } from "../Chart/ChartForm";

const DynamicComponentWithNoSSR = dynamic(() => import("../Chart/Chart"), {
  ssr: false,
});

interface Props {
  subId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const SubModal: React.FC<Props> = ({ subId, isOpen, onClose }) => {
  const { data: sequences, error } = useSWR<ISequence[]>(
    `/api/sub/${subId}/sequence/`
  );

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="20px">
        <ModalHeader>Диаграмма</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {error ? (
            <Text>Ошибка загрузки подисследований</Text>
          ) : !sequences ? (
            <SpinnerIcon />
          ) : sequences.length === 0 ? (
            <Text>Нет точек</Text>
          ) : (
            <DynamicComponentWithNoSSR sequences={sequences} />
          )}
          <ChartForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
