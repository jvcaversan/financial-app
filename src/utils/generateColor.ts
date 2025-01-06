export const generateColor = (
  index: number,
  total: number,
  type: "income" | "expense"
): string => {
  const hue = (index / total) * 400;
  const saturation = type === "income" ? 70 : 90;
  const lightness = type === "income" ? 50 : 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
