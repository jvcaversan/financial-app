import { useState, useEffect } from "react";
import { transactions as transactionsTable } from "../db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "incomes" | "expenses";
  userId: number;
  createdAt?: Date;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const db = drizzle(useSQLiteContext());

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(transactionsTable)
        .orderBy(desc(transactionsTable.createdAt));
      setTransactions(result);
      console.log(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
    isLoading,
    refreshTransactions: fetchTransactions,
  };
};
