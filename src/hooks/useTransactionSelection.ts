import { useState } from "react";
import { Transaction } from "../types";

export const useTransactionSelection = (transactions: Transaction[]) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [visibleTransactions, setVisibleTransactions] = useState(
    transactions.slice(0, 5)
  );

  const handleSelectSlice = (key: number) => {
    setSelectedTransactionId(key);

    const selectedTransaction = transactions.find(
      (transaction) => transaction.id === key
    );

    if (selectedTransaction) {
      const filteredVisibleTransactions = visibleTransactions.filter(
        (transaction) => transaction.id !== key
      );

      const newVisibleTransactions = [
        selectedTransaction,
        ...filteredVisibleTransactions.slice(0, 4),
      ];
      setVisibleTransactions(newVisibleTransactions);
    }
  };

  return {
    selectedTransactionId,
    visibleTransactions,
    handleSelectSlice,
    setSelectedTransactionId,
    setVisibleTransactions,
  };
};
