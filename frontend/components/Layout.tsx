import React from 'react';
import { Container } from './Container';
import { Header } from './Header';
import { Container as ChakraContainer } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container height="full">
      <Header />
      <ChakraContainer maxW="xl" height="full" mt="120px">
        {children}
      </ChakraContainer>
    </Container>
  );
};
