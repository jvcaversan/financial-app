import React from "react";
import { Button } from "./ui/button";
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

export const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  label,
  color,
  backgroundColor,
  onPress,
}) => {
  return (
    <Button
      className={`${backgroundColor} flex-1 py-3 h-15 rounded-lg`}
      onPress={onPress}
    >
      <HStack space="sm" className="items-center justify-center">
        <MaterialIcons name={iconName} size={20} color={color} />
        <Text className={`${color} font-semibold`}>{label}</Text>
      </HStack>
    </Button>
  );
};
