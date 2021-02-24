import { IDetector } from '@/types/detector';
import { Box, Flex, Heading, Tooltip } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

const MotionBox = motion.custom(Box);

interface Detectorprops extends IDetector {
  onOpen: (id: number) => void;
}

export const Detector: React.FC<Detectorprops> = ({ x, y, id, onOpen }) => {
  const { t } = useTranslation();

  const openModal = () => {
    onOpen(id);
  };

  return (
    <Box
      bg="purple"
      p="4"
      w="230px"
      borderWidth={1}
      boxShadow="sm"
      borderRadius={15}
      m="2"
      position="relative"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Tooltip
          label={t('data:show-information')}
          placement="top"
          shouldWrapChildren
        >
          <MotionBox
            mt="2"
            whileHover={{ scale: 1.2 }}
            cursor="pointer"
            onClick={openModal}
          >
            <Image src="/detector.svg" alt="Detecotor" width={70} height={70} />
          </MotionBox>
        </Tooltip>
        <Flex
          justifyContent="space-between"
          direction="column"
          alignItems="flex-start"
        >
          <Heading py="1" size="sm">
            id: {id}
          </Heading>
          <Heading py="1" size="sm">
            x: {x}
          </Heading>
          <Heading py="1" size="sm">
            y: {y}
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};
