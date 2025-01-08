import { Transaction } from "../types";

interface PieChartData {
  value: number;
  type: "incomes" | "expenses";
  svg: {
    fill: string;
    onPress: () => void;
  };
  key: number;
}

export function preparePieChartData(
  transactions: Transaction[],
  onSelect: (id: number) => void
): PieChartData[] {
  const minValue = 0.1;
  return transactions.map((transaction) => ({
    value: Math.abs(transaction.amount) + minValue,
    type: transaction.type === "incomes" ? "incomes" : "expenses",
    svg: {
      fill: transaction.type === "incomes" ? "#4CAF50" : "#F44336",
      onPress: () => onSelect(transaction.id),
    },
    key: transaction.id,
  }));
}
