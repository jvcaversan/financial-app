import { useState, useEffect } from "react";
import { Transaction } from "../hooks/useTransactions";

export const useLastTransactions = (
  transactions: Transaction[],
  limit: number
) => {
  const [lastTransactions, setLastTransactions] = useState<Transaction[]>(
    transactions.slice(-limit)
  );

  useEffect(() => {
    setLastTransactions(transactions.slice(-limit));
  }, [transactions, limit]);

  const addTransactionToTop = (transaction: Transaction) => {
    const isAlreadyInList = lastTransactions.some(
      (t) => t.id === transaction.id
    );

    if (!isAlreadyInList) {
      const updatedLastTransactions = [
        transaction,
        ...lastTransactions.slice(0, limit - 1),
      ];
      setLastTransactions(updatedLastTransactions);
    }
  };

  return { lastTransactions, addTransactionToTop };
};
