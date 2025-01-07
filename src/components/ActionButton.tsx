import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { MaterialIcons } from "@expo/vector-icons";

interface ActionButtonProps {
  iconName: "add" | "remove";
  label: string;
  color: string;
  backgroundColor: string;
  onPress?: () => void;
}

export const ActionButton = ({
  iconName,
  label,
  color,
  backgroundColor,
  onPress,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      className={`flex-1 py-3 rounded-lg justify-center items-center ${backgroundColor}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <HStack space="sm" className="items-center">
        <MaterialIcons name={iconName} size={20} color={color} />
        <Text className={`font-semibold`} style={{ color }}>
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};
