import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Button } from "@chakra-ui/react";

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Button onClick={toggleColorMode}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
