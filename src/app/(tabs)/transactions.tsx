import { Text } from "react-native";
import { SafeAreaView } from "react-native";

import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import { transactions } from "../../db/schema";

export default function TransactionsScreen() {
  const database = useSQLiteContext();
  const db = drizzle(database);

  async function fetchTransactions() {
    const allTransactions = await db.select().from(transactions);
    console.log(allTransactions);
  }
  fetchTransactions();
  return (
    <SafeAreaView>
      <Text>TRANSACOES</Text>
    </SafeAreaView>
  );
}
