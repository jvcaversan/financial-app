import { useState } from "react";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export const useTransactions = (initialTransactions: Transaction[]) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);

  const calculateBalance = (): number => {
    return transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };

  return {
    transactions,
    selectedTransactionId,
    setSelectedTransactionId,
    balance: calculateBalance(),
  };
};
