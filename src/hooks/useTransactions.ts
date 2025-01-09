import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { schema, transactions } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { Transaction } from "../types";

interface AddTransactionParams extends Omit<Transaction, "id"> {}

interface DeleteTransactionParams {
  id: number;
}

export function useTransactions() {
  const database = useSQLiteContext();
  const db = drizzle(database, { schema });
  const queryClient = useQueryClient();

  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        return await db.query.transactions.findMany({
          orderBy: [desc(transactions.createdAt)],
        });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error;
      }
    },
  });

  const { mutate: addTransaction } = useMutation({
    mutationFn: async (data: AddTransactionParams) => {
      try {
        await db.insert(transactions).values(data);
      } catch (error) {
        console.error("Error saving transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { mutate: editTransaction } = useMutation({
    mutationFn: async (data: Transaction) => {
      try {
        await db
          .update(transactions)
          .set({
            amount: data.amount,
            description: data.description,
          })
          .where(eq(transactions.id, data.id));
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { mutate: deleteTransaction } = useMutation({
    mutationFn: async (data: DeleteTransactionParams) => {
      try {
        await db.delete(transactions).where(eq(transactions.id, data.id));
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions: allTransactions ?? [],
    isLoading,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };
}
