import React from "react";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";
import { PieChart } from "react-native-svg-charts";

interface PieChartCardProps {
  data: {
    value: number;
    svg: { fill: string; onPress: () => void };
    key: number;
  }[];
}

export const PieChartCard: React.FC<PieChartCardProps> = ({ data }) => {
  return (
    <Box className="mb-6">
      <Text className="text-gray-800 text-xl font-bold mb-4">
        Distribuição de Gastos
      </Text>
      <Box className="items-center bg-gray-50 p-4 rounded-xl">
        <PieChart
          style={{ height: 200, width: "100%" }}
          data={data}
          innerRadius={"50%"}
          padAngle={0.04}
        />
      </Box>
    </Box>
  );
};
