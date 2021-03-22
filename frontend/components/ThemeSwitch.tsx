import { useColorMode, Switch } from "@chakra-ui/react";

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />;
};
