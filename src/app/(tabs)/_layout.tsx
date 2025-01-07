import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ headerTitle: "FinanApp", tabBarLabel: "Home" }}
      />
      <Tabs.Screen name="transactions" options={{ title: "Transações" }} />
    </Tabs>
  );
}
