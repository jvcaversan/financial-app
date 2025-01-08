import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ headerTitle: "FinanApp", tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerTitle: "Histórico de Transações",
          tabBarLabel: "Transações",
        }}
      />
    </Tabs>
  );
}
