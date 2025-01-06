import { Text, View } from "react-native";
import { Box } from "../components/ui/box";

export default function Index() {
  return (
    <Box className="flex-1 bg-slate-400 p-5">
      <Text className="text-red-500">This is the Box</Text>
    </Box>
  );
}
