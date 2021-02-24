import { useColor } from '@/hooks/useColor';
import { Flex, FlexProps } from '@chakra-ui/react';

export const Container = (props: FlexProps) => {
  const { bg, cl } = useColor();
  return (
    <Flex
      minHeight="100vh"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bg}
      color={cl}
      {...props}
    />
  );
};
