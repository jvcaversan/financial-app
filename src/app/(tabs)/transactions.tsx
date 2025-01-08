import React from "react";
import { ScrollView } from "react-native";
import { TransactionList } from "../../components/TransactionList";
import { useTransactionStore } from "../../store/store";
import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionsScreen() {
  const { selectedTransactionId, setSelectedTransactionId } =
    useTransactionStore();

  const { transactions } = useTransactions();

  return (
    <ScrollView className="flex-1 px-4 pt-4">
      <TransactionList
        transactions={transactions}
        onSelectTransaction={setSelectedTransactionId}
      />
    </ScrollView>
  );
}
