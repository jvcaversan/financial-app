export const generateColor = (
  index: number,
  total: number,
  type: "income" | "expense"
): string => {
  const hue = (index / total) * 360;
  const saturation = type === "income" ? 70 : 50;
  const lightness = type === "income" ? 50 : 40;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
