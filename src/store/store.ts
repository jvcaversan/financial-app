import { create } from "zustand";
import { Transaction } from "../types";

interface TransactionStore {
  transactions: Transaction[];
  selectedTransactionId: number | null;
  setTransactions: (transactions: Transaction[]) => void;
  setSelectedTransactionId: (id: number | null) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  selectedTransactionId: null,
  setTransactions: (transactions) => set({ transactions }),
  setSelectedTransactionId: (id) => set({ selectedTransactionId: id }),
}));
