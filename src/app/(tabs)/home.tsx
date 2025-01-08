import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { HStack } from "../../components/ui/hstack";
import { Header } from "../../components/header";
import { BalanceCard } from "../../components/BalanceCard";
import { ActionButton } from "../../components/ActionButton";
import { PieChartCard } from "../../components/PieChartCard";
import { TransactionList } from "../../components/TransactionList";
import { Transaction, useTransactions } from "../../hooks/useTransactions";
import { preparePieChartData } from "../../utils/preparePieChartData";
import { useLastTransactions } from "../../hooks/useLastTransactions";
import { AddTransactionModal } from "../../components/AddTransactionModal";

const HomeScreen: React.FC = () => {
  const user = {
    name: "João Silva",
  };

  const initialTransactions: Transaction[] = [];

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

  const { lastTransactions, addTransactionToTop } = useLastTransactions(
    transactions,
    5
  );

  const handleSelectSlice = (key: number) => {
    setSelectedTransactionId(key);

    const selectedTransaction = transactions.find((t) => t.id === key);
    if (selectedTransaction) {
      addTransactionToTop(selectedTransaction);
    }
  };

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const refreshTransactions = async () => {
    // Implement your refresh logic here
    // This should fetch the latest transactions from the database
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
        onSuccess={refreshTransactions}
      />

      <AddTransactionModal
        isVisible={isExpenseModalVisible}
        onClose={() => setIsExpenseModalVisible(false)}
        type="expenses"
        onSuccess={refreshTransactions}
      />
    </ScrollView>
  );
};

export default HomeScreen;
