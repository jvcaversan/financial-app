import React from "react";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <Box className="mb-6">
      <Text className="text-gray-800 text-2xl font-bold">Olá, {userName}</Text>
      <Text className="text-gray-500 text-sm">Bem-vindo de volta</Text>
    </Box>
  );
};
