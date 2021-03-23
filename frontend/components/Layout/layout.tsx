import { Container, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { Header } from "./header";

interface Props {
  children: React.ReactNode;
  title: string;
}

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <Flex flexDirection="column">
      <Header />
      <Container maxW="container.xl" pt="40px">
        <Flex justifyContent="center" mb="40px">
          <Heading as="h1">{title}</Heading>
        </Flex>
        {children}
      </Container>
    </Flex>
  );
};
