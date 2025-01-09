import React, { useState } from "react";
import { Pressable } from "react-native";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "../types";
import { useTransactions } from "../hooks/useTransactions";
import { EditTransactionModal } from "./EditTransactionModal"; // Importe o modal de edição

interface TransactionItemProps {
  transaction: Transaction;
  isSelected?: boolean;
  color: string;
  onSelect?: () => void;
}

export const TransactionItem = ({
  transaction,
  isSelected,
  color,
  onSelect,
}: TransactionItemProps) => {
  const { deleteTransaction } = useTransactions();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleLongPress = () => {
    deleteTransaction({ id: transaction.id });
  };

  const handleEditPress = () => {
    setIsEditModalVisible(true); // Abre o modal de edição
  };

  return (
    <>
      <Pressable onPress={onSelect} onLongPress={handleLongPress}>
        <Box
          style={{
            backgroundColor: isSelected ? `${color}` : "white",
          }}
          className="p-4 rounded-lg border border-gray-100"
        >
          <HStack className="justify-between items-center">
            <HStack space="sm" className="items-center">
              <MaterialIcons
                name={
                  transaction.type === "incomes"
                    ? "arrow-upward"
                    : "arrow-downward"
                }
                size={20}
                color={transaction.type === "incomes" ? "#4CAF50" : "#F44336"}
              />
              <Text className="text-gray-800">{transaction.description}</Text>
              <Pressable onPress={handleEditPress}>
                <MaterialIcons name="edit" size={20} color="gray" />
              </Pressable>
            </HStack>
            <Text
              className={
                transaction.type === "incomes"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {transaction.type === "incomes" ? "+" : "-"} R${" "}
              {Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </HStack>
        </Box>
      </Pressable>

      {/* Modal de Edição */}
      <EditTransactionModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        transaction={transaction}
        onSuccess={() => setIsEditModalVisible(false)}
      />
    </>
  );
};
