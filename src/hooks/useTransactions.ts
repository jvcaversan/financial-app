import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { schema, transactions } from "../db/schema";

interface AddTransactionParams {
  amount: number;
  description: string;
  type: "incomes" | "expenses";
  userId: number;
}

export function useTransactions() {
  const database = useSQLiteContext();
  const db = drizzle(database, { schema });
  const queryClient = useQueryClient();

  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        return await db.query.transactions.findMany();
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
      // Invalida o cache e força uma nova busca
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions: allTransactions ?? [],
    isLoading,
    addTransaction,
  };
}
