import React from "react";
import { Box } from "../components/ui/box";
import { Text as UiText } from "../components/ui/text";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";

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

// Tipagem para as slices
interface Slice {
  pieCentroid: [number, number];
  data: {
    value: number;
    svg: { fill: string };
    key: number; // Adicionamos a chave aqui para verificar a seleção
  };
}

interface LabelsProps {
  slices: Slice[];
  selectedKey: number | null; // Passamos a selectedKey para o componente Labels
}

const Labels = ({ slices, selectedKey }: LabelsProps) => {
  return slices.map((slice, index) => {
    const { pieCentroid, data } = slice;

    // Verifica se a fatia está selecionada
    const isSelected = data.key === selectedKey;

    // Cor do texto baseada na cor da fatia
    const textColor = "black";

    return (
      <Text
        key={index}
        x={pieCentroid[0]} // Posição X do texto
        y={pieCentroid[1]} // Posição Y do texto
        fill={textColor} // Cor do texto
        textAnchor={"middle"} // Alinhamento horizontal
        alignmentBaseline={"middle"} // Alinhamento vertical
        fontSize={12} // Tamanho da fonte (reduzido para caber melhor)
        stroke={"black"} // Contorno do texto
        strokeWidth={0.2} // Espessura do contorno
      >
        {isSelected ? data.value : ""}
      </Text>
    );
  });
};

export const PieChartCard = ({
  data,
  selectedKey,
  onSelectSlice,
}: PieChartCardProps) => {
  const hasTransactions = data.length > 0;

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
          value: 1,
          key: 0,
          svg: {
            fill: "#D1D5DB",
            onPress: () => {},
          },
        },
      ];

  return (
    <Box className="mb-6">
      <UiText className="text-gray-800 text-xl font-bold mb-4">
        Distribuição de Gastos
      </UiText>
      <Box className="items-center bg-gray-50 p-3 rounded-xl">
        {hasTransactions ? (
          <PieChart
            style={{ height: 220, width: "100%" }}
            data={chartData}
            innerRadius={"40%"}
            padAngle={0.02}
            valueAccessor={({ item }) => item.value}
          >
            <Labels slices={[]} selectedKey={selectedKey} />
          </PieChart>
        ) : (
          <>
            <PieChart
              style={{ height: 220, width: "100%" }}
              data={chartData}
              innerRadius={"40%"}
              padAngle={0.02}
              valueAccessor={({ item }) => item.value}
            />
            <UiText className="text-gray-500 mt-2">
              Nenhuma transação encontrada.
            </UiText>
          </>
        )}
      </Box>
    </Box>
  );
};
