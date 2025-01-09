import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Importe os ícones

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50", // Cor do ícone/texto quando ativo
        tabBarInactiveTintColor: "#888", // Cor do ícone/texto quando inativo
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "FinanApp",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerTitle: "Histórico de Transações",
          tabBarLabel: "Transações",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
