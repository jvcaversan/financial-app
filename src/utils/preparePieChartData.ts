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
  if (transactions.length === 0) {
    return [
      {
        key: 0,
        value: 1,
        svg: {
          fill: "#E5E7EB", // Tailwind gray-200
          onPress: () => {},
        },
      },
    ];
  }

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
