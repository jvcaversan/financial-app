import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { TransactionItem } from "./TransactionItem";
import { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[]; // Recebe as transações como prop
  selectedTransactionId?: number | null;
  onSelectTransaction: (id: number) => void;
  isLoading?: boolean; // Adicione uma prop para o estado de carregamento
}

export const TransactionList = ({
  transactions,
  selectedTransactionId,
  onSelectTransaction,
  isLoading,
}: TransactionListProps) => {
  if (isLoading) {
    return (
      <Box className="items-center justify-center py-8">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <Box className="mb-10">
      <Text className="text-gray-800 text-xl font-bold mb-4">
        Transações Recentes
      </Text>
      {transactions.length === 0 ? (
        <Box className="items-center justify-center py-8">
          <Text className="text-gray-500 text-base">
            Ainda não há transações
          </Text>
        </Box>
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => {
            const color = item.type === "incomes" ? "lightgreen" : "pink";
            return (
              <TransactionItem
                transaction={item}
                isSelected={selectedTransactionId === item.id}
                color={color}
                onSelect={() => onSelectTransaction(item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Box className="h-2" />}
        />
      )}
    </Box>
  );
};
