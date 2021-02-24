import React from 'react';

import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const DetecotorSceleton = () => {
  return (
    <Box
      w="230px"
      h="130px"
      padding="4"
      boxShadow="sm"
      bg="white"
      borderRadius={15}
      m="2"
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
    </Box>
  );
};

export default DetecotorSceleton;
