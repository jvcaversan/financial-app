import React from "react";
import { Box } from "./ui/box";
import { Text } from "./ui/text";

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Box className="bg-blue-50 p-6 rounded-xl mb-6">
      <Text className="text-gray-500 text-sm">Saldo Atual</Text>
      <Text className="text-gray-800 text-3xl font-bold mt-1">
        R$ {balance.toFixed(2)}
      </Text>
    </Box>
  );
};
