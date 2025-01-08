import { useMemo } from "react";
import { Transaction } from "../types";

export const useBalance = (transactions: Transaction[]) => {
  return useMemo(() => {
    const totalIncomes = transactions
      .filter((transaction) => transaction.type === "incomes")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expenses")
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

    return totalIncomes - totalExpenses;
  }, [transactions]);
};
