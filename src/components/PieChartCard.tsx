import React, { useState } from "react";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { PieChart } from "react-native-svg-charts";

interface PieChartCardProps {
  data: {
    value: number;
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
  return (
    <Box className="mb-6">
      <Text className="text-gray-800 text-xl font-bold mb-4">
        Distribuição de Gastos
      </Text>
      <Box className="items-center bg-gray-50 p-3 rounded-xl">
        <PieChart
          style={{ height: 200, width: "100%" }}
          data={data.map((item) => ({
            ...item,
            svg: {
              ...item.svg,
              onPress: () => {
                onSelectSlice(item.key);
              },
              outerRadius: selectedKey === item.key ? "115%" : "95%",
              stroke: selectedKey === item.key ? "black" : "none",
              strokeWidth: selectedKey === item.key ? 2 : 0,
            },
          }))}
          innerRadius={"40%"}
          padAngle={0.04}
        />
      </Box>
    </Box>
  );
};
