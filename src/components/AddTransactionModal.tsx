import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "./ui/text";
import { useTransactions } from "../hooks/useTransactions";
import { ActionButton } from "./ActionButton";

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  type: "incomes" | "expenses";
  onSuccess: () => void;
}

export function AddTransactionModal({
  isVisible,
  onClose,
  type,
  onSuccess,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { addTransaction } = useTransactions();

  async function handleSubmit() {
    if (!amount || !description) return;

    try {
      await addTransaction({
        amount: Number(amount),
        description,
        type,
        userId: 1,
      });

      setAmount("");
      setDescription("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error);
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
              {type === "incomes" ? "Nova Receita" : "Nova Despesa"}
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
                  type === "incomes" ? "bg-green-500" : "bg-red-500"
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
