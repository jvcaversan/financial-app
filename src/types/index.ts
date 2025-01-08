export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "incomes" | "expenses";
  userId: number;
  createdAt?: Date;
}
