import { ISequence } from "@/types/sequence";
import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
// import { Chart } from "./Chart";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./Chart"), {
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
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="ghost">Что-то</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
