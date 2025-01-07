import React from "react";
import { ScrollView } from "react-native";
import { HStack } from "../components/ui/hstack";
import { Header } from "../components/header";
import { BalanceCard } from "../components/BalanceCard";
import { ActionButton } from "../components/ActionButton";
import { PieChartCard } from "../components/PieChartCard";
import { TransactionList } from "../components/TransactionList";
import { Transaction, useTransactions } from "../hooks/useTransactions";
import { preparePieChartData } from "../utils/preparePieChartData";

const HomeScreen: React.FC = () => {
  const user = {
    name: "João Silva",
  };

  const initialTransactions: Transaction[] = [
    { id: 1, description: "Salário", amount: 3000.0, type: "income" },
    { id: 2, description: "Freelance", amount: 500.0, type: "income" },
    { id: 3, description: "Academia", amount: -80.0, type: "expense" },
    { id: 4, description: "Futevolei", amount: -140.0, type: "expense" },
    { id: 5, description: "Cinema", amount: -200.0, type: "expense" },
    { id: 6, description: "Supermercado", amount: -250.5, type: "expense" },
    { id: 7, description: "Computador", amount: -2000.0, type: "expense" },
  ];

  const {
    transactions,
    selectedTransactionId,
    setSelectedTransactionId,
    balance,
  } = useTransactions(initialTransactions);

  const pieChartData = preparePieChartData(
    transactions,
    setSelectedTransactionId
  );

  const handleSelectSlice = (key: number) => {
    setSelectedTransactionId(key);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header userName={user.name} />
      <BalanceCard balance={balance} />
      <HStack space="md" className="mb-6">
        <ActionButton
          iconName="add"
          label="Adicionar Receita"
          color="#4CAF50"
          backgroundColor="bg-green-100"
        />
        <ActionButton
          iconName="remove"
          label="Adicionar Despesa"
          color="#F44336"
          backgroundColor="bg-red-100"
        />
      </HStack>
      <PieChartCard
        onSelectSlice={handleSelectSlice}
        selectedKey={selectedTransactionId}
        data={pieChartData}
      />
      <TransactionList
        transactions={transactions}
        selectedTransactionId={selectedTransactionId}
        onSelectTransaction={setSelectedTransactionId}
      />
    </ScrollView>
  );
};

export default HomeScreen;
