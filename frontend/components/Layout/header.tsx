import { Box, Flex, Heading } from "@chakra-ui/layout";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import React from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@chakra-ui/button";
import { logout } from "@/actions/auth";
import { useColor } from "@/hooks/useColor";

export const Header = () => {
  const { bg, cl } = useColor();
  return (
    <Flex
      h="80px"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      px="15px"
      boxShadow="md"
      bg={bg}
      color={cl}
    >
      <Heading as="h1">GG</Heading>
      <Flex alignItems="center">
        <AuthButtons />
        <Box ml="10px">
          <ThemeSwitch />
        </Box>
      </Flex>
    </Flex>
  );
};

const AuthButtons = () => {
  const { isAuth, userName } = useUser();

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <Heading size="md" mr="20px">
        {userName}
      </Heading>
      <Button w="100px" colorScheme="purple" onClick={logout}>
        Выйти
      </Button>
    </>
  );
};
