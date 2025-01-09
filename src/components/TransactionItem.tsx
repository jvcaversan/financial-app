import React, { useState } from "react";
import { Alert, Pressable } from "react-native";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "../types";
import { useTransactions } from "../hooks/useTransactions";
import { EditTransactionModal } from "./EditTransactionModal"; // Importe o modal de edição
import { View } from "react-native";

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
    // Exibe um alerta de confirmação antes de deletar
    Alert.alert(
      "Deletar Transação",
      "Tem certeza que deseja deletar esta transação?",
      [
        {
          text: "Cancelar",
          style: "cancel", // Botão de cancelar
        },
        {
          text: "Deletar",
          style: "destructive", // Botão de deletar (estilo destrutivo)
          onPress: () => {
            // Se o usuário confirmar, deleta a transação
            deleteTransaction({ id: transaction.id });
          },
        },
      ]
    );
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
              <View className="flex-1" style={{ maxWidth: "60%" }}>
                <Text
                  className="text-gray-800"
                  numberOfLines={1} // Limita o texto a uma linha
                  ellipsizeMode="tail" // Adiciona "..." ao final do texto
                >
                  {transaction.description}
                </Text>
              </View>
            </HStack>
            <Pressable onPress={handleEditPress}>
              <MaterialIcons name="edit" size={20} color="gray" />
            </Pressable>
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
