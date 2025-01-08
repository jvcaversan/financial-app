// components/TransactionList.tsx
import React from "react";
import { FlatList } from "react-native";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { TransactionItem } from "./TransactionItem";
import { Transaction } from "../hooks/useTransactions";

interface TransactionListProps {
  transactions: Transaction[];
  selectedTransactionId?: number | null;
  onSelectTransaction: (id: number) => void;
}

export const TransactionList = ({
  transactions,
  selectedTransactionId,
  onSelectTransaction,
}: TransactionListProps) => {
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
            const color = item.type === "income" ? "lightgreen" : "pink";
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
