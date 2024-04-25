export const convertToParam = (
  key: string,
  value: any,
  isNextItem?: boolean
) => {
  if (value === undefined || value === null) return "";
  return `${key}=${value}${isNextItem ? "&" : ""}`;
};

export const hexToRgba = (color?: string | undefined, opacity = 1) => {
  if (color) {
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  } else return undefined;
};
