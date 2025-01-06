export const generateColor = (
  index: number,
  total: number,
  type: "income" | "expense"
): string => {
  let hue: number;
  const saturation = type === "income" ? 70 : 90;
  const lightness = type === "income" ? 50 : 50;

  if (type === "income") {
    hue = 120;
  } else {
    hue = 20 + (index / total) * 60;
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
