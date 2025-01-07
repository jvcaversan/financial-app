// components/TransactionList.tsx
import React from "react";
import { FlatList } from "react-native";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { TransactionItem } from "./TransactionItem";
import { Transaction } from "../hooks/useTransactions";

interface TransactionListProps {
  transactions: Transaction[];
  selectedTransactionId: number | null;
  onSelectTransaction: (id: number) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  selectedTransactionId,
  onSelectTransaction,
}) => {
  return (
    <Box className="mb-10">
      <Text className="text-gray-800 text-xl font-bold mb-4">
        Transações Recentes
      </Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => {
          const index = transactions.findIndex((t) => t.id === item.id);

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
    </Box>
  );
};
