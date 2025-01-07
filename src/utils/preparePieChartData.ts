import { Transaction } from "../hooks/useTransactions";

interface PieChartData {
  key: number;
  value: number;
  svg: { fill: string; onPress: () => void };
}

export const preparePieChartData = (
  transactions: Transaction[],
  onPress: (id: number) => void
): PieChartData[] => {
  return transactions.map((transaction) => {
    const color = transaction.type === "income" ? "#4CAF50" : "#F44336";
    return {
      key: transaction.id,
      value: Math.abs(transaction.amount),
      svg: {
        fill: color,
        onPress: () => onPress(transaction.id),
      },
    };
  });
};
