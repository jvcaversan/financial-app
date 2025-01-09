import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons";

interface ActionButtonProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  label: string;
  color: string;
  backgroundColor: string;
  onPress?: () => void;
  disabled?: boolean; // Adicionamos a prop `disabled`
}

export function ActionButton({
  iconName,
  label,
  color,
  backgroundColor,
  onPress,
  disabled = false, // Valor padrão para `disabled`
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-1 ${backgroundColor} px-4 py-3 rounded-xl ${
        disabled ? "opacity-50" : "" // Aplica opacidade reduzida quando desabilitado
      }`}
      onPress={onPress}
      disabled={disabled} // Passa a prop `disabled` para o TouchableOpacity
      activeOpacity={0.7} // Opacidade ao pressionar o botão
    >
      <HStack space="md" className="items-center justify-center">
        {iconName && <MaterialIcons name={iconName} size={24} color={color} />}
        <Text className="font-semibold text-base" style={{ color }}>
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}
