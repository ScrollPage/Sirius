import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import { Chart } from './Chart';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const { t } = useTranslation();
  const { data, error } = useSWR(id ? `/api/detector/${id}/` : null);

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('data:detecotor-info')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!data && (
            <Stack>
              {Array(7)
                .fill('')
                .map((_, index) => (
                  <Skeleton key={`chart__sceleton__${index}`} height="20px" />
                ))}
            </Stack>
          )}
          {data && <Chart data={data} />}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
