import { useColorMode } from '@chakra-ui/react';

export const useColor = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };
  const bg = bgColor[colorMode];
  const cl = color[colorMode];
  return { bg, cl };
};
