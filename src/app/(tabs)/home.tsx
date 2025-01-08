import React, { useEffect, useState, useMemo } from "react";
import { ScrollView } from "react-native";
import { HStack } from "../../components/ui/hstack";
import { Header } from "../../components/header";
import { BalanceCard } from "../../components/BalanceCard";
import { ActionButton } from "../../components/ActionButton";
import { PieChartCard } from "../../components/PieChartCard";
import { TransactionList } from "../../components/TransactionList";
import { preparePieChartData } from "../../utils/preparePieChartData";
import { AddTransactionModal } from "../../components/AddTransactionModal";
import { useTransactions } from "../../hooks/useTransactions";
import { Transaction } from "../../types";

const HomeScreen: React.FC = () => {
  const user = {
    name: "João Silva",
  };

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);

  const { transactions } = useTransactions();

  const handleSelectSlice = (key: number) => {
    setSelectedTransactionId(key);
  };
  const pieChartData = preparePieChartData(transactions, handleSelectSlice);

  const lastTransactions = transactions.slice(0, 5);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header userName={user.name} />
      {/* <BalanceCard balance={balance} /> */}
      <HStack space="md" className="mb-6">
        <ActionButton
          iconName="add"
          label="Adicionar Receita"
          color="#4CAF50"
          backgroundColor="bg-green-100"
          onPress={() => setIsIncomeModalVisible(true)}
        />
        <ActionButton
          iconName="remove"
          label="Adicionar Despesa"
          color="#F44336"
          backgroundColor="bg-red-100"
          onPress={() => setIsExpenseModalVisible(true)}
        />
      </HStack>
      <PieChartCard
        onSelectSlice={handleSelectSlice}
        selectedKey={selectedTransactionId}
        data={pieChartData}
      />
      <TransactionList
        transactions={lastTransactions}
        selectedTransactionId={selectedTransactionId}
        onSelectTransaction={setSelectedTransactionId}
      />

      <AddTransactionModal
        isVisible={isIncomeModalVisible}
        onClose={() => setIsIncomeModalVisible(false)}
        type="incomes"
        onSuccess={() => setIsIncomeModalVisible(false)}
      />

      <AddTransactionModal
        isVisible={isExpenseModalVisible}
        onClose={() => setIsExpenseModalVisible(false)}
        type="expenses"
        onSuccess={() => setIsIncomeModalVisible(false)}
      />
    </ScrollView>
  );
};

export default HomeScreen;
