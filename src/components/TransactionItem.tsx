import React from "react";
import { Pressable } from "react-native"; // Importando Pressable
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons";

interface TransactionItemProps {
  transaction: {
    id: number;
    description: string;
    amount: number;
    type: "income" | "expense";
  };
  isSelected: boolean;
  color: string;
  onSelect?: () => void; // Adicionando prop onSelect
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  isSelected,
  color,
  onSelect,
}) => {
  return (
    <Pressable onPress={onSelect}>
      <Box
        style={{
          backgroundColor: isSelected ? `${color}20` : "white",
        }}
        className="p-4 rounded-lg border border-gray-100"
      >
        <HStack className="justify-between items-center">
          <HStack space="sm" className="items-center">
            <MaterialIcons
              name={
                transaction.type === "income"
                  ? "arrow-upward"
                  : "arrow-downward"
              }
              size={20}
              color={transaction.type === "income" ? "#4CAF50" : "#F44336"}
            />
            <Text className="text-gray-800">{transaction.description}</Text>
          </HStack>
          <Text
            className={
              transaction.type === "income"
                ? "text-green-500 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {transaction.type === "income" ? "+" : "-"} R${" "}
            {Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};
