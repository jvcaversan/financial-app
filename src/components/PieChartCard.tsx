import React from "react";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { PieChart } from "react-native-svg-charts";

interface PieChartCardProps {
  data: {
    value: number;
    type: "incomes" | "expenses";
    svg: { fill: string; onPress: () => void };
    key: number;
  }[];
  selectedKey: number | null;
  onSelectSlice: (key: number) => void;
}

export const PieChartCard = ({
  data,
  selectedKey,
  onSelectSlice,
}: PieChartCardProps) => {
  // Verifica se há transações
  const hasTransactions = data.length > 0;

  // Dados para o gráfico
  const chartData = hasTransactions
    ? data.map((item) => ({
        ...item,
        svg: {
          ...item.svg,
          fill: item.type === "incomes" ? "#4CAF50" : "#F44336",
          onPress: () => {
            onSelectSlice(item.key);
          },
          outerRadius: selectedKey === item.key ? "110%" : "95%",
          stroke: selectedKey === item.key ? "black" : "none",
          strokeWidth: selectedKey === item.key ? 1 : 0,
        },
      }))
    : [
        {
          value: 1, // Valor único para preencher o gráfico
          key: 0, // Chave única
          svg: {
            fill: "#D1D5DB", // Cor cinza
            onPress: () => {}, // Função vazia, pois não há interação
          },
        },
      ];

  return (
    <Box className="mb-6">
      <Text className="text-gray-800 text-xl font-bold mb-4">
        Distribuição de Gastos
      </Text>
      <Box className="items-center bg-gray-50 p-3 rounded-xl">
        {hasTransactions ? (
          <PieChart
            style={{ height: 220, width: "100%" }}
            data={chartData}
            innerRadius={"40%"}
            padAngle={0.02}
          />
        ) : (
          <>
            <PieChart
              style={{ height: 220, width: "100%" }}
              data={chartData}
              innerRadius={"40%"}
              padAngle={0.02}
            />
            <Text className="text-gray-500 mt-2">
              Nenhuma transação encontrada.
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};
