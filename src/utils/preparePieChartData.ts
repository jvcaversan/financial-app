import { generateColor } from "./generateColor";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export const preparePieChartData = (
  transactions: Transaction[],
  onPress: (id: number) => void
) => {
  return transactions.map((transaction, index) => {
    const color = generateColor(index, transactions.length, transaction.type);
    return {
      value: Math.abs(transaction.amount),
      svg: {
        fill: color,
        onPress: () => onPress(transaction.id),
      },
      key: transaction.id,
      color: color,
    };
  });
};
