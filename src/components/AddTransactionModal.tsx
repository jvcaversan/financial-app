import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Text } from "./ui/text";
import { useTransactions } from "../hooks/useTransactions";
import { ActionButton } from "./ActionButton";
import { z } from "zod";

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  type: "incomes" | "expenses";
  onSuccess: () => void;
}

const transactionSchema = z.object({
  amount: z.string().refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: "O valor deve ser um número com ponto decimal (ex: 350.50).",
  }),
  description: z.string().min(1, "A descrição é obrigatória."),
});

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
    try {
      // Validar os dados
      const validatedData = transactionSchema.safeParse({
        amount,
        description,
      });

      if (!amount && !description) {
        Alert.alert("Ambos os campos são obrigatórios");
        return;
      }

      if (!validatedData.success) {
        Alert.alert("Erro de validação", validatedData.error.errors[0].message);
        return;
      }

      // Se a validação passar, prosseguir com a adição da transação
      addTransaction(
        {
          amount: Number(validatedData.data.amount),
          description: validatedData.data.description,
          type,
          userId: 1,
        },
        {
          onSuccess: () => {
            setAmount("");
            setDescription("");
            onClose();
            onSuccess();
          },
          onError: (error) => {
            console.error("Erro ao adicionar transação:", error);
            Alert.alert("Ocorreu um erro ao adicionar a transação.");
          },
        }
      );
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      Alert.alert("Ocorreu um erro ao adicionar a transação.");
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
