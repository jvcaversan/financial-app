import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";

import { ActivityIndicator, View } from "react-native";

export const DATABASE_NAME = "database.db";

const expoDB = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDB);

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (!success && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    console.error("Migration error:", error);
  }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </SQLiteProvider>
  );
}
