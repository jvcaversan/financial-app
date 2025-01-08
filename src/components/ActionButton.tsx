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
}

export function ActionButton({
  iconName,
  label,
  color,
  backgroundColor,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-1 ${backgroundColor} px-4 py-3 rounded-xl`}
      onPress={onPress}
    >
      <HStack space="md" className="items-center justify-center">
        <MaterialIcons name={iconName} size={24} color={color} />
        <Text
          className="font-semibold text-base items-center justify-center"
          style={{ color }}
        >
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}
