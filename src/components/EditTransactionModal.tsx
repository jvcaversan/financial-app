import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Text } from "./ui/text";
import { useTransactions } from "../hooks/useTransactions";
import { ActionButton } from "./ActionButton";
import { Transaction } from "../types";

interface EditTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  transaction: Transaction;
  onSuccess: () => void;
}

export function EditTransactionModal({
  isVisible,
  onClose,
  transaction,
  onSuccess,
}: EditTransactionModalProps) {
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [description, setDescription] = useState(transaction.description);
  const { editTransaction } = useTransactions();

  // Atualiza os estados quando a transação muda
  useEffect(() => {
    setAmount(transaction.amount.toString());
    setDescription(transaction.description);
  }, [transaction]);

  async function handleSubmit() {
    if (!amount || !description) {
      Alert.alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      editTransaction(
        {
          id: transaction.id, // Passa o ID da transação
          amount: Number(amount),
          description,
          type: transaction.type,
          userId: transaction.userId,
        },
        {
          onSuccess: () => {
            setAmount("");
            setDescription("");
            onClose();
            onSuccess();
          },
          onError: (error) => {
            console.error("Erro ao editar transação:", error);
            Alert.alert("Ocorreu um erro ao editar a transação.");
          },
        }
      );
    } catch (error) {
      console.error("Erro ao editar transação:", error);
      Alert.alert("Ocorreu um erro ao editar a transação.");
    }
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white px-8 py-10 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-8">
            <Text size="xl" bold>
              {transaction.type === "incomes"
                ? "Editar Receita"
                : "Editar Despesa"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text size="xl">✕</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-6">
            <View>
              <Text className="mb-2 text-gray-800">Valor</Text>
              <TextInput
                className="h-12 border border-gray-300 rounded-lg px-4"
                keyboardType="decimal-pad"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View>
              <Text className="mb-2 text-gray-800">Descrição</Text>
              <TextInput
                className="h-12 border border-gray-300 rounded-lg px-4"
                placeholder="Ex: Salário"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View className="h-12 w-[85%] mx-auto mt-4">
              <ActionButton
                label="Salvar"
                color="white"
                backgroundColor={
                  transaction.type === "incomes" ? "bg-green-500" : "bg-red-500"
                }
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
