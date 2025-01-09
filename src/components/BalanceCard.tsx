import React, { useState } from "react";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons"; // Importe os ícones
import { Pressable } from "react-native"; // Para tornar o ícone clicável

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // Estado para controlar a visibilidade

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev); // Alterna entre visível e oculto
  };

  return (
    <Box className="bg-gray-50 p-6 rounded-xl mb-6">
      <Box className="flex-row justify-between items-center">
        <Text className="text-gray-500 text-sm">Saldo Atual</Text>
        <Pressable onPress={toggleBalanceVisibility}>
          <MaterialIcons
            name={isBalanceVisible ? "visibility-off" : "visibility"} // Alterna entre os ícones
            size={24}
            color="#666"
          />
        </Pressable>
      </Box>
      <Text className="text-gray-800 text-3xl font-bold mt-1">
        {isBalanceVisible ? `R$ ${balance.toFixed(2)}` : "••••••"}{" "}
        {/* Mostra o saldo ou oculta */}
      </Text>
    </Box>
  );
};
